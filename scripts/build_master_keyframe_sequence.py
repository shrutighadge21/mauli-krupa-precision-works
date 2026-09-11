import os
import shutil
from PIL import Image
import numpy as np

os.makedirs('public/images/cad_sequence', exist_ok=True)
os.makedirs('public/images/cad_keyframes', exist_ok=True)

# 5 Master Keyframes
keyframe_sources = [
    'public/images/cad_fixture/fixture_assembled.png',
    r'C:\Users\HeY MG\.gemini\antigravity-ide\brain\4364df1a-9c98-4097-ad9a-2260c45bbea8\cad_stage_20_1789123370178.jpg',
    r'C:\Users\HeY MG\.gemini\antigravity-ide\brain\4364df1a-9c98-4097-ad9a-2260c45bbea8\cad_stage_50_1789123318965.jpg',
    r'C:\Users\HeY MG\.gemini\antigravity-ide\brain\4364df1a-9c98-4097-ad9a-2260c45bbea8\cad_stage_75_1789123410659.jpg',
    'public/images/cad_fixture/fixture_exploded.png',
]

W, H = 1376, 768

# Load and standardize all 5 keyframes to exact 1376x768 RGBA with clean background
keyframes = []
for i, src in enumerate(keyframe_sources):
    img = Image.open(src).convert('RGBA')
    if img.size != (W, H):
        img = img.resize((W, H), Image.Resampling.LANCZOS)
    
    # Save standard master keyframe
    kf_path = f'public/images/cad_keyframes/stage_{i+1:02d}.png'
    img.save(kf_path, 'PNG', optimize=True)
    keyframes.append(np.array(img, dtype=float))
    print(f"Loaded master keyframe {i+1}: {kf_path}")

TOTAL_FRAMES = 16
keyframe_positions = np.linspace(0, 1, len(keyframes))

for frame_idx in range(TOTAL_FRAMES):
    p = frame_idx / (TOTAL_FRAMES - 1)  # 0.0 to 1.0
    
    # Find segment between keyframe A and keyframe B
    seg_idx = 0
    while seg_idx < len(keyframe_positions) - 2 and p > keyframe_positions[seg_idx + 1]:
        seg_idx += 1
        
    p0 = keyframe_positions[seg_idx]
    p1 = keyframe_positions[seg_idx + 1]
    blend = (p - p0) / (p1 - p0) if (p1 - p0) > 0 else 0
    blend = max(0.0, min(1.0, blend))
    
    arr0 = keyframes[seg_idx]
    arr1 = keyframes[seg_idx + 1]
    
    # Smooth cosine/linear blend
    arr_blend = (1.0 - blend) * arr0 + blend * arr1
    arr_blend = np.clip(arr_blend, 0, 255).astype(np.uint8)
    
    frame_img = Image.fromarray(arr_blend, 'RGBA')
    out_path = f'public/images/cad_sequence/frame_{frame_idx:02d}.png'
    frame_img.save(out_path, 'PNG', optimize=True)
    print(f"Generated frame {frame_idx:02d} (p={p:.3f}, seg={seg_idx}->{seg_idx+1}, blend={blend:.3f}) -> {out_path}")

print("Master 16-frame CAD sequence built successfully!")
