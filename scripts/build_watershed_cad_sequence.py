import os
from PIL import Image
import numpy as np
from scipy import ndimage
from skimage import segmentation

os.makedirs('public/images/cad_sequence', exist_ok=True)
os.makedirs('public/images/cad_parts', exist_ok=True)

img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = 1376, 768
arr_exp = np.array(img_exp)
alpha = arr_exp[:, :, 3]
fg = alpha > 25

# 7 Exact Solid Markers: (name, label_id, y, x, vector)
marker_defs = [
    ('top_bridge', 1, 120, 700, (0, -170)),
    ('door_workpiece', 2, 401, 551, (0, 0)),
    ('base_table', 3, 670, 500, (0, 48)),
    ('left_tooling', 4, 380, 320, (-45, -2)),
    ('left_motor_clamps', 5, 400, 160, (-95, -5)),
    ('right_tooling', 6, 450, 1050, (45, 0)),
    ('right_motor_drive', 7, 400, 1220, (105, -3)),
]

markers = np.zeros((H, W), dtype=int)
for name, label_id, y, x, vec in marker_defs:
    markers[y, x] = label_id

# Compute distance transform on foreground
dist = ndimage.distance_transform_edt(fg)

# Watershed segmentation
labels = segmentation.watershed(-dist, markers, mask=fg)

# Z-render ordering: base -> door -> tooling -> motors -> top bridge
render_order = [
    ('base_table', 3, (0, 48)),
    ('door_workpiece', 2, (0, 0)),
    ('left_tooling', 4, (-45, -2)),
    ('right_tooling', 6, (45, 0)),
    ('left_motor_clamps', 5, (-95, -5)),
    ('right_motor_drive', 7, (105, -3)),
    ('top_bridge', 1, (0, -170)),
]

parts = {}
for name, label_id, vec in render_order:
    pmask = (labels == label_id)
    part_arr = np.zeros_like(arr_exp)
    part_arr[pmask] = arr_exp[pmask]
    part_img = Image.fromarray(part_arr)
    part_img.save(f'public/images/cad_parts/part_{name}.png')
    parts[name] = part_img
    print(f"Watershed Part {name:20s}: {np.sum(pmask):7d} px")

TOTAL_FRAMES = 16

for idx in range(TOTAL_FRAMES):
    t = idx / (TOTAL_FRAMES - 1)  # 0.0 to 1.0
    
    if idx == 0:
        frame_img = img_ass.copy()
    elif idx == TOTAL_FRAMES - 1:
        frame_img = img_exp.copy()
    else:
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        
        for name, label_id, vec in render_order:
            vx, vy = vec
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

print("Watershed CAD sequence generated successfully!")
