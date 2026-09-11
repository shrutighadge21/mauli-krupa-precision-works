import os
from PIL import Image
import numpy as np

def verify():
    base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
    png_dir = os.path.join(base_dir, "public", "images", "gallery_png_products")
    
    files = sorted(os.listdir(png_dir))
    print(f"Total processed files in gallery_png_products: {len(files)}\n")
    
    for f in files:
        p = os.path.join(png_dir, f)
        im = Image.open(p)
        w, h = im.size
        size_kb = os.path.getsize(p) // 1024
        
        if im.mode == 'RGBA':
            arr = np.array(im)
            alpha = arr[:, :, 3]
            opaque_pct = (alpha > 30).sum() / (w * h) * 100
            
            # Find bounds
            y_idx, x_idx = np.where(alpha > 20)
            if len(y_idx) > 0:
                bw = np.max(x_idx) - np.min(x_idx)
                bh = np.max(y_idx) - np.min(y_idx)
                print(f"[TRANSPARENT PNG] {f:35s} | Dim: {w}x{h} | Obj: {bw:4d}x{bh:4d} | Area: {opaque_pct:4.1f}% | {size_kb} KB")
            else:
                print(f"[EMPTY ALPHA]     {f:35s} | Dim: {w}x{h} | EMPTY")
        else:
            print(f"[REAL PHOTO/CAD]  {f:35s} | Dim: {w}x{h} | RGB Mode | {size_kb} KB")

if __name__ == '__main__':
    verify()
