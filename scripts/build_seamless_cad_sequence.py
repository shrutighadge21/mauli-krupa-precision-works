import os
from PIL import Image
import numpy as np

os.makedirs('public/images/cad_sequence', exist_ok=True)
os.makedirs('public/images/cad_parts', exist_ok=True)

img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = 1376, 768
arr_exp = np.array(img_exp)
alpha_exp = arr_exp[:, :, 3]

fg = alpha_exp > 25

part_masks = {
    'base_table': np.zeros((H, W), dtype=bool),
    'door_workpiece': np.zeros((H, W), dtype=bool),
    'left_tooling': np.zeros((H, W), dtype=bool),
    'right_tooling': np.zeros((H, W), dtype=bool),
    'left_motor_clamps': np.zeros((H, W), dtype=bool),
    'right_motor_drive': np.zeros((H, W), dtype=bool),
    'top_bridge': np.zeros((H, W), dtype=bool),
}

# Accurate pixel mask partitioning
for y in range(H):
    for x in range(W):
        if not fg[y, x]:
            continue
        if y <= 335 and 460 <= x <= 960:
            part_masks['top_bridge'][y, x] = True
        elif x < 235 and 260 <= y <= 550:
            part_masks['left_motor_clamps'][y, x] = True
        elif x > 1170 and 340 <= y <= 490:
            part_masks['right_motor_drive'][y, x] = True
        elif y >= 595:
            part_masks['base_table'][y, x] = True
        elif 495 <= x <= 875 and 335 < y < 595:
            part_masks['door_workpiece'][y, x] = True
        elif 235 <= x < 495 and 200 <= y < 595:
            part_masks['left_tooling'][y, x] = True
        elif 875 < x <= 1170 and 320 <= y < 595:
            part_masks['right_tooling'][y, x] = True
        elif y < 350:
            part_masks['top_bridge'][y, x] = True
        else:
            part_masks['base_table'][y, x] = True

# Engineering displacement vectors from assembled (t=0) to exploded (t=1):
# (dx, dy): positive dx moves right, positive dy moves down
vectors = {
    'base_table': (0, 48),            # lowers down
    'door_workpiece': (0, 0),          # anchored workpiece
    'left_tooling': (-45, -2),         # moves left
    'right_tooling': (45, 0),          # moves right
    'left_motor_clamps': (-95, -5),    # moves further left
    'right_motor_drive': (105, -3),    # moves further right
    'top_bridge': (0, -170),           # lifts straight up
}

# Z-render ordering (bottom to top):
render_order = [
    'base_table',
    'door_workpiece',
    'left_tooling',
    'right_tooling',
    'left_motor_clamps',
    'right_motor_drive',
    'top_bridge'
]

# Extract clean isolated RGBA parts
parts = {}
for name in render_order:
    pmask = part_masks[name]
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    part_img = Image.fromarray(part_arr)
    part_img.save(f'public/images/cad_parts/part_{name}.png')
    parts[name] = part_img

TOTAL_FRAMES = 16

for idx in range(TOTAL_FRAMES):
    t = idx / (TOTAL_FRAMES - 1)  # 0.0 to 1.0
    
    if idx == 0:
        frame_img = img_ass.copy()
    elif idx == TOTAL_FRAMES - 1:
        frame_img = img_exp.copy()
    else:
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        
        for name in render_order:
            vx, vy = vectors[name]
            # Offset relative to exploded position: (t - 1.0) * vector
            sx = int(round((t - 1.0) * vx))
            sy = int(round((t - 1.0) * vy))
            
            pimg = parts[name]
            shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            shifted.paste(pimg, (sx, sy), pimg)
            canvas.alpha_composite(shifted)
            
        frame_img = canvas
        
    out_path = f'public/images/cad_sequence/frame_{idx:02d}.png'
    frame_img.save(out_path, 'PNG', optimize=True)
    print(f"Generated frame {idx:02d} (t={t:.2f}) -> {out_path}")

print("Clean CAD sequence generation complete!")
