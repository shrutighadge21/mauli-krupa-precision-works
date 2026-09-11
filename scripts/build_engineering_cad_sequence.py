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
    'top_bridge': np.zeros((H, W), dtype=bool),
    'door_workpiece': np.zeros((H, W), dtype=bool),
    'base_table': np.zeros((H, W), dtype=bool),
    'left_tooling': np.zeros((H, W), dtype=bool),
    'left_motor_clamps': np.zeros((H, W), dtype=bool),
    'right_tooling': np.zeros((H, W), dtype=bool),
    'right_motor_drive': np.zeros((H, W), dtype=bool),
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

# Engineering displacement vectors from assembled (t=0) to exploded (t=1):
# Controlled engineering exploded-view distances so every part remains visually connected!
vectors = {
    'base_table': (0, 36),             # lowers down cleanly along vertical axis
    'door_workpiece': (0, 0),           # stationary centered workpiece
    'left_tooling': (-40, -2),          # moves leftward along slide axis
    'right_tooling': (40, 0),           # moves rightward along slide axis
    'left_motor_clamps': (-80, -4),     # moves further leftward
    'right_motor_drive': (85, -2),      # moves further rightward
    'top_bridge': (0, -120),            # lifts straight upward along gantry axis
}

# Z-render ordering: base -> door -> tooling -> motors -> top bridge
render_order = [
    ('base_table', (0, 36)),
    ('door_workpiece', (0, 0)),
    ('left_tooling', (-40, -2)),
    ('right_tooling', (40, 0)),
    ('left_motor_clamps', (-80, -4)),
    ('right_motor_drive', (85, -2)),
    ('top_bridge', (0, -120)),
]

parts = {}
for name, vec in render_order:
    pmask = part_masks[name]
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    part_img = Image.fromarray(part_arr)
    part_img.save(f'public/images/cad_parts/part_{name}.png')
    parts[name] = part_img
    print(f"CAD Component {name:20s}: {np.sum(pmask):7d} px")

TOTAL_FRAMES = 16

for idx in range(TOTAL_FRAMES):
    t = idx / (TOTAL_FRAMES - 1)  # 0.0 to 1.0
    
    if idx == 0:
        # Frame 0 is the exact 100% pristine assembled CAD visual
        frame_img = img_ass.copy()
    elif idx == TOTAL_FRAMES - 1:
        # Frame 15 is the exact 100% pristine exploded CAD visual
        frame_img = img_exp.copy()
    else:
        # Create intermediate frame with controlled, smooth vector displacement
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        
        for name, vec in render_order:
            vx, vy = vec
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

print("High-precision CAD sequence generated successfully!")
