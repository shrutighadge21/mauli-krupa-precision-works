import os
from PIL import Image, ImageEnhance

base_dir = r"c:\Users\HeY MG\Desktop\Mauli Krupa"
assets_dir = os.path.join(base_dir, "public", "images", "gallery_assets")
png_dir = os.path.join(base_dir, "public", "images", "gallery_png_products")

# Formed Sheet Chutes: create a tight, razor-sharp studio crop preserving all batch chutes
src = os.path.join(assets_dir, "sheetmetal_ducts_14.jpg")
dst = os.path.join(png_dir, "sheetmetal_ducts_14.png")

img = Image.open(src).convert('RGB')
w, h = img.size
# Crop tightly around the batch of formed chutes
x0, y0, x1, y1 = int(0.08 * w), int(0.05 * h), int(0.92 * w), int(0.95 * h)
cropped = img.crop((x0, y0, x1, y1))

enh_c = ImageEnhance.Contrast(cropped)
cropped = enh_c.enhance(1.08)
enh_s = ImageEnhance.Sharpness(cropped)
cropped = enh_s.enhance(1.18)

cw, ch = cropped.size
target_dim = 1000
scale = max(target_dim / cw, target_dim / ch)
new_w, new_h = int(cw * scale), int(ch * scale)
resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

left = (new_w - target_dim) // 2
top = (new_h - target_dim) // 2
final_img = resized.crop((left, top, left + target_dim, top + target_dim))
final_img.save(dst, 'PNG', quality=95)
print(f"Refined sheetmetal_ducts_14 as complete tight crop: {os.path.getsize(dst)//1024} KB")
