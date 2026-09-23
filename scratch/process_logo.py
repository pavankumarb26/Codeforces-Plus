from PIL import Image
import numpy as np
import os

src_path = r'C:\Users\pavan\.gemini\antigravity\brain\1baff096-5943-46ef-8f61-90409e89b20d\.user_uploaded\media_1790200946050.png'
img = Image.open(src_path).convert("RGBA")
arr = np.array(img)

# Non-white pixels mask (white is around RGB 255, 255, 255)
# Anything with R<245 or G<245 or B<245 is content
is_content = (arr[:, :, 0] < 240) | (arr[:, :, 1] < 240) | (arr[:, :, 2] < 240)
coords = np.argwhere(is_content)
ymin, xmin = coords.min(axis=0)
ymax, xmax = coords.max(axis=0)

print(f"Overall content bounds: Y: [{ymin}, {ymax}], X: [{xmin}, {xmax}]")

# Let's separate top icon symbol vs text
# Find row with empty space between symbol and text 'Codeforces'
row_has_content = is_content.any(axis=1)
# Find Y range for top symbol and bottom text
content_rows = np.where(row_has_content)[0]

# Split content into segments by looking for gaps in rows
gaps = []
for i in range(len(content_rows)-1):
    if content_rows[i+1] - content_rows[i] > 5:
        gaps.append((content_rows[i], content_rows[i+1]))

print("Content row gaps:", gaps)

# Symbol Y bounds: ymin to gaps[0][0]
symbol_ymin = ymin
symbol_ymax = gaps[0][0]

symbol_mask = is_content[symbol_ymin:symbol_ymax+1, :]
symbol_coords = np.argwhere(symbol_mask)
symbol_xmin = symbol_coords[:, 1].min()
symbol_xmax = symbol_coords[:, 1].max()

print(f"Symbol bounds: Y: [{symbol_ymin}, {symbol_ymax}], X: [{symbol_xmin}, {symbol_xmax}]")
