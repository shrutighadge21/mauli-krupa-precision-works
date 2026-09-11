import os
from PIL import Image
import numpy as np

img_ass = Image.open('public/images/cad_fixture/fixture_assembled.png').convert('RGBA')
img_exp = Image.open('public/images/cad_fixture/fixture_exploded.png').convert('RGBA')

W, H = img_ass.size

# Let's inspect specific recognizable landmarks on both images to determine exact vectors:
# 1. Top Bridge arch top-left screw/circle:
# 2. Door panel top window corner:
# 3. Base plate bottom-left corner:
# 4. Left motor body center:
# 5. Right motor body center:

print(f"Image dimensions: {W}x{H}")
