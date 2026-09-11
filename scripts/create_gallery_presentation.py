import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
out_dir = os.path.join(base_dir, "public", "images", "gallery_presentation")
os.makedirs(out_dir, exist_ok=True)

assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")

def process_image(src_path, dst_path, crop_box=None, fit_mode="cover", pad_color=(248, 250, 252), contrast=1.05, sharpness=1.15, canvas_size=1000):
    """
    Carefully crops and frames the REAL, AUTHENTIC product photograph.
    crop_box: tuple of (x0_pct, y0_pct, x1_pct, y1_pct) specifying the focal region containing the entire machine.
    Never removes or damages any machine part.
    """
    img = Image.open(src_path).convert('RGB')
    w, h = img.size
    
    if crop_box:
        x0 = int(crop_box[0] * w)
        y0 = int(crop_box[1] * h)
        x1 = int(crop_box[2] * w)
        y1 = int(crop_box[3] * h)
        img = img.crop((x0, y0, x1, y1))
        
    # Enhance clarity and natural sharpness
    if contrast != 1.0:
        enh_c = ImageEnhance.Contrast(img)
        img = enh_c.enhance(contrast)
    if sharpness != 1.0:
        enh_s = ImageEnhance.Sharpness(img)
        img = enh_s.enhance(sharpness)
        
    cw, ch = img.size
    
    if fit_mode == "cover":
        # Square crop focusing on the product center
        target_dim = canvas_size
        scale = max(target_dim / cw, target_dim / ch)
        new_w, new_h = int(cw * scale), int(ch * scale)
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center crop to 1:1
        left = (new_w - target_dim) // 2
        top = (new_h - target_dim) // 2
        final_img = resized.crop((left, top, left + target_dim, top + target_dim))
    elif fit_mode == "contain":
        # Contain inside 1:1 canvas with clean neutral padding so nothing is cropped
        target_dim = canvas_size
        scale = min(target_dim * 0.96 / cw, target_dim * 0.96 / ch)
        new_w, new_h = int(cw * scale), int(ch * scale)
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        final_img = Image.new('RGB', (target_dim, target_dim), pad_color)
        pos_x = (target_dim - new_w) // 2
        pos_y = (target_dim - new_h) // 2
        final_img.paste(resized, (pos_x, pos_y))
        
    final_img.save(dst_path, 'JPEG', quality=95)
    print(f"Processed: {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")

# Configurations tailored for every individual photograph:
# Ensuring 100% of all frames, brackets, nozzles, hoppers, wheels, shafts, motors, weldments are preserved
RECIPES = {
    # Structural Fabrication
    "structural_frame_01.jpg": {"crop_box": (0.05, 0.02, 0.95, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_02.jpg": {"crop_box": (0.08, 0.05, 0.92, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_03.jpg": {"crop_box": (0.02, 0.02, 0.98, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_04.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_05.jpg": {"crop_box": (0.02, 0.05, 0.98, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_06.jpg": {"crop_box": (0.05, 0.02, 0.95, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_07.jpg": {"crop_box": (0.02, 0.05, 0.98, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_08.jpg": {"crop_box": (0.05, 0.02, 0.95, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    "structural_frame_09.jpg": {"crop_box": (0.02, 0.05, 0.98, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.15},
    
    # Sheet Metal & Ducts
    "sheetmetal_hopper_10.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "sheetmetal_cabinet_11.jpg": {"crop_box": (0.10, 0.05, 0.90, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "sheetmetal_ducts_12.jpg": {"crop_box": (0.05, 0.08, 0.95, 0.92), "fit_mode": "contain", "contrast": 1.08, "sharpness": 1.20},
    "sheetmetal_ducts_13.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "sheetmetal_ducts_14.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "vertical_ducts_17.jpg": {"crop_box": (0.05, 0.02, 0.95, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    
    # Industrial Equipment & Skids
    "rotary_airlock_16.jpg": {"crop_box": (0.08, 0.05, 0.92, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "rotary_feeder_18.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "process_skid_19.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "filtration_skid_20.jpg": {"crop_box": (0.05, 0.02, 0.95, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "industrial_frame_15.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "equipment_group_21.jpg": {"crop_box": (0.02, 0.02, 0.98, 0.98), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    
    # Cabinets & Enclosures
    "enclosure_cabinet_22.jpg": {"crop_box": (0.08, 0.05, 0.92, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "enclosure_cabinet_23.jpg": {"crop_box": (0.08, 0.05, 0.92, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    
    # CAD 3D Models (Untouched diagrams, enhanced clarity)
    "cad_design_24.jpg": {"crop_box": (0.02, 0.02, 0.98, 0.98), "fit_mode": "contain", "contrast": 1.08, "sharpness": 1.20, "pad_color": (255, 255, 255)},
    "cad_design_25.jpg": {"crop_box": (0.02, 0.02, 0.98, 0.98), "fit_mode": "contain", "contrast": 1.08, "sharpness": 1.20, "pad_color": (255, 255, 255)},
    "cad_design_26.jpg": {"crop_box": (0.02, 0.02, 0.98, 0.98), "fit_mode": "contain", "contrast": 1.08, "sharpness": 1.20, "pad_color": (255, 255, 255)},
    "cad_design_27.jpg": {"crop_box": (0.02, 0.02, 0.98, 0.98), "fit_mode": "contain", "contrast": 1.08, "sharpness": 1.20, "pad_color": (255, 255, 255)},
    
    # Real Products Curated (Bhosari Workshop)
    "01_fixture_making.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "01_high_altitude_checking.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "02_pvc_belt_conveyor.jpg": {"crop_box": (0.02, 0.05, 0.98, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "02_z_magnetic_conveyor.jpg": {"crop_box": (0.02, 0.05, 0.98, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "03_balance_straightening_press.jpg": {"crop_box": (0.05, 0.02, 0.95, 0.98), "fit_mode": "contain", "contrast": 1.08, "sharpness": 1.20},
    "03_fuel_sensor_testing_rig.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "03_welding_spm.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "04_industrial_equipment_lift.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "04_material_handling_trolley.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "04_pneumatic_lifting_tackle.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
    "05_hydraulic_press_structure.jpg": {"crop_box": (0.05, 0.05, 0.95, 0.95), "fit_mode": "contain", "contrast": 1.06, "sharpness": 1.18},
}

def main():
    for f, config in RECIPES.items():
        # Check if in gallery_assets or real_products_curated
        src = os.path.join(assets_dir, f)
        if not os.path.exists(src):
            src = os.path.join(curated_dir, f)
            
        if not os.path.exists(src):
            print(f"Warning: file not found {f}")
            continue
            
        dst_name = os.path.splitext(f)[0] + ".jpg"
        dst = os.path.join(out_dir, dst_name)
        process_image(src, dst, **config)

    # Special handling for coal_crusher_01.png
    src_coal = os.path.join(assets_dir, "coal_crusher_01.png")
    if os.path.exists(src_coal):
        dst_coal = os.path.join(out_dir, "coal_crusher_01.png")
        img_coal = Image.open(src_coal)
        # Place centered in clean canvas
        cw, ch = img_coal.size
        target_dim = 1000
        scale = min(target_dim * 0.92 / cw, target_dim * 0.92 / ch)
        new_w, new_h = int(cw * scale), int(ch * scale)
        resized_coal = img_coal.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        canvas = Image.new('RGBA', (target_dim, target_dim), (248, 250, 252, 255))
        pos_x = (target_dim - new_w) // 2
        pos_y = (target_dim - new_h) // 2
        canvas.paste(resized_coal, (pos_x, pos_y), resized_coal if resized_coal.mode == 'RGBA' else None)
        canvas.convert('RGB').save(os.path.join(out_dir, "coal_crusher_01.jpg"), 'JPEG', quality=95)
        print("Processed coal crusher")

if __name__ == "__main__":
    main()
