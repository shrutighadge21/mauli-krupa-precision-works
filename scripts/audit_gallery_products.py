import os
from PIL import Image
import numpy as np

def audit():
    base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
    prod_dir = os.path.join(base_dir, "public", "images", "gallery_products")
    assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
    curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")
    
    files = sorted(os.listdir(prod_dir))
    print(f"Total processed files: {len(files)}")
    
    for f in files:
        f_path = os.path.join(prod_dir, f)
        img = Image.open(f_path)
        w, h = img.size
        
        # Check alpha statistics
        if img.mode == 'RGBA':
            arr = np.array(img)
            alpha = arr[:, :, 3]
            opaque_pct = (alpha > 30).sum() / (w * h) * 100
            print(f"{f:35s} | {img.size} | Mode: {img.mode} | Opaque area: {opaque_pct:5.1f}% | Size: {os.path.getsize(f_path)//1024} KB")
        else:
            print(f"{f:35s} | {img.size} | Mode: {img.mode} | RGB (CAD) | Size: {os.path.getsize(f_path)//1024} KB")

if __name__ == '__main__':
    audit()
