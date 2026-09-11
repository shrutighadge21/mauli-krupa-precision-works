import os
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import scipy.ndimage as ndi
import rembg

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")
test_out_dir = os.path.join(base_dir, "public", "images", "gallery_repair_tests")
os.makedirs(test_out_dir, exist_ok=True)

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

def custom_isolate(src_path, dst_path, crop_roi=None, fill_holes=True, threshold=25, canvas_size=1000, pad=0.08, y_offset=-0.02):
    img = Image.open(src_path).convert('RGBA')
    w, h = img.size
    if crop_roi:
        x0, y0, x1, y1 = [int(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop_roi)]
        img = img.crop((x0, y0, x1, y1))
        
    rgb = img.convert('RGB')
    enh_s = ImageEnhance.Sharpness(rgb)
    rgb = enh_s.enhance(1.15)
    enh_c = ImageEnhance.Contrast(rgb)
    rgb = enh_c.enhance(1.05)
    
    cutout = rembg.remove(rgb, session=session, alpha_matting=False, post_process_mask=True)
    arr = np.array(cutout)
    alpha = arr[:, :, 3]
    
    binary = alpha > threshold
    if fill_holes:
        binary = ndi.binary_fill_holes(binary)
        
    # Remove isolated tiny speckles < 200 pixels
    labeled, num_features = ndi.label(binary)
    if num_features > 0:
        sizes = ndi.sum(binary, labeled, range(num_features + 1))
        max_label = np.argmax(sizes[1:]) + 1
        mask_keep = (sizes[labeled] > 300) | (labeled == max_label)
        binary = binary & mask_keep
        
    smooth_alpha = ndi.gaussian_filter(binary.astype(float) * 255.0, sigma=0.6)
    arr[:, :, 3] = np.where(binary, np.maximum(alpha, 220), np.clip(smooth_alpha, 0, 255).astype(np.uint8))
    
    clean_cutout = defringe_alpha(Image.fromarray(arr, 'RGBA'))
    
    # Bounding box
    alpha_clean = np.array(clean_cutout)[:, :, 3]
    y_idx, x_idx = np.where(alpha_clean > 20)
    if len(y_idx) == 0:
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
    print(f"Isolated: {os.path.basename(src_path)} -> {os.path.basename(dst_path)} ({target_w}x{target_h})")
    return True

def tight_crop(src_path, dst_path, crop_roi=None, canvas_size=1000, contrast=1.06, sharpness=1.18):
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
    print(f"Tight Crop: {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")

# Test candidate cutouts vs crops
print("Testing candidate cutouts on 12 items...")
