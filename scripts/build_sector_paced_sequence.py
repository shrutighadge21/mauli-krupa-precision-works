import os
from PIL import Image, ImageDraw
import numpy as np

os.makedirs('public/images/cad_dense_sequence', exist_ok=True)

img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')
img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')

W, H = 1376, 768
arr_exp = np.array(img_exp)
alpha_exp = arr_exp[:, :, 3]
fg = alpha_exp > 15

part_masks = {
    'base_table': np.zeros((H, W), dtype=bool),
    'door_workpiece': np.zeros((H, W), dtype=bool),
    'left_assembly': np.zeros((H, W), dtype=bool),
    'right_assembly': np.zeros((H, W), dtype=bool),
    'top_bridge': np.zeros((H, W), dtype=bool),
}

for y in range(H):
    for x in range(W):
        if not fg[y, x]:
            continue
        # 1. Top Bridge (Upper Frame Arch & Guide Columns)
        if y <= 335:
            part_masks['top_bridge'][y, x] = True
        # 2. Base Table (Lower Ground Machine Bed Structure)
        elif y >= 585:
            part_masks['base_table'][y, x] = True
        # 3. Left Assembly (Toggle Clamps & Left Tooling Frame)
        elif x <= 495 and 200 <= y < 585:
            part_masks['left_assembly'][y, x] = True
        # 4. Right Assembly (Linear Slide Carriage & Rotary Drive)
        elif x >= 875 and 320 <= y < 585:
            part_masks['right_assembly'][y, x] = True
        # 5. Center Door Workpiece Fixture (Datum Anchor)
        elif 495 < x < 875 and 335 < y < 585:
            part_masks['door_workpiece'][y, x] = True
        else:
            part_masks['base_table'][y, x] = True

# Sequential One-by-One Movement starting strictly from Sector 2:
# Sector 1 (0.00 - 0.20): 100% COMPLETE ASSEMBLED MACHINE (no movement)
# Sector 2 (0.20 - 0.40): PART 1 (Top Bridge Arch) lifts up
# Sector 3 (0.40 - 0.60): PART 2 (Left Clamps) slides left
# Sector 4 (0.60 - 0.80): PART 3 (Right Slide) slides right
# Sector 5 (0.80 - 1.00): PART 4 (Base Bed Table) lowers down -> Full Exploded View
components = {
    'top_bridge': {
        'offset': (0, 140),
        'start_p': 0.20,
        'end_p': 0.40,
        'z_order': 5
    },
    'left_assembly': {
        'offset': (85, 0),
        'start_p': 0.40,
        'end_p': 0.60,
        'z_order': 3
    },
    'right_assembly': {
        'offset': (-90, 0),
        'start_p': 0.60,
        'end_p': 0.80,
        'z_order': 4
    },
    'base_table': {
        'offset': (0, -55),
        'start_p': 0.80,
        'end_p': 0.98,
        'z_order': 1
    },
    'door_workpiece': {
        'offset': (0, 0),
        'start_p': 0.0,
        'end_p': 1.0,
        'z_order': 2
    },
}

def smoothstep(edge0, edge1, x):
    if x <= edge0:
        return 0.0
    if x >= edge1:
        return 1.0
    t = (x - edge0) / (edge1 - edge0)
    return t * t * (3.0 - 2.0 * t)

# Extract isolated organic CAD parts
parts = {}
render_order = sorted(components.keys(), key=lambda k: components[k]['z_order'])

for name in render_order:
    pmask = part_masks[name]
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    parts[name] = Image.fromarray(part_arr)

# Helper function to draw clean dashed CAD alignment guide lines
def draw_dashed_line(draw, p1, p2, color, dash_len=8, gap_len=6, width=1):
    x1, y1 = p1
    x2, y2 = p2
    dx = x2 - x1
    dy = y2 - y1
    dist = (dx**2 + dy**2)**0.5
    if dist < 4:
        return
    vx = dx / dist
    vy = dy / dist
    curr = 0
    while curr < dist:
        end = min(curr + dash_len, dist)
        sx = x1 + vx * curr
        sy = y1 + vy * curr
        ex = x1 + vx * end
        ey = y1 + vy * end
        draw.line([(sx, sy), (ex, ey)], fill=color, width=width)
        curr += dash_len + gap_len

TOTAL_FRAMES = 60

for i in range(TOTAL_FRAMES):
    p = i / (TOTAL_FRAMES - 1)  # 0.00 to 1.00
    
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    line_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(line_layer)
    
    # Calculate current component displacements
    displacements = {}
    progresses = {}
    for name in render_order:
        cfg = components[name]
        vx, vy = cfg['offset']
        s_p = cfg['start_p']
        e_p = cfg['end_p']
        local_t = smoothstep(s_p, e_p, p)
        progresses[name] = local_t
        
        # ox, oy: position relative to exploded (0, 0)
        ox = int(round((1.0 - local_t) * vx))
        oy = int(round((1.0 - local_t) * vy))
        displacements[name] = (ox, oy)
        
    # Draw subtle engineering CAD leader/alignment guide lines when parts are separated
    # 1. Top Bridge vertical guide columns (x=565, x=810)
    top_t = progresses['top_bridge']
    if top_t > 0.05:
        alpha = int(min(1.0, (top_t - 0.05) / 0.25) * 160)
        c = (197, 34, 39, alpha)
        top_y_exp = 300 + displacements['top_bridge'][1]
        top_y_ass = 440
        draw_dashed_line(draw, (565, top_y_exp), (565, top_y_ass), c, dash_len=6, gap_len=5, width=2)
        draw_dashed_line(draw, (810, top_y_exp), (810, top_y_ass), c, dash_len=6, gap_len=5, width=2)
        
    # 2. Left Assembly horizontal guide rails (y=380, y=490)
    left_t = progresses['left_assembly']
    if left_t > 0.05:
        alpha = int(min(1.0, (left_t - 0.05) / 0.25) * 160)
        c = (197, 34, 39, alpha)
        left_x_exp = 485 + displacements['left_assembly'][0]
        left_x_ass = 570
        draw_dashed_line(draw, (left_x_exp, 380), (left_x_ass, 380), c, dash_len=6, gap_len=5, width=2)
        draw_dashed_line(draw, (left_x_exp, 490), (left_x_ass, 490), c, dash_len=6, gap_len=5, width=2)
        
    # 3. Right Assembly horizontal slide rails (y=410, y=510)
    right_t = progresses['right_assembly']
    if right_t > 0.05:
        alpha = int(min(1.0, (right_t - 0.05) / 0.25) * 160)
        c = (197, 34, 39, alpha)
        right_x_exp = 885 + displacements['right_assembly'][0]
        right_x_ass = 795
        draw_dashed_line(draw, (right_x_ass, 410), (right_x_exp, 410), c, dash_len=6, gap_len=5, width=2)
        draw_dashed_line(draw, (right_x_ass, 510), (right_x_exp, 510), c, dash_len=6, gap_len=5, width=2)
        
    # 4. Base Table vertical datum pins (x=520, x=855)
    base_t = progresses['base_table']
    if base_t > 0.05:
        alpha = int(min(1.0, (base_t - 0.05) / 0.25) * 160)
        c = (197, 34, 39, alpha)
        base_y_ass = 540
        base_y_exp = 595 + displacements['base_table'][1]
        draw_dashed_line(draw, (520, base_y_ass), (520, base_y_exp), c, dash_len=6, gap_len=5, width=2)
        draw_dashed_line(draw, (855, base_y_ass), (855, base_y_exp), c, dash_len=6, gap_len=5, width=2)
        
    # Composite line layer behind or between components
    canvas.alpha_composite(line_layer)
    
    # Composite all 5 solid 3D CAD components
    for name in render_order:
        ox, oy = displacements[name]
        pimg = parts[name]
        shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        shifted.paste(pimg, (ox, oy), pimg)
        canvas.alpha_composite(shifted)
        
    out_path = f'public/images/cad_dense_sequence/frame_{i:02d}.png'
    canvas.save(out_path, 'PNG', compress_level=1)

print(f"SUCCESS: Generated {TOTAL_FRAMES} frames: Sector 1 is complete assembled, then slow 1-by-1 explosion!")
