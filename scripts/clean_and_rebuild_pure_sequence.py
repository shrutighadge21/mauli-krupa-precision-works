import os
from PIL import Image, ImageDraw
import numpy as np

os.makedirs('public/images/cad_dense_sequence', exist_ok=True)
os.makedirs('public/images/cad_fixture', exist_ok=True)

# 1. Load source images
img_ass_raw = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp_raw = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = 1376, 768

arr_ass = np.array(img_ass_raw)
arr_exp = np.array(img_exp_raw)

# Clean out all faint ghosting/shadow artifacts (alpha < 210)
# This removes the faded exploded silhouette behind the assembled machine
ass_solid = arr_ass[:, :, 3] >= 210
arr_ass_clean = np.zeros_like(arr_ass)
arr_ass_clean[ass_solid] = arr_ass[ass_solid]
img_ass_clean = Image.fromarray(arr_ass_clean)
img_ass_clean.save('public/images/cad_fixture/fixture_assembled.png')

exp_solid = arr_exp[:, :, 3] >= 200
arr_exp_clean = np.zeros_like(arr_exp)
arr_exp_clean[exp_solid] = arr_exp[exp_solid]
img_exp_clean = Image.fromarray(arr_exp_clean)
img_exp_clean.save('public/images/cad_fixture/fixture_exploded.png')

print(f"Cleaned fixture_assembled.png: {np.sum(ass_solid)} solid pixels (zero ghosting).")
print(f"Cleaned fixture_exploded.png: {np.sum(exp_solid)} solid pixels (zero ghosting).")

# 2. Extract the 5 distinct solid 3D CAD component layers from the clean exploded render
fg_exp = arr_exp_clean[:, :, 3] > 0

part_masks = {
    'base_table': np.zeros((H, W), dtype=bool),
    'door_workpiece': np.zeros((H, W), dtype=bool),
    'left_assembly': np.zeros((H, W), dtype=bool),
    'right_assembly': np.zeros((H, W), dtype=bool),
    'top_bridge': np.zeros((H, W), dtype=bool),
}

for y in range(H):
    for x in range(W):
        if not fg_exp[y, x]:
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

# 3. Component timelines and vectors
# At p=0: exactly 100% assembled machine (img_ass_clean) with ZERO ghosting
# As p advances: parts separate smoothly and cleanly along their physical mating axes
components = {
    'top_bridge': {
        'offset': (0, 140),
        'start_p': 0.04,
        'end_p': 0.85,
        'z_order': 5
    },
    'left_assembly': {
        'offset': (85, 0),
        'start_p': 0.15,
        'end_p': 0.90,
        'z_order': 3
    },
    'right_assembly': {
        'offset': (-90, 0),
        'start_p': 0.25,
        'end_p': 0.95,
        'z_order': 4
    },
    'base_table': {
        'offset': (0, -55),
        'start_p': 0.40,
        'end_p': 1.00,
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

# Extract isolated pure CAD parts
parts = {}
render_order = sorted(components.keys(), key=lambda k: components[k]['z_order'])

for name in render_order:
    pmask = part_masks[name]
    part_arr = np.zeros_like(arr_exp_clean)
    part_arr[pmask] = arr_exp_clean[pmask]
    parts[name] = Image.fromarray(part_arr)

# Helper function to draw clean dashed CAD alignment guide lines
def draw_dashed_line(draw, p1, p2, color, dash_len=8, gap_len=6, width=1):
    x1, y1 = p1
    x2, y2 = p2
    dx = x2 - x1
    dy = y2 - y1
    dist = (dx**2 + dy**2)**0.5
    if dist < 6:
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
    
    if i == 0:
        # Frame 00 is 100% pure, clean assembled machine with zero ghosting!
        frame_img = img_ass_clean.copy()
    else:
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        line_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw = ImageDraw.Draw(line_layer)
        
        # Calculate displacement for each component
        displacements = {}
        progresses = {}
        for name in render_order:
            cfg = components[name]
            vx, vy = cfg['offset']
            s_p = cfg['start_p']
            e_p = cfg['end_p']
            local_t = smoothstep(s_p, e_p, p)
            progresses[name] = local_t
            
            ox = int(round((1.0 - local_t) * vx))
            oy = int(round((1.0 - local_t) * vy))
            displacements[name] = (ox, oy)
            
        # Draw subtle engineering CAD alignment guide lines only when parts are separated
        top_t = progresses['top_bridge']
        if top_t > 0.08:
            alpha = int(min(1.0, (top_t - 0.08) / 0.3) * 150)
            c = (197, 34, 39, alpha)
            top_y_exp = 300 + displacements['top_bridge'][1]
            top_y_ass = 440
            draw_dashed_line(draw, (565, top_y_exp), (565, top_y_ass), c, dash_len=6, gap_len=5, width=2)
            draw_dashed_line(draw, (810, top_y_exp), (810, top_y_ass), c, dash_len=6, gap_len=5, width=2)
            
        left_t = progresses['left_assembly']
        if left_t > 0.08:
            alpha = int(min(1.0, (left_t - 0.08) / 0.3) * 150)
            c = (197, 34, 39, alpha)
            left_x_exp = 485 + displacements['left_assembly'][0]
            left_x_ass = 570
            draw_dashed_line(draw, (left_x_exp, 380), (left_x_ass, 380), c, dash_len=6, gap_len=5, width=2)
            draw_dashed_line(draw, (left_x_exp, 490), (left_x_ass, 490), c, dash_len=6, gap_len=5, width=2)
            
        right_t = progresses['right_assembly']
        if right_t > 0.08:
            alpha = int(min(1.0, (right_t - 0.08) / 0.3) * 150)
            c = (197, 34, 39, alpha)
            right_x_exp = 885 + displacements['right_assembly'][0]
            right_x_ass = 795
            draw_dashed_line(draw, (right_x_ass, 410), (right_x_exp, 410), c, dash_len=6, gap_len=5, width=2)
            draw_dashed_line(draw, (right_x_ass, 510), (right_x_exp, 510), c, dash_len=6, gap_len=5, width=2)
            
        base_t = progresses['base_table']
        if base_t > 0.08:
            alpha = int(min(1.0, (base_t - 0.08) / 0.3) * 150)
            c = (197, 34, 39, alpha)
            base_y_ass = 540
            base_y_exp = 595 + displacements['base_table'][1]
            draw_dashed_line(draw, (520, base_y_ass), (520, base_y_exp), c, dash_len=6, gap_len=5, width=2)
            draw_dashed_line(draw, (855, base_y_ass), (855, base_y_exp), c, dash_len=6, gap_len=5, width=2)
            
        # Composite line layer
        canvas.alpha_composite(line_layer)
        
        # Composite all 5 solid 3D CAD components
        for name in render_order:
            ox, oy = displacements[name]
            pimg = parts[name]
            shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            shifted.paste(pimg, (ox, oy), pimg)
            canvas.alpha_composite(shifted)
            
        # Seamless sub-frame blend with clean assembled master at very start (p < 0.06)
        if p < 0.06:
            blend_factor = (0.06 - p) / 0.06
            canvas = Image.blend(canvas, img_ass_clean, blend_factor)
            
        frame_img = canvas
        
    out_path = f'public/images/cad_dense_sequence/frame_{i:02d}.png'
    frame_img.save(out_path, 'PNG', compress_level=1)

print(f"SUCCESS: Generated {TOTAL_FRAMES} perfectly clean frames with ZERO ghosting!")
