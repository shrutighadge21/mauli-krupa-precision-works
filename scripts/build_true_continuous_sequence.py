import os
from PIL import Image
import numpy as np

os.makedirs('public/images/cad_dense_sequence', exist_ok=True)

img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = 1376, 768
arr_exp = np.array(img_exp)
alpha = arr_exp[:, :, 3]
fg = alpha > 25

part_masks = {
    'base_table': np.zeros((H, W), dtype=bool),
    'door_workpiece': np.zeros((H, W), dtype=bool),
    'left_tooling': np.zeros((H, W), dtype=bool),
    'right_tooling': np.zeros((H, W), dtype=bool),
    'left_motor_clamps': np.zeros((H, W), dtype=bool),
    'right_motor_drive': np.zeros((H, W), dtype=bool),
    'top_bridge': np.zeros((H, W), dtype=bool),
}

# Accurate partition based on physical CAD assembly geometry:
for y in range(H):
    for x in range(W):
        if not fg[y, x]:
            continue
        
        # 1. Far Left Motors / Toggle Clamps
        if x <= 235 and 260 <= y <= 550:
            part_masks['left_motor_clamps'][y, x] = True
        # 2. Far Right Motor & Rotary Drive
        elif x >= 1170 and 340 <= y <= 490:
            part_masks['right_motor_drive'][y, x] = True
        # 3. Top Bridge Gantry Arch
        elif y <= 335 and 460 <= x <= 960:
            part_masks['top_bridge'][y, x] = True
        # 4. Lower Ground Base Plate
        elif y >= 585:
            part_masks['base_table'][y, x] = True
        # 5. Center Door Panel (Workpiece)
        elif 495 <= x <= 875 and 335 < y < 585:
            part_masks['door_workpiece'][y, x] = True
        # 6. Left Clamping & Tooling Frame
        elif 235 < x < 495 and 200 <= y < 585:
            part_masks['left_tooling'][y, x] = True
        # 7. Right Linear Slide & Manifold Assembly
        elif 875 < x < 1170 and 320 <= y < 585:
            part_masks['right_tooling'][y, x] = True
        elif y < 350:
            part_masks['top_bridge'][y, x] = True
        else:
            part_masks['base_table'][y, x] = True

# Vector offsets: (dx, dy) where dx > 0 moves right, dy > 0 moves down
# When exploded (p = 1), parts are at offset 0.
# When assembled (p = 0), parts are at offset (vx, vy).
# At progress p in [0, 1], offset from exploded is (1 - p) * (vx, vy).
vectors = {
    'base_table': (0, -42),             # In assembled view, sits 42px higher up
    'door_workpiece': (0, 0),           # Stays anchored in the center
    'left_tooling': (55, 0),            # In assembled view, sits 55px to the right
    'right_tooling': (-55, 0),          # In assembled view, sits 55px to the left
    'left_motor_clamps': (100, 0),      # In assembled view, sits 100px to the right
    'right_motor_drive': (-110, 0),     # In assembled view, sits 110px to the left
    'top_bridge': (0, 145),             # In assembled view, sits 145px lower down
}

# Z-ordering for correct CAD depth compositing
render_order = [
    'base_table',
    'door_workpiece',
    'left_tooling',
    'right_tooling',
    'left_motor_clamps',
    'right_motor_drive',
    'top_bridge'
]

# Extract isolated part images
parts = {}
for name in render_order:
    pmask = part_masks[name]
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    part_img = Image.fromarray(part_arr)
    parts[name] = part_img

TOTAL_FRAMES = 60

for i in range(TOTAL_FRAMES):
    p = i / (TOTAL_FRAMES - 1)  # 0.00 to 1.00
    
    if i == 0:
        # Frame 0 is exact assembled image
        frame_img = img_ass.copy()
    elif i == TOTAL_FRAMES - 1:
        # Frame 59 is exact exploded image
        frame_img = img_exp.copy()
    else:
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        
        # Smooth progressive movement across all 60 frames:
        # Component i separates continuously based on p
        for name in render_order:
            vx, vy = vectors[name]
            
            # Continuous displacement offset at progress p:
            # When p=0, offset is (vx, vy). When p=1, offset is (0, 0).
            ox = int(round((1.0 - p) * vx))
            oy = int(round((1.0 - p) * vy))
            
            pimg = parts[name]
            shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            shifted.paste(pimg, (ox, oy), pimg)
            canvas.alpha_composite(shifted)
            
        # Crossfade initial assembled underlay during initial 0-10% to eliminate any micro-seams
        if p < 0.12:
            alpha_ass = (0.12 - p) / 0.12
            canvas = Image.blend(canvas, img_ass, alpha_ass)
            
        frame_img = canvas
        
    out_path = f'public/images/cad_dense_sequence/frame_{i:02d}.png'
    frame_img.save(out_path, 'PNG', optimize=True)

print(f"Generated {TOTAL_FRAMES} true continuous frames from 0.00 to 1.00!")
