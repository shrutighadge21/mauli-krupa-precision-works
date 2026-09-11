import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import numpy as np

def ensure_dir(d):
    os.makedirs(d, exist_ok=True)

def create_studio_focused_crop(in_file, out_file, canvas_size=1000, crop_box=None, contrast=1.06, sharpness=1.18):
    """
    For images where the product has complex structural wires/pipes or where full cutout
    damages authenticity: create a pristine, razor-sharp studio focus crop framed neatly into 1:1 canvas.
    """
    img = Image.open(in_file).convert('RGB')
    w, h = img.size
    
    if crop_box:
        # crop_box is (left_frac, top_frac, right_frac, bottom_frac)
        x0 = int(crop_box[0] * w)
        y0 = int(crop_box[1] * h)
        x1 = int(crop_box[2] * w)
        y1 = int(crop_box[3] * h)
        cropped = img.crop((x0, y0, x1, y1))
    else:
        # Center-crop or fit
        cropped = img
        
    # Enhance clarity and sharpness naturally
    enh_c = ImageEnhance.Contrast(cropped)
    cropped = enh_c.enhance(contrast)
    enh_s = ImageEnhance.Sharpness(cropped)
    cropped = enh_s.enhance(sharpness)
    
    cw, ch = cropped.size
    target_dim = canvas_size
    
    # Fill 1:1 square canvas cleanly
    # Fit object to fill canvas neatly
    scale = max(target_dim / cw, target_dim / ch)
    new_w, new_h = int(cw * scale), int(ch * scale)
    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Center crop into 1000x1000
    left = (new_w - target_dim) // 2
    top = (new_h - target_dim) // 2
    final_img = resized.crop((left, top, left + target_dim, top + target_dim))
    
    # Save with high quality
    final_img.save(out_file, 'PNG', quality=95)
    print(f"[Studio Crop Refined] {os.path.basename(in_file)} -> {os.path.basename(out_file)}")

def refine_all():
    base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
    prod_dir = os.path.join(base_dir, "public", "images", "gallery_products")
    assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
    curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")
    
    # 1. sheetmetal_ducts_12.jpg: Stainless Steel Ducting - batch of rectangular ducts on workshop floor.
    # A tight focused crop highlighting the precision weld joints and flanged SS duct segments.
    f_in = os.path.join(assets_dir, "sheetmetal_ducts_12.jpg")
    f_out = os.path.join(prod_dir, "sheetmetal_ducts_12.png")
    create_studio_focused_crop(f_in, f_out, crop_box=(0.10, 0.15, 0.90, 0.88), contrast=1.08, sharpness=1.2)
    
    # 2. 02_z_magnetic_conveyor.jpg: Z Magnetic Incline Conveyor
    f_in = os.path.join(curated_dir, "02_z_magnetic_conveyor.jpg")
    f_out = os.path.join(prod_dir, "02_z_magnetic_conveyor.png")
    create_studio_focused_crop(f_in, f_out, crop_box=(0.02, 0.08, 0.98, 0.92), contrast=1.06, sharpness=1.18)

    # 3. 01_high_altitude_checking.jpg: High Altitude Checking Rig
    f_in = os.path.join(curated_dir, "01_high_altitude_checking.jpg")
    f_out = os.path.join(prod_dir, "01_high_altitude_checking.png")
    create_studio_focused_crop(f_in, f_out, crop_box=(0.15, 0.05, 0.85, 0.95), contrast=1.06, sharpness=1.18)

    # 4. 03_balance_straightening_press.jpg: Straightening Press Machine
    f_in = os.path.join(curated_dir, "03_balance_straightening_press.jpg")
    f_out = os.path.join(prod_dir, "03_balance_straightening_press.png")
    create_studio_focused_crop(f_in, f_out, crop_box=(0.12, 0.04, 0.88, 0.96), contrast=1.08, sharpness=1.2)

    # 5. structural_frame_02.jpg: Vertical Column Framework
    f_in = os.path.join(assets_dir, "structural_frame_02.jpg")
    f_out = os.path.join(prod_dir, "structural_frame_02.png")
    create_studio_focused_crop(f_in, f_out, crop_box=(0.12, 0.05, 0.88, 0.95), contrast=1.06, sharpness=1.18)

    # 6. structural_frame_05.jpg: Elevated Gantry Platform
    f_in = os.path.join(assets_dir, "structural_frame_05.jpg")
    f_out = os.path.join(prod_dir, "structural_frame_05.png")
    create_studio_focused_crop(f_in, f_out, crop_box=(0.05, 0.12, 0.95, 0.88), contrast=1.06, sharpness=1.18)

if __name__ == '__main__':
    refine_all()
