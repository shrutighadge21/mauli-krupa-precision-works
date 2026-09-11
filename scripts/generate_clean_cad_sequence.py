import os
import shutil
from PIL import Image, ImageFilter
import numpy as np

# Ensure output directory
os.makedirs('public/images/cad_sequence', exist_ok=True)

# Load assembled and exploded images
img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = 1376, 768

# Extract clean layers from fixture_exploded.png
arr_exp = np.array(img_exp)

# We define each component by its bounding box in fixture_exploded.png
# and its exact (dx, dy) displacement vector from ASSEMBLED (t=0) to EXPLODED (t=1):
# At t=0 (assembled), part is shifted by -vector (so it's in assembled position)
# At t=1 (exploded), part is shifted by 0 (so it's in exploded position)
# Alternatively, at progress t (0 -> 1), part is shifted by (t - 1) * vector from its exploded position!

components = [
    {
        'name': 'door_workpiece',
        'bbox': (500, 335, 875, 585),
        # Stationary center workpiece
        'vector': (0, 0),
        'z_index': 10
    },
    {
        'name': 'base_table',
        'bbox': (235, 590, 1060, 768),
        # Moves DOWNWARD in exploded view (+y)
        'vector': (0, 75),
        'z_index': 5
    },
    {
        'name': 'top_bridge',
        'bbox': (465, 20, 955, 335),
        # Moves UPWARD in exploded view (-y)
        'vector': (0, -185),
        'z_index': 30
    },
    {
        'name': 'left_tooling',
        'bbox': (175, 210, 500, 560),
        # Moves LEFTWARD in exploded view (-x)
        'vector': (-85, -5),
        'z_index': 20
    },
    {
        'name': 'left_motor_clamps',
        'bbox': (60, 270, 240, 520),
        # Moves FURTHER LEFTWARD in exploded view (-x)
        'vector': (-140, -10),
        'z_index': 25
    },
    {
        'name': 'right_tooling',
        'bbox': (655, 340, 1175, 580),
        # Moves RIGHTWARD in exploded view (+x)
        'vector': (85, 0),
        'z_index': 20
    },
    {
        'name': 'right_motor_drive',
        'bbox': (1165, 350, 1290, 480),
        # Moves FURTHER RIGHTWARD in exploded view (+x)
        'vector': (160, -5),
        'z_index': 25
    },
]

TOTAL_FRAMES = 16

# Extract cropped part images
parts = []
for comp in components:
    minx, miny, maxx, maxy = comp['bbox']
    part_arr = np.zeros_like(arr_exp)
    part_arr[miny:maxy, minx:maxx] = arr_exp[miny:maxy, minx:maxx]
    part_img = Image.fromarray(part_arr)
    parts.append({
        **comp,
        'img': part_img
    })

# Sort components by z_index
parts.sort(key=lambda p: p['z_index'])

# Generate 16 frames
for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / (TOTAL_FRAMES - 1)  # 0.0 to 1.0
    
    if frame_idx == 0:
        # Frame 0 is the exact 100% pristine assembled CAD image
        frame_img = img_ass.copy()
    elif frame_idx == TOTAL_FRAMES - 1:
        # Frame 15 is the exact 100% pristine exploded CAD image
        frame_img = img_exp.copy()
    else:
        # Intermediate frames:
        # Smooth interpolation of each major assembly along its engineering vector
        frame_canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        
        # Calculate dynamic position for each component:
        # At progress t (0 to 1), offset from exploded position is (t - 1) * vector
        for part in parts:
            vx, vy = part['vector']
            shift_x = int(round((t - 1.0) * vx))
            shift_y = int(round((t - 1.0) * vy))
            
            # Create shifted part image
            shifted = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            shifted.paste(part['img'], (shift_x, shift_y), part['img'])
            
            # Composite onto canvas
            frame_canvas.alpha_composite(shifted)
            
        # Subtle alpha blend between the shifted assembled base and exploded parts for seamless shading
        blend_weight = t
        # Crossfade background shadow
        frame_img = frame_canvas

    frame_path = f'public/images/cad_sequence/frame_{frame_idx:02d}.png'
    frame_img.save(frame_path, 'PNG', optimize=True)
    print(f"Generated frame {frame_idx:02d} (t={t:.2f}) -> {frame_path}")

print("Successfully generated all 16 clean CAD explosion frames!")
