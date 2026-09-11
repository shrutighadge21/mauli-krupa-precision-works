import os
import sys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import scipy.ndimage as ndi
import rembg

def ensure_dir(d):
    os.makedirs(d, exist_ok=True)

def defringe_alpha(img_rgba, radius=2):
    """
    Removes white or dark fringe / halo around alpha edges by color bleeding the interior RGB.
    """
    arr = np.array(img_rgba)
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    
    # Mask of fully opaque and translucent pixels
    solid = alpha > 220
    if not np.any(solid):
        return img_rgba
        
    # Distance transform to propagate edge RGB into translucent pixels
    indices = ndi.distance_transform_edt(~solid, return_distances=False, return_indices=True)
    clean_rgb = rgb[indices[0], indices[1]]
    
    # Smooth alpha slightly to prevent staircasing/jagged edges
    smoothed_alpha = ndi.gaussian_filter(alpha.astype(float), sigma=0.6)
    smoothed_alpha = np.clip(smoothed_alpha, 0, 255).astype(np.uint8)
    
    result = np.dstack((clean_rgb, smoothed_alpha))
    return Image.fromarray(result, 'RGBA')

def refine_machine_mask(alpha_mask, fill_holes=True, min_area=500):
    """
    Preserves structural machine parts, removes isolated background speckles,
    and fills internal hollows that belong to the solid body.
    """
    binary = alpha_mask > 30
    
    if fill_holes:
        # Fill holes in the main structure
        binary = ndi.binary_fill_holes(binary)
        
    # Label connected components
    labeled, num_features = ndi.label(binary)
    if num_features > 0:
        # Find sizes of components
        sizes = ndi.sum(binary, labeled, range(num_features + 1))
        # Keep components with area > min_area or the largest component
        max_label = np.argmax(sizes[1:]) + 1
        mask_keep = (sizes[labeled] > min_area) | (labeled == max_label)
        binary = binary & mask_keep
        
    # Smooth edges
    smooth_mask = ndi.gaussian_filter(binary.astype(float) * 255.0, sigma=0.8)
    smooth_mask = np.clip(smooth_mask, 0, 255).astype(np.uint8)
    
    # Combine with original alpha for subtle details
    final_alpha = np.where(binary, np.maximum(alpha_mask, 230), smooth_mask)
    return final_alpha.astype(np.uint8)

def isolate_product(src_path, dst_path, session, crop_roi=None, canvas_size=1000, pad_pct=0.10, y_offset=-0.03):
    """
    Isolates product with surgical accuracy, centers it in a 1000x1000 transparent square canvas.
    """
    img = Image.open(src_path).convert('RGBA')
    w, h = img.size
    
    # Optional pre-crop to focus on the main machine and exclude distant workshop clutter
    if crop_roi:
        x0, y0, x1, y1 = [int(v * (w if i % 2 == 0 else h)) for i, v in enumerate(crop_roi)]
        img = img.crop((x0, y0, x1, y1))
        
    rgb = img.convert('RGB')
    
    # Subtle enhancement for crisp machinery edges
    enh_s = ImageEnhance.Sharpness(rgb)
    rgb_sharp = enh_s.enhance(1.12)
    enh_c = ImageEnhance.Contrast(rgb_sharp)
    rgb_sharp = enh_c.enhance(1.05)
    
    # AI segmentation
    cutout = rembg.remove(
        rgb_sharp,
        session=session,
        alpha_matting=False,
        post_process_mask=True
    )
    
    arr = np.array(cutout)
    alpha = arr[:, :, 3]
    
    # Refine mask: preserve all metal parts, fill holes, remove stray noise
    refined_alpha = refine_machine_mask(alpha, fill_holes=True)
    
    # Reassemble RGBA
    arr[:, :, 3] = refined_alpha
    clean_cutout = Image.fromarray(arr, 'RGBA')
    
    # Defringe edge halo
    clean_cutout = defringe_alpha(clean_cutout)
    
    # Find bounding box
    alpha_clean = np.array(clean_cutout)[:, :, 3]
    y_idx, x_idx = np.where(alpha_clean > 20)
    
    if len(y_idx) == 0 or len(x_idx) == 0:
        print(f"Warning: Empty cutout for {src_path}")
        return False
        
    min_x, max_x = np.min(x_idx), np.max(x_idx)
    min_y, max_y = np.min(y_idx), np.max(y_idx)
    
    # 4px padding around bounding box
    cw, ch = clean_cutout.size
    min_x = max(0, min_x - 4)
    min_y = max(0, min_y - 4)
    max_x = min(cw, max_x + 4)
    max_y = min(ch, max_y + 4)
    
    cropped = clean_cutout.crop((min_x, min_y, max_x, max_y))
    cw_crop, ch_crop = cropped.size
    
    # Scale to canvas with breathing room
    max_dim = int(canvas_size * (1.0 - pad_pct * 2))
    scale = min(max_dim / cw_crop, max_dim / ch_crop)
    target_w = int(cw_crop * scale)
    target_h = int(ch_crop * scale)
    
    resized_obj = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Place on 1000x1000 transparent canvas
    canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    pos_x = (canvas_size - target_w) // 2
    pos_y = (canvas_size - target_h) // 2 + int(canvas_size * y_offset)
    pos_y = max(int(canvas_size * 0.04), min(pos_y, canvas_size - target_h - int(canvas_size * 0.04)))
    
    canvas.paste(resized_obj, (pos_x, pos_y), resized_obj)
    canvas.save(dst_path, 'PNG', optimize=True)
    print(f"[Clean Cutout PNG] {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")
    return True

print("Master cutout engine loaded.")
