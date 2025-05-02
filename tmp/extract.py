import re
import os
from PIL import Image
import re

# Configuration
sprite_path = "icons.webp"
output_folder = "icons"
icon_size = 66
css_path = "styles.css"

# Prepare output directory
os.makedirs(output_folder, exist_ok=True)

# Load sprite sheet
sprite = Image.open(sprite_path)

# Read and parse CSS
with open(css_path, "r") as f:
    css_content = f.read()

# Regex to match class name and background-position
pattern = re.compile(
    r"\.(.*?)::before\s*\{\s*background-image:\s*url\([^)]+\);\s*background-position:\s*(-?\d+)px\s*(-?\d+)px;\s*\}"
)

matches = pattern.findall(css_content)

# Simple CSS unescape function
def unescape_css_identifier(s):
    # Convert \XX hexadecimal escapes (if any) — rare, but valid CSS
    s = re.sub(r'\\([0-9a-fA-F]{1,6})\s?', lambda m: chr(int(m.group(1), 16)), s)
    # Unescape backslashes before normal characters
    return s.replace("\\", "")

# Group class names by background-position
position_to_names = {}
for class_name, x_str, y_str in matches:
    position = (int(x_str), int(y_str))
    if position not in position_to_names:
        position_to_names[position] = []
    position_to_names[position].append(unescape_css_identifier(class_name))

# Export only one image per unique position, using shortest name
for (x, y), class_names in position_to_names.items():
    shortest_name = min(class_names, key=len)
    left = -x
    top = -y
    box = (left, top, left + icon_size, top + icon_size)
    icon = sprite.crop(box)

    # Sanitize filename: allow only safe characters
    safe_name = re.sub(r'[^\w\.\-\+%]', '_', shortest_name)
    out_path = os.path.join(output_folder, f"{safe_name}.png")

    icon.save(out_path)
    print(f"Saved {safe_name}.png (from {len(class_names)} aliases)")

print(f"✅ Done! Exported {len(position_to_names)} unique icons.")
