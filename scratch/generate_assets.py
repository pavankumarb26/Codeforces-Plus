import os
from PIL import Image, ImageOps
import numpy as np

src_path = r'C:\Users\pavan\.gemini\antigravity\brain\1baff096-5943-46ef-8f61-90409e89b20d\.user_uploaded\media_1790200946050.png'
out_dir = r'c:\Users\pavan\OneDrive\Desktop\codeforces-platform\client\public\logo'
public_dir = r'c:\Users\pavan\OneDrive\Desktop\codeforces-platform\client\public'

os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")

# Save original provided image into public/logo/
img.save(os.path.join(out_dir, 'codeforces-plus-logo-original.png'))

arr = np.array(img, dtype=np.float32)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Calculate whiteness distance: 255 - min(r, g, b)
# For pure white (255, 255, 255), whiteness distance is 0.
# For black/colored pixels, whiteness distance is high.
diff = 255.0 - np.minimum(np.minimum(r, g), np.minimum(b, g))
max_diff = np.maximum(255.0 - r, np.maximum(255.0 - g, 255.0 - b))

# Alpha transparency map: smooth transition for anti-aliased edges
alpha = np.clip((max_diff - 10.0) / 20.0, 0.0, 1.0) * 255.0
arr[:, :, 3] = alpha

img_trans = Image.fromarray(arr.astype(np.uint8), mode="RGBA")

# Overall content bounds
mask = arr[:, :, 3] > 10
coords = np.argwhere(mask)
ymin, xmin = coords[:, 0].min(), coords[:, 1].min()
ymax, xmax = coords[:, 0].max(), coords[:, 1].max()

padding = 10
ymin_p = max(0, ymin - padding)
ymax_p = min(img.height, ymax + padding)
xmin_p = max(0, xmin - padding)
xmax_p = min(img.width, xmax + padding)

# Crop full logo transparent
full_logo_trans = img_trans.crop((xmin_p, ymin_p, xmax_p, ymax_p))
full_logo_trans.save(os.path.join(out_dir, 'codeforces-plus-logo.png'))

# Also create full logo on dark background / white text version for dark sidebar
# For "Codeforces" text (which is black in original), we can create a version with white text for dark mode
arr_dark = np.array(img_trans, dtype=np.float32)
# Pixels in the lower text area that are near black (R<80, G<80, B<80)
# 'Codeforces' text is between Y=370 and Y=485
is_black_text = (arr_dark[:, :, 0] < 80) & (arr_dark[:, :, 1] < 80) & (arr_dark[:, :, 2] < 80) & (arr_dark[:, :, 3] > 50)
# Convert black text to bright white #F8FAFC for dark mode readability
arr_dark[is_black_text, 0] = 248.0
arr_dark[is_black_text, 1] = 250.0
arr_dark[is_black_text, 2] = 252.0

img_dark_trans = Image.fromarray(arr_dark.astype(np.uint8), mode="RGBA")
full_logo_dark_theme = img_dark_trans.crop((xmin_p, ymin_p, xmax_p, ymax_p))
full_logo_dark_theme.save(os.path.join(out_dir, 'codeforces-plus-logo-dark.png'))

# Crop Icon Symbol (3 bars + Plus sign)
# Symbol is top part, Y between 90 and 365
symbol_mask = mask[0:370, :]
symbol_coords = np.argwhere(symbol_mask)
sym_ymin, sym_xmin = symbol_coords[:, 0].min(), symbol_coords[:, 1].min()
sym_ymax, sym_xmax = symbol_coords[:, 0].max(), symbol_coords[:, 1].max()

sym_pad = 8
sym_ymin_p = max(0, sym_ymin - sym_pad)
sym_ymax_p = min(370, sym_ymax + sym_pad)
sym_xmin_p = max(0, sym_xmin - sym_pad)
sym_xmax_p = min(img.width, sym_xmax + sym_pad)

icon_img = img_trans.crop((sym_xmin_p, sym_ymin_p, sym_xmax_p, sym_ymax_p))
icon_img.save(os.path.join(out_dir, 'codeforces-plus-icon.png'))

# Also create square padded icon for favicons (making it 1:1 aspect ratio with centered icon)
w, h = icon_img.size
sq_size = max(w, h) + 16
sq_icon = Image.new("RGBA", (sq_size, sq_size), (0, 0, 0, 0))
sq_icon.paste(icon_img, ((sq_size - w) // 2, (sq_size - h) // 2))
sq_icon.save(os.path.join(out_dir, 'codeforces-plus-icon-square.png'))

# Favicon files in public/
sq_icon.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(public_dir, 'favicon.png'))
sq_icon.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(public_dir, 'android-chrome-192x192.png'))
sq_icon.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(public_dir, 'apple-touch-icon.png'))
sq_icon.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(public_dir, 'favicon-32x32.png'))
sq_icon.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(public_dir, 'favicon-16x16.png'))

# Save multi-resolution ICO file
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
sq_icon.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=ico_sizes)

print("All assets generated successfully!")
