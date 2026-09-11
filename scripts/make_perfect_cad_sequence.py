import os
from PIL import Image
import numpy as np
from scipy.ndimage import distance_transform_edt
from skimage import measure, morphology

os.makedirs('public/images/cad_sequence', exist_ok=True)
os.makedirs('public/images/cad_parts', exist_ok=True)

img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = 1376, 768
arr_exp = np.array(img_exp)
alpha_exp = arr_exp[:, :, 3]

# Create binary foreground mask
fg_mask = alpha_exp > 25

# Component centroids in exploded view to establish Voronoi / distance partition basins:
centers = {
    'top_bridge': (710, 150),
    'door_workpiece': (680, 440),
    'base_table': (650, 680),
    'left_tooling': (330, 390),
    'left_motor_clamps': (150, 400),
    'right_tooling': (940, 470),
    'right_motor_drive': (1225, 400),
}

# Linear displacement vectors (dx, dy) from ASSEMBLED to EXPLODED:
# At progress t=0, offset is -vector. At t=1, offset is (0, 0).
vectors = {
    'top_bridge': (0, -180),
    'door_workpiece': (0, 0),
    'base_table': (0, 70),
    'left_tooling': (-75, -5),
    'left_motor_clamps': (-130, -10),
    'right_tooling': (75, 0),
    'right_motor_drive': (145, -5),
}

z_orders = {
    'base_table': 5,
    'door_workpiece': 10,
    'left_tooling': 20,
    'right_tooling': 20,
    'left_motor_clamps': 25,
    'right_motor_drive': 25,
    'top_bridge': 30,
}

# Label connected components
labeled, num = measure.label(fg_mask, return_num=True, connectivity=2)
props = measure.regionprops(labeled)

part_masks = {k: np.zeros((H, W), dtype=bool) for k in centers.keys()}

for prop in props:
    cy, cx = prop.centroid
    # Assign each connected component to the best matching engineering assembly
    # based on spatial rules and weighted distance to centers
    assigned = None
    if cy < 320 and 460 < cx < 960:
        assigned = 'top_bridge'
    elif cy > 585:
        assigned = 'base_table'
    elif cx > 1170:
        assigned = 'right_motor_drive'
    elif cx < 230 and 260 < cy < 540:
        assigned = 'left_motor_clamps'
    elif 495 <= cx <= 875 and 330 <= cy <= 585:
        assigned = 'door_workpiece'
    elif cx >= 860 and cy >= 320:
        assigned = 'right_tooling'
    elif cx < 500 and cy >= 200:
        assigned = 'left_tooling'
    else:
        # Fallback: nearest center
        dists = {k: (cx - c[0])**2 + (cy - c[1])**2 for k, c in centers.items()}
        assigned = min(dists, key=dists.get)
    
    part_masks[assigned] |= (labeled == prop.label)

# Save individual parts for reference
parts = []
for name, pmask in part_masks.items():
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    part_img = Image.fromarray(part_arr)
    part_img.save(f'public/images/cad_parts/part_{name}.png')
    parts.append({
        'name': name,
        'img': part_img,
        'vector': vectors[name],
        'z_index': z_orders[name]
    })
    print(f"Segmented {name}: {np.sum(pmask)} px")

parts.sort(key=lambda p: p['z_index'])

# Generate 16 frames
TOTAL_FRAMES = 16
for idx in range(TOTAL_FRAMES):
    t = idx / (TOTAL_FRAMES - 1)
    
    if idx == 0:
        frame_img = img_ass.copy()
    elif idx == TOTAL_FRAMES - 1:
        frame_img = img_exp.copy()
    else:
        # Blend canvas
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        for p in parts:
            vx, vy = p['vector']
            # Shift from exploded position towards assembled: (t - 1.0) * vector
            sx = int(round((t - 1.0) * vx))
            sy = int(round((t - 1.0) * vy))
            
            shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            shifted.paste(p['img'], (sx, sy), p['img'])
            canvas.alpha_composite(shifted)
            
        frame_img = canvas

    out_path = f'public/images/cad_sequence/frame_{idx:02d}.png'
    frame_img.save(out_path, 'PNG', optimize=True)
    print(f"Generated frame_{idx:02d}.png (t={t:.2f})")

print("All 16 CAD sequence frames generated cleanly!")
