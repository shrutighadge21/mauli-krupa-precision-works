import os
import sys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import scipy.ndimage as ndi
import rembg

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")
png_dir = os.path.join(base_dir, "public", "images", "gallery_png_products")
os.makedirs(png_dir, exist_ok=True)

session = rembg.new_session("isnet-general-use")

def defringe_alpha(img_rgba):
    arr = np.array(img_rgba)
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    solid = alpha > 220
    if not np.any(solid):
        return img_rgba
    indices = ndi.distance_transform_edt(~solid, return_distances=False, return_indices=True)
    clean_rgb = rgb[indices[0], indices[1]]
    smoothed_alpha = ndi.gaussian_filter(alpha.astype(float), sigma=0.5)
    smoothed_alpha = np.clip(smoothed_alpha, 0, 255).astype(np.uint8)
    return Image.fromarray(np.dstack((clean_rgb, smoothed_alpha)), 'RGBA')

def clean_transparent_cutout(src_path, dst_path, crop_roi=None, fill_holes=True, threshold=20, canvas_size=1000, pad=0.08, y_offset=-0.02):
    """
    Produces studio-quality transparent PNG without black halo, white fringe, or missing parts.
    """
    img = Image.open(src_path).convert('RGBA')
    w, h = img.size
    if crop_roi:
        x0, y0, x1, y1 = [int(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop_roi)]
        img = img.crop((x0, y0, x1, y1))
        
    rgb = img.convert('RGB')
    enh_s = ImageEnhance.Sharpness(rgb)
    rgb_sharp = enh_s.enhance(1.15)
    enh_c = ImageEnhance.Contrast(rgb_sharp)
    rgb_sharp = enh_c.enhance(1.05)
    
    cutout = rembg.remove(rgb_sharp, session=session, alpha_matting=False, post_process_mask=True)
    arr = np.array(cutout)
    alpha = arr[:, :, 3]
    
    binary = alpha > threshold
    if fill_holes:
        binary = ndi.binary_fill_holes(binary)
        
    # Remove tiny disconnected floating noise
    labeled, num_features = ndi.label(binary)
    if num_features > 0:
        sizes = ndi.sum(binary, labeled, range(num_features + 1))
        max_label = np.argmax(sizes[1:]) + 1
        mask_keep = (sizes[labeled] > 250) | (labeled == max_label)
        binary = binary & mask_keep
        
    smooth_alpha = ndi.gaussian_filter(binary.astype(float) * 255.0, sigma=0.6)
    arr[:, :, 3] = np.where(binary, np.maximum(alpha, 220), np.clip(smooth_alpha, 0, 255).astype(np.uint8))
    
    clean_cutout = defringe_alpha(Image.fromarray(arr, 'RGBA'))
    
    # Bounding box
    alpha_clean = np.array(clean_cutout)[:, :, 3]
    y_idx, x_idx = np.where(alpha_clean > 20)
    if len(y_idx) == 0:
        print(f"Error: empty alpha for {src_path}")
        return False
        
    cw, ch = clean_cutout.size
    min_x, max_x = max(0, np.min(x_idx) - 4), min(cw, np.max(x_idx) + 4)
    min_y, max_y = max(0, np.min(y_idx) - 4), min(ch, np.max(y_idx) + 4)
    
    cropped = clean_cutout.crop((min_x, min_y, max_x, max_y))
    cw_crop, ch_crop = cropped.size
    
    max_dim = int(canvas_size * (1.0 - pad * 2))
    scale = min(max_dim / cw_crop, max_dim / ch_crop)
    target_w, target_h = int(cw_crop * scale), int(ch_crop * scale)
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    pos_x = (canvas_size - target_w) // 2
    pos_y = (canvas_size - target_h) // 2 + int(canvas_size * y_offset)
    pos_y = max(int(canvas_size * 0.04), min(pos_y, canvas_size - target_h - int(canvas_size * 0.04)))
    
    canvas.paste(resized, (pos_x, pos_y), resized)
    canvas.save(dst_path, 'PNG', optimize=True)
    print(f"[Repaired Cutout PNG] {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")
    return True

def clean_tight_photo_crop(src_path, dst_path, crop_roi=None, canvas_size=1000, contrast=1.06, sharpness=1.18):
    """
    For complex equipment where transparency would damage fine lines,
    creates a tight, crystal-clear studio crop of the authentic photo.
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
    print(f"[Repaired Real Photo Crop] {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")

def clean_cad_crop(src_path, dst_path, crop_roi=(0.04, 0.08, 0.96, 0.92)):
    """
    Crops out laptop/monitor bezels and centers CAD model on clean crisp canvas.
    """
    img = Image.open(src_path).convert('RGB')
    w, h = img.size
    x0, y0, x1, y1 = [int(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop_roi)]
    cropped = img.crop((x0, y0, x1, y1))
    
    # Enhance line clarity
    enh_c = ImageEnhance.Contrast(cropped)
    cropped = enh_c.enhance(1.08)
    enh_s = ImageEnhance.Sharpness(cropped)
    cropped = enh_s.enhance(1.20)
    
    cw, ch = cropped.size
    scale = min(940 / cw, 940 / ch)
    new_w, new_h = int(cw * scale), int(ch * scale)
    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new('RGB', (1000, 1000), (255, 255, 255))
    canvas.paste(resized, ((1000 - new_w) // 2, (1000 - new_h) // 2))
    canvas.save(dst_path, 'PNG', quality=95)
    print(f"[Repaired CAD Model] {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")

def main():
    print("Repairing exactly the 12 specified items...\n")
    
    # 1. Stainless Steel Hopper
    clean_transparent_cutout(
        os.path.join(assets_dir, "sheetmetal_hopper_10.jpg"),
        os.path.join(png_dir, "sheetmetal_hopper_10.png"),
        crop_roi=(0.02, 0.02, 0.98, 0.98), pad=0.08, y_offset=-0.02
    )

    # 2. Flanged Chute Diverters
    clean_transparent_cutout(
        os.path.join(assets_dir, "sheetmetal_ducts_13.jpg"),
        os.path.join(png_dir, "sheetmetal_ducts_13.png"),
        crop_roi=(0.02, 0.02, 0.98, 0.98), pad=0.08, y_offset=-0.02
    )

    # 3. Fluid Process Skid (Complex piping/valves - Professional Tight Photo Crop as instructed)
    clean_tight_photo_crop(
        os.path.join(assets_dir, "process_skid_19.jpg"),
        os.path.join(png_dir, "process_skid_19.png"),
        crop_roi=(0.05, 0.05, 0.95, 0.95), contrast=1.06, sharpness=1.18
    )

    # 4. Filtration Vessel Rig
    clean_transparent_cutout(
        os.path.join(assets_dir, "filtration_skid_20.jpg"),
        os.path.join(png_dir, "filtration_skid_20.png"),
        crop_roi=(0.02, 0.02, 0.98, 0.98), pad=0.08, y_offset=-0.02
    )

    # 5. 3D Cyclone CAD Model (Crop out monitor bezel, focus on complete CAD drawing)
    clean_cad_crop(
        os.path.join(assets_dir, "cad_design_24.jpg"),
        os.path.join(png_dir, "cad_design_24.png"),
        crop_roi=(0.04, 0.08, 0.96, 0.92)
    )

    # 6. 3D Isometric CAD Layout (Crop out laptop bezel, focus on complete CAD model)
    clean_cad_crop(
        os.path.join(assets_dir, "cad_design_25.jpg"),
        os.path.join(png_dir, "cad_design_25.png"),
        crop_roi=(0.04, 0.08, 0.96, 0.92)
    )

    # 7. Hopper Support Truss (Thin structural rods - Professional Tight Photo Crop as instructed)
    clean_tight_photo_crop(
        os.path.join(assets_dir, "structural_frame_08.jpg"),
        os.path.join(png_dir, "structural_frame_08.png"),
        crop_roi=(0.05, 0.02, 0.95, 0.98), contrast=1.06, sharpness=1.18
    )

    # 8. Overhead Gantry Track (Long gantry structure - Professional Tight Photo Crop)
    clean_tight_photo_crop(
        os.path.join(assets_dir, "structural_frame_09.jpg"),
        os.path.join(png_dir, "structural_frame_09.png"),
        crop_roi=(0.02, 0.05, 0.98, 0.95), contrast=1.06, sharpness=1.18
    )

    # 9. Formed Sheet Chutes
    clean_transparent_cutout(
        os.path.join(assets_dir, "sheetmetal_ducts_14.jpg"),
        os.path.join(png_dir, "sheetmetal_ducts_14.png"),
        crop_roi=(0.02, 0.02, 0.98, 0.98), pad=0.08, y_offset=-0.02
    )

    # 10. Rigid Machine Base
    clean_transparent_cutout(
        os.path.join(assets_dir, "industrial_frame_15.jpg"),
        os.path.join(png_dir, "industrial_frame_15.png"),
        crop_roi=(0.02, 0.02, 0.98, 0.98), pad=0.08, y_offset=-0.02
    )

    # 11. Automated Welding SPM (Complex special purpose machine - Professional Tight Photo Crop as instructed)
    clean_tight_photo_crop(
        os.path.join(curated_dir, "03_welding_spm.jpg"),
        os.path.join(png_dir, "03_welding_spm.png"),
        crop_roi=(0.02, 0.05, 0.98, 0.95), contrast=1.06, sharpness=1.18
    )

    # 12. Hydraulic Press Structure
    clean_transparent_cutout(
        os.path.join(curated_dir, "05_hydraulic_press_structure.jpg"),
        os.path.join(png_dir, "05_hydraulic_press_structure.png"),
        crop_roi=(0.02, 0.02, 0.98, 0.98), pad=0.08, y_offset=-0.02
    )

    print("\nAll 12 specified items have been successfully repaired!")

if __name__ == '__main__':
    main()
