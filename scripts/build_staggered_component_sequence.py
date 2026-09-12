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
    'left_tooling': np.zeros((H, W), dtype=bool),
    'right_tooling': np.zeros((H, W), dtype=bool),
    'left_motor_sub': np.zeros((H, W), dtype=bool),
    'right_motor_sub': np.zeros((H, W), dtype=bool),
    'top_bridge': np.zeros((H, W), dtype=bool),
}

# Accurate partition based on physical CAD assembly geometry:
for y in range(H):
    for x in range(W):
        if not fg[y, x]:
            continue
        
        # 1. Far Left Motors / Toggle Clamps
        if x <= 245 and 260 <= y <= 560:
            part_masks['left_motor_sub'][y, x] = True
        # 2. Far Right Motor & Rotary Drive
        elif x >= 1165 and 330 <= y <= 510:
            part_masks['right_motor_sub'][y, x] = True
        # 3. Top Bridge Gantry Arch
        elif y <= 335 and 450 <= x <= 960:
            part_masks['top_bridge'][y, x] = True
        # 4. Lower Ground Base Plate
        elif y >= 585:
            part_masks['base_table'][y, x] = True
        # 5. Center Door Panel (Workpiece)
        elif 495 <= x <= 875 and 335 < y < 585:
            part_masks['door_workpiece'][y, x] = True
        # 6. Left Clamping & Tooling Frame
        elif 245 < x < 495 and 200 <= y < 585:
            part_masks['left_tooling'][y, x] = True
        # 7. Right Linear Slide & Manifold Assembly
        elif 875 < x < 1165 and 320 <= y < 585:
            part_masks['right_tooling'][y, x] = True
        elif y < 350:
            part_masks['top_bridge'][y, x] = True
        else:
            part_masks['base_table'][y, x] = True

# Verify total coverage
total_assigned = sum(np.sum(m) for m in part_masks.values())
print(f"Total foreground pixels: {np.sum(fg)}, Total assigned: {total_assigned}")

# Component definitions:
# All 7 components belong to ONE unified CAD model.
# Assembled offset (vx, vy): offset applied at p=0 to assemble the machine.
# Exploded position: offset (0, 0) at p=1.
# start_p -> end_p: staggered timeline for gradual component-by-component disassembly.
components = {
    'top_bridge': {
        'offset': (0, 155),
        'start_p': 0.00,
        'end_p': 0.40,
        'z_order': 7
    },
    'left_motor_sub': {
        'offset': (135, 0),
        'start_p': 0.08,
        'end_p': 0.52,
        'z_order': 5
    },
    'left_tooling': {
        'offset': (72, 0),
        'start_p': 0.16,
        'end_p': 0.64,
        'z_order': 3
    },
    'right_motor_sub': {
        'offset': (-145, 0),
        'start_p': 0.24,
        'end_p': 0.72,
        'z_order': 6
    },
    'right_tooling': {
        'offset': (-75, 0),
        'start_p': 0.32,
        'end_p': 0.80,
        'z_order': 4
    },
    'base_table': {
        'offset': (0, -62),
        'start_p': 0.46,
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
    # Use compress_level=1 for super-fast generation and zero degradation
    canvas.save(out_path, 'PNG', compress_level=1)

print(f"SUCCESS: Generated {TOTAL_FRAMES} perfectly continuous frames from 0.00 to 1.00!")
