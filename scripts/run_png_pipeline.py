import os
import sys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import scipy.ndimage as ndi
import rembg
from master_cutout_engine import isolate_product, ensure_dir

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")
out_dir = os.path.join(base_dir, "public", "images", "gallery_png_products")
ensure_dir(out_dir)

def create_tight_clean_crop(src_path, dst_path, crop_roi=None, canvas_size=1000, contrast=1.06, sharpness=1.18):
    """
    For complex structural scenes where background removal would risk removing thin members,
    create a tight, razor-sharp studio focus crop preserved in 1:1 canvas.
    """
    img = Image.open(src_path).convert('RGB')
    w, h = img.size
    if crop_roi:
        x0, y0, x1, y1 = [int(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop_roi)]
        img = img.crop((x0, y0, x1, y1))
        
    enh_c = ImageEnhance.Contrast(img)
    img = enh_c.enhance(contrast)
    enh_s = ImageEnhance.Sharpness(img)
    img = enh_s.enhance(sharpness)
    
    cw, ch = img.size
    target_dim = canvas_size
    scale = max(target_dim / cw, target_dim / ch)
    new_w, new_h = int(cw * scale), int(ch * scale)
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    left = (new_w - target_dim) // 2
    top = (new_h - target_dim) // 2
    final_img = resized.crop((left, top, left + target_dim, top + target_dim))
    
    final_img.save(dst_path, 'PNG', quality=95)
    print(f"[Tight Real Photo Crop] {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")

def run_pipeline():
    session = rembg.new_session("isnet-general-use")
    
    # 1. High-Precision Transparent Cutouts (Type 1)
    CUTOUT_ITEMS = [
        ("coal_crusher_01.png", assets_dir, (0.0, 0.0, 1.0, 1.0), 0.08, -0.02),
        ("sheetmetal_cabinet_11.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.10, -0.03),
        ("enclosure_cabinet_22.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.10, -0.03),
        ("enclosure_cabinet_23.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.10, -0.03),
        ("rotary_airlock_16.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.10, -0.03),
        ("rotary_feeder_18.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.10, -0.03),
        ("process_skid_19.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.10, -0.03),
        ("filtration_skid_20.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98), 0.08, -0.03),
        ("industrial_frame_15.jpg", assets_dir, (0.02, 0.05, 0.98, 0.95), 0.08, -0.03),
        ("sheetmetal_hopper_10.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("sheetmetal_ducts_13.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("sheetmetal_ducts_14.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("vertical_ducts_17.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("structural_frame_04.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("structural_frame_06.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("structural_frame_08.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("structural_frame_09.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("01_fixture_making.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("03_fuel_sensor_testing_rig.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("03_welding_spm.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("04_material_handling_trolley.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("04_pneumatic_lifting_tackle.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("05_hydraulic_press_structure.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
        ("04_industrial_equipment_lift.jpg", curated_dir, (0.02, 0.02, 0.98, 0.98), 0.08, -0.03),
    ]
    
    for filename, directory, crop_roi, pad_pct, y_offset in CUTOUT_ITEMS:
        src = os.path.join(directory, filename)
        dst_name = os.path.splitext(filename)[0] + ".png"
        dst = os.path.join(out_dir, dst_name)
        if os.path.exists(src):
            isolate_product(src, dst, session=session, crop_roi=crop_roi, pad_pct=pad_pct, y_offset=y_offset)

    # 2. Tight Professional Real Photo Crops (Type 2 - where background removal would clip complex structural members)
    TIGHT_CROP_ITEMS = [
        ("structural_frame_01.jpg", assets_dir, (0.05, 0.02, 0.95, 0.98)),
        ("structural_frame_02.jpg", assets_dir, (0.08, 0.05, 0.92, 0.95)),
        ("structural_frame_03.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98)),
        ("structural_frame_05.jpg", assets_dir, (0.02, 0.05, 0.98, 0.95)),
        ("structural_frame_07.jpg", assets_dir, (0.02, 0.05, 0.98, 0.95)),
        ("sheetmetal_ducts_12.jpg", assets_dir, (0.05, 0.08, 0.95, 0.92)),
        ("equipment_group_21.jpg", assets_dir, (0.02, 0.02, 0.98, 0.98)),
        ("01_high_altitude_checking.jpg", curated_dir, (0.05, 0.05, 0.95, 0.95)),
        ("02_pvc_belt_conveyor.jpg", curated_dir, (0.02, 0.05, 0.98, 0.95)),
        ("02_z_magnetic_conveyor.jpg", curated_dir, (0.02, 0.05, 0.98, 0.95)),
        ("03_balance_straightening_press.jpg", curated_dir, (0.05, 0.02, 0.95, 0.98)),
    ]
    
    for filename, directory, crop_roi in TIGHT_CROP_ITEMS:
        src = os.path.join(directory, filename)
        dst_name = os.path.splitext(filename)[0] + ".png"
        dst = os.path.join(out_dir, dst_name)
        if os.path.exists(src):
            create_tight_clean_crop(src, dst, crop_roi=crop_roi)

    # 3. CAD 3D Models (Type 3 - Intact Engineering Diagrams)
    CAD_ITEMS = [
        ("cad_design_24.jpg", assets_dir),
        ("cad_design_25.jpg", assets_dir),
        ("cad_design_26.jpg", assets_dir),
        ("cad_design_27.jpg", assets_dir),
    ]
    
    for filename, directory in CAD_ITEMS:
        src = os.path.join(directory, filename)
        dst_name = os.path.splitext(filename)[0] + ".png"
        dst = os.path.join(out_dir, dst_name)
        if os.path.exists(src):
            img = Image.open(src).convert('RGB')
            # Enhance contrast & sharpness
            enh_c = ImageEnhance.Contrast(img)
            img = enh_c.enhance(1.08)
            enh_s = ImageEnhance.Sharpness(img)
            img = enh_s.enhance(1.15)
            
            # Center on 1000x1000 white canvas
            cw, ch = img.size
            scale = min(940 / cw, 940 / ch)
            new_w, new_h = int(cw * scale), int(ch * scale)
            resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            canvas = Image.new('RGB', (1000, 1000), (255, 255, 255))
            canvas.paste(resized, ((1000 - new_w) // 2, (1000 - new_h) // 2))
            canvas.save(dst, 'PNG', quality=95)
            print(f"[CAD Preserved] {filename} -> {dst_name}")

if __name__ == '__main__':
    run_pipeline()
