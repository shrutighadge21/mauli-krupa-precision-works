import os
from PIL import Image
import numpy as np

os.makedirs('public/images/cad_dense_sequence', exist_ok=True)

img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

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

# Accurate partition of the 5 major visible machine components:
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

# Sequential One-by-One Movement Intervals:
# ONLY ONE COMPONENT MOVES AT A TIME.
components = {
    'top_bridge': {
        'offset': (0, 150),
        'start_p': 0.05,
        'end_p': 0.25,
        'z_order': 5
    },
    'left_assembly': {
        'offset': (95, 0),
        'start_p': 0.25,
        'end_p': 0.45,
        'z_order': 3
    },
    'right_assembly': {
        'offset': (-100, 0),
        'start_p': 0.45,
        'end_p': 0.65,
        'z_order': 4
    },
    'base_table': {
        'offset': (0, -65),
        'start_p': 0.65,
        'end_p': 0.85,
        'z_order': 1
    },
    'door_workpiece': {
        'offset': (0, 0),
        'start_p': 0.0,
        'end_p': 1.0,
        'z_order': 2
    },
}

# Smooth cosine/cubic interpolation
def smoothstep(edge0, edge1, x):
    if x <= edge0:
        return 0.0
    if x >= edge1:
        return 1.0
    t = (x - edge0) / (edge1 - edge0)
    return t * t * (3.0 - 2.0 * t)

# Extract isolated part images
parts = {}
render_order = sorted(components.keys(), key=lambda k: components[k]['z_order'])

for name in render_order:
    pmask = part_masks[name]
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    parts[name] = Image.fromarray(part_arr)
    print(f"Isolated {name}: {np.sum(pmask)} px")

TOTAL_FRAMES = 60

for i in range(TOTAL_FRAMES):
    p = i / (TOTAL_FRAMES - 1)  # 0.00 to 1.00
    
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    
    for name in render_order:
        cfg = components[name]
        vx, vy = cfg['offset']
        s_p = cfg['start_p']
        e_p = cfg['end_p']
        
        # Local component progress: 0 (assembled) -> 1 (exploded)
        local_t = smoothstep(s_p, e_p, p)
        
        # Current displacement from exploded position: (1 - local_t) * (vx, vy)
        ox = int(round((1.0 - local_t) * vx))
        oy = int(round((1.0 - local_t) * vy))
        
        pimg = parts[name]
        shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        shifted.paste(pimg, (ox, oy), pimg)
        canvas.alpha_composite(shifted)
        
    out_path = f'public/images/cad_dense_sequence/frame_{i:02d}.png'
    canvas.save(out_path, 'PNG', compress_level=1)

print(f"SUCCESS: Generated {TOTAL_FRAMES} sequential one-by-one CAD frames!")
