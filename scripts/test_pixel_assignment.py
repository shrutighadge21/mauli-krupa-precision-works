import os
from PIL import Image
import numpy as np

img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')
arr_exp = np.array(img_exp)
H, W, _ = arr_exp.shape
alpha = arr_exp[:, :, 3]
rgb_mean = np.mean(arr_exp[:, :, :3], axis=2)

fg = alpha > 25

part_masks = {
    'top_bridge': np.zeros((H, W), dtype=bool),
    'door_workpiece': np.zeros((H, W), dtype=bool),
    'base_table': np.zeros((H, W), dtype=bool),
    'left_tooling': np.zeros((H, W), dtype=bool),
    'left_motor_clamps': np.zeros((H, W), dtype=bool),
    'right_tooling': np.zeros((H, W), dtype=bool),
    'right_motor_drive': np.zeros((H, W), dtype=bool),
}

# Assign each pixel
for y in range(H):
    for x in range(W):
        if not fg[y, x]:
            continue
        
        # Classification logic:
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

for k, m in part_masks.items():
    print(f"{k:20s}: {np.sum(m):7d} px")
