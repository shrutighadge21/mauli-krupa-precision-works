import os
from PIL import Image
import numpy as np
from skimage import measure

os.makedirs('public/images/cad_parts', exist_ok=True)
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')
arr = np.array(img_exp)
alpha = arr[:, :, 3]

# Create a clean binary mask of all non-transparent pixels
mask_fg = alpha > 20

# Connected components
labels, num_labels = measure.label(mask_fg, return_num=True, connectivity=2)
print(f"Found {num_labels} connected components in exploded view.")

# Let's categorize every connected component into one of 7 major engineering assemblies:
# 1. 'top_bridge': gantry arch that moves UP
# 2. 'base_table': ground T-slot table that moves DOWN
# 3. 'door_workpiece': central door that stays ANCHORED
# 4. 'left_clamp_assembly': left tooling arm & toggle clamps that move LEFT
# 5. 'right_slide_assembly': right linear slide & manifold that move RIGHT
# 6. 'left_motor_sub': far left motor drive that moves FAR LEFT
# 7. 'right_motor_sub': far right motor drive that moves FAR RIGHT

groups = {
    'top_bridge': np.zeros_like(mask_fg),
    'base_table': np.zeros_like(mask_fg),
    'door_workpiece': np.zeros_like(mask_fg),
    'left_clamp_assembly': np.zeros_like(mask_fg),
    'right_slide_assembly': np.zeros_like(mask_fg),
    'left_motor_sub': np.zeros_like(mask_fg),
    'right_motor_sub': np.zeros_like(mask_fg),
}

props = measure.regionprops(labels)

for prop in props:
    minr, minc, maxr, maxc = prop.bbox
    cy, cx = prop.centroid
    area = prop.area
    comp_mask = (labels == prop.label)

    # Classification by centroid and spatial bounds in exploded layout:
    if cy < 345 and cx > 460 and cx < 960:
        # Top Bridge Arch & hanging cables
        groups['top_bridge'] |= comp_mask
    elif cy > 595:
        # Base Bed Table & lower locating pins
        groups['base_table'] |= comp_mask
    elif cx >= 500 and cx <= 870 and cy >= 340 and cy <= 590:
        # Central Door Panel
        groups['door_workpiece'] |= comp_mask
    elif cx > 1170:
        # Far Right Motor Drive
        groups['right_motor_sub'] |= comp_mask
    elif cx < 240 and cy >= 270 and cy <= 540:
        # Far Left Motor Drive & Toggle Clamps
        groups['left_motor_sub'] |= comp_mask
    elif cx >= 850 and cx <= 1180 and cy >= 320 and cy <= 600:
        # Right Linear Slide & Manifold Assembly
        groups['right_slide_assembly'] |= comp_mask
    elif cx >= 170 and cx < 510 and cy >= 210 and cy <= 580:
        # Left Tooling Frame & Clamps
        groups['left_clamp_assembly'] |= comp_mask
    else:
        # Assign small loose pins / fasteners based on closest group
        if cy < 350:
            groups['top_bridge'] |= comp_mask
        elif cx < 350:
            groups['left_clamp_assembly'] |= comp_mask
        elif cx > 900:
            groups['right_slide_assembly'] |= comp_mask
        elif cy > 550:
            groups['base_table'] |= comp_mask
        else:
            groups['door_workpiece'] |= comp_mask

# Save each isolated RGBA group
for name, gmask in groups.items():
    part_arr = np.zeros_like(arr)
    part_arr[gmask] = arr[gmask]
    part_img = Image.fromarray(part_arr)
    part_path = f'public/images/cad_parts/part_{name}.png'
    part_img.save(part_path)
    print(f"Saved {name}: {np.sum(gmask)} px -> {part_path}")

print("All 7 major CAD engineering groups segmented cleanly!")
