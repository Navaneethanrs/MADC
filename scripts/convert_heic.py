from PIL import Image
import pillow_heif
import sys
from pathlib import Path

def convert(src, dst):
    heif_file = pillow_heif.read_heif(src)
    image = Image.frombytes(
        heif_file.mode,
        heif_file.size,
        heif_file.data,
        "raw"
    )
    image.save(dst, format='JPEG', quality=95)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: convert_heic.py input.heic output.jpg')
        sys.exit(1)
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    if not src.exists():
        print(f"Source not found: {src}")
        sys.exit(2)
    convert(src, dst)
    print(f"Converted {src} -> {dst}")
