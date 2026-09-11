import os
import sys
import glob
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import numpy as np

def ensure_dir(d):
    if not os.path.exists(d):
        os.makedirs(d, exist_ok=True)

def process_cad_image(input_path, output_path, canvas_size=1000):
    """
    For CAD drawings/diagrams: DO NOT remove background.
    Center and frame into a clean square canvas with subtle contrast enhancement.
    """
    img = Image.open(input_path).convert('RGB')
    
    # Auto-enhance contrast and sharpness slightly for CAD clarity
    enhancer_contrast = ImageEnhance.Contrast(img)
    img = enhancer_contrast.enhance(1.08)
    enhancer_sharp = ImageEnhance.Sharpness(img)
    img = enhancer_sharp.enhance(1.15)
    
    w, h = img.size
    # Fit into canvas_size preserving aspect ratio with clean border
    max_dim = int(canvas_size * 0.92)
    ratio = min(max_dim / w, max_dim / h)
    new_w, new_h = int(w * ratio), int(h * ratio)
    img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Canvas background matching CAD backdrop or clean #ffffff/#f8fafc
    canvas = Image.new('RGB', (canvas_size, canvas_size), (255, 255, 255))
    offset_x = (canvas_size - new_w) // 2
    offset_y = (canvas_size - new_h) // 2
    canvas.paste(img_resized, (offset_x, offset_y))
    
    canvas.save(output_path, 'PNG', quality=95)
    print(f"[CAD Preserved] {os.path.basename(input_path)} -> {os.path.basename(output_path)}")

def process_product_image(input_path, output_path, session=None, canvas_size=1000, target_padding=0.12, shift_y=-0.04):
    """
    Isolate product from background using rembg.
    Crop to bounding box of object.
    Place centered into a square transparent canvas with breathing room.
    shift_y: subtle upward shift so object sits perfectly centered above the bottom hover overlay.
    """
    import rembg
    
    img = Image.open(input_path).convert('RGBA')
    w_orig, h_orig = img.size
    
    # Pre-enhance sharpness/clarity before cutout
    rgb = img.convert('RGB')
    enhancer_sharp = ImageEnhance.Sharpness(rgb)
    rgb = enhancer_sharp.enhance(1.1)
    
    # Rembg cutout
    cutout = rembg.remove(
        rgb,
        session=session,
        alpha_matting=False,
        post_process_mask=True
    )
    
    # Extract alpha channel to find bounding box
    np_cutout = np.array(cutout)
    alpha = np_cutout[:, :, 3]
    
    # Find bounding box where alpha > 15
    y_indices, x_indices = np.where(alpha > 15)
    if len(y_indices) == 0 or len(x_indices) == 0:
        print(f"[Warning: Empty Mask] fallback for {input_path}")
        # fallback: tight crop of original
        cropped = img
    else:
        min_x, max_x = np.min(x_indices), np.max(x_indices)
        min_y, max_y = np.min(y_indices), np.max(y_indices)
        
        # Add tiny 4px buffer around mask
        min_x = max(0, min_x - 4)
        min_y = max(0, min_y - 4)
        max_x = min(w_orig, max_x + 4)
        max_y = min(h_orig, max_y + 4)
        
        cropped = cutout.crop((min_x, min_y, max_x, max_y))
    
    cw, ch = cropped.size
    
    # Calculate scale to fit nicely into canvas with breathing room
    max_allowed_w = int(canvas_size * (1.0 - target_padding * 2))
    max_allowed_h = int(canvas_size * (1.0 - target_padding * 2))
    
    scale = min(max_allowed_w / cw, max_allowed_h / ch)
    target_w = int(cw * scale)
    target_h = int(ch * scale)
    
    resized_cropped = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Create transparent square canvas
    canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    pos_x = (canvas_size - target_w) // 2
    # Apply vertical offset: center with slight upward bias to ensure clearance above bottom overlay
    pos_y = (canvas_size - target_h) // 2 + int(canvas_size * shift_y)
    pos_y = max(int(canvas_size * 0.04), min(pos_y, canvas_size - target_h - int(canvas_size * 0.04)))
    
    canvas.paste(resized_cropped, (pos_x, pos_y), resized_cropped)
    
    canvas.save(output_path, 'PNG', optimize=True)
    print(f"[Isolated Product] {os.path.basename(input_path)} -> {os.path.basename(output_path)} ({target_w}x{target_h} in {canvas_size}x{canvas_size})")

def main():
    import rembg
    session = rembg.new_session("u2net")
    
    base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
    out_dir = os.path.join(base_dir, "public", "images", "gallery_products")
    ensure_dir(out_dir)
    
    # List of gallery assets
    gallery_assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
    real_curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")
    
    # Process gallery_assets
    for f in os.listdir(gallery_assets_dir):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        in_file = os.path.join(gallery_assets_dir, f)
        out_name = os.path.splitext(f)[0] + ".png"
        out_file = os.path.join(out_dir, out_name)
        
        if "cad_design" in f.lower():
            process_cad_image(in_file, out_file)
        else:
            process_product_image(in_file, out_file, session=session)
            
    # Process real_products_curated
    for f in os.listdir(real_curated_dir):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        in_file = os.path.join(real_curated_dir, f)
        out_name = os.path.splitext(f)[0] + ".png"
        out_file = os.path.join(out_dir, out_name)
        process_product_image(in_file, out_file, session=session)
        
    print("\nAll gallery products processed successfully into:", out_dir)

if __name__ == "__main__":
    main()
