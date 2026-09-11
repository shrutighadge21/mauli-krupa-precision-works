import os
from PIL import Image

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
curated_dir = os.path.join(base_dir, "public", "images", "real_products_curated")

print("--- GALLERY ASSETS ---")
for f in sorted(os.listdir(assets_dir)):
    p = os.path.join(assets_dir, f)
    if os.path.isfile(p):
        im = Image.open(p)
        print(f"{f:32s} | Size: {im.size} | Mode: {im.mode}")

print("\n--- REAL PRODUCTS CURATED ---")
for f in sorted(os.listdir(curated_dir)):
    p = os.path.join(curated_dir, f)
    if os.path.isfile(p):
        im = Image.open(p)
        print(f"{f:32s} | Size: {im.size} | Mode: {im.mode}")
