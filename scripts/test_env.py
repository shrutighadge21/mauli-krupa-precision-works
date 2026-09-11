import os
import sys
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

def test_imports():
    try:
        import rembg
        print("rembg imported successfully!")
        return True
    except ImportError as e:
        print(f"rembg import error: {e}")
        return False

if __name__ == "__main__":
    test_imports()
