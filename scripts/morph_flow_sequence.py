import os
from PIL import Image
import numpy as np
from scipy import ndimage
from skimage.registration import optical_flow_tvl1
from skimage.color import rgb2gray

os.makedirs('public/images/cad_sequence', exist_ok=True)

# Load the 5 master keyframes
keyframes = []
for i in range(1, 6):
    img = Image.open(f'public/images/cad_keyframes/stage_{i:02d}.png').convert('RGBA')
    keyframes.append(img)

W, H = 1376, 768

def morph_pair(img0, img1, alpha):
    """
    Morph between img0 and img1 at parameter alpha in [0, 1] using optical flow warping.
    """
    if alpha <= 0.001:
        return img0
    if alpha >= 0.999:
        return img1
        
    arr0 = np.array(img0, dtype=np.float32)
    arr1 = np.array(img1, dtype=np.float32)
    
    gray0 = rgb2gray(arr0[:, :, :3] / 255.0)
    gray1 = rgb2gray(arr1[:, :, :3] / 255.0)
    
    # Compute forward optical flow (v, u) from img0 to img1
    # Downscale for fast & robust flow calculation
    scale = 0.5
    small_gray0 = ndimage.zoom(gray0, scale, order=1)
    small_gray1 = ndimage.zoom(gray1, scale, order=1)
    
    v_small, u_small = optical_flow_tvl1(small_gray0, small_gray1, attachment=15, tightness=0.3, num_warp=5, num_iter=10)
    
    # Upscale flow to full resolution
    u = ndimage.zoom(u_small, 1.0 / scale, order=1) * (1.0 / scale)
    v = ndimage.zoom(v_small, 1.0 / scale, order=1) * (1.0 / scale)
    
    # Meshgrid of pixel coordinates
    y_coords, x_coords = np.mgrid[0:H, 0:W]
    
    # Warp img0 forward by alpha * flow
    map_x0 = np.clip(x_coords - alpha * u, 0, W - 1)
    map_y0 = np.clip(y_coords - alpha * v, 0, H - 1)
    coords0 = np.array([map_y0, map_x0])
    
    # Warp img1 backward by (1 - alpha) * flow
    map_x1 = np.clip(x_coords + (1.0 - alpha) * u, 0, W - 1)
    map_y1 = np.clip(y_coords + (1.0 - alpha) * v, 0, H - 1)
    coords1 = np.array([map_y1, map_x1])
    
    warped0 = np.zeros_like(arr0)
    warped1 = np.zeros_like(arr1)
    
    for c in range(4):
        warped0[:, :, c] = ndimage.map_coordinates(arr0[:, :, c], coords0, order=1)
        warped1[:, :, c] = ndimage.map_coordinates(arr1[:, :, c], coords1, order=1)
        
    # Alpha crossfade between warped frames
    blended = (1.0 - alpha) * warped0 + alpha * warped1
    blended = np.clip(blended, 0, 255).astype(np.uint8)
    return Image.fromarray(blended, 'RGBA')

TOTAL_FRAMES = 16
kf_positions = np.linspace(0, 1, len(keyframes))

for frame_idx in range(TOTAL_FRAMES):
    p = frame_idx / (TOTAL_FRAMES - 1)
    
    seg_idx = 0
    while seg_idx < len(kf_positions) - 2 and p > kf_positions[seg_idx + 1]:
        seg_idx += 1
        
    p0 = kf_positions[seg_idx]
    p1 = kf_positions[seg_idx + 1]
    alpha = (p - p0) / (p1 - p0) if (p1 - p0) > 0 else 0
    alpha = max(0.0, min(1.0, alpha))
    
    img0 = keyframes[seg_idx]
    img1 = keyframes[seg_idx + 1]
    
    morphed = morph_pair(img0, img1, alpha)
    out_path = f'public/images/cad_sequence/frame_{frame_idx:02d}.png'
    morphed.save(out_path, 'PNG', optimize=True)
    print(f"Generated flow-morphed frame {frame_idx:02d} (p={p:.3f}, seg={seg_idx}->{seg_idx+1}, alpha={alpha:.3f}) -> {out_path}")

print("All 16 flow-morphed CAD frames generated successfully!")
