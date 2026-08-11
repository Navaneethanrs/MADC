import os
from PIL import Image, ImageOps

def optimize_image(filepath, max_dim=1600, quality=82):
    try:
        with Image.open(filepath) as img:
            img = ImageOps.exif_transpose(img)
            
            # Convert RGBA to RGB if saving as JPEG
            if img.mode in ('RGBA', 'LA', 'P'):
                bg = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                bg.paste(img, mask=img.split()[-1] if 'A' in img.mode else None)
                img = bg

            w, h = img.size
            if w > max_dim or h > max_dim:
                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
            
            orig_size = os.path.getsize(filepath) / (1024 * 1024)
            img.save(filepath, 'JPEG', quality=quality, optimize=True)
            new_size = os.path.getsize(filepath) / (1024 * 1024)
            print(f"Optimized {os.path.basename(filepath)}: {orig_size:.2f}MB -> {new_size:.2f}MB")
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

def main():
    achievements_dir = 'public/achievements'
    team_dir = 'public/team'

    print("=== Optimizing Achievements Photos ===")
    for f in os.listdir(achievements_dir):
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            fp = os.path.join(achievements_dir, f)
            optimize_image(fp, max_dim=1600, quality=82)

    print("\n=== Optimizing Team Member Photos ===")
    for f in os.listdir(team_dir):
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            fp = os.path.join(team_dir, f)
            optimize_image(fp, max_dim=600, quality=82)

if __name__ == '__main__':
    main()
