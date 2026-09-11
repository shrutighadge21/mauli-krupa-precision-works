import os
from PIL import Image

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")

TARGETS = [
    ("Stainless Steel Hopper", "sheetmetal_hopper_10.jpg", assets_dir),
    ("Flanged Chute Diverters", "sheetmetal_ducts_13.jpg", assets_dir),
    ("Fluid Process Skid", "process_skid_19.jpg", assets_dir),
    ("Filtration Vessel Rig", "filtration_skid_20.jpg", assets_dir),
    ("3D Cyclone CAD Model", "cad_design_24.jpg", assets_dir),
    ("3D Isometric CAD Layout", "cad_design_25.jpg", assets_dir),
    ("Hopper Support Truss", "structural_frame_08.jpg", assets_dir),
    ("Overhead Gantry Track", "structural_frame_09.jpg", assets_dir),
    ("Formed Sheet Chutes", "sheetmetal_ducts_14.jpg", assets_dir),
    ("Rigid Machine Base", "industrial_frame_15.jpg", assets_dir),
    ("Automated Welding SPM", "03_welding_spm.jpg", curated_dir),
    ("Hydraulic Press Structure", "05_hydraulic_press_structure.jpg", curated_dir),
]

for title, fname, directory in TARGETS:
    p = os.path.join(directory, fname)
    if os.path.exists(p):
        im = Image.open(p)
        print(f"[{title}] {fname:32s} -> Exists: True, Size: {im.size}, Mode: {im.mode}")
    else:
        print(f"[{title}] {fname:32s} -> NOT FOUND in {directory}")
