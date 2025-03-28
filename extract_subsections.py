import os
import json
from pathlib import Path

root_dir = Path("public/blogs/cn")

# Resulting structure: {section: [sub_section1, sub_section2, ...]}
section_map = {}

for section in os.listdir(root_dir):
    section_path = root_dir / section
    if not os.path.isdir(section_path):
        continue 

    sub_sections = [
        sub_section 
        for sub_section in os.listdir(section_path) 
        if os.path.isdir(section_path / sub_section)
    ]

    if sub_sections:
        section_map[section] = sub_sections

# Write to JSON file (with ensure_ascii=False to preserve Chinese characters)
output_path = "sections.json"
with open(output_path, "w", encoding='utf-8') as f:
    json.dump(section_map, f, indent=2, ensure_ascii=False)

print(f"Generated {output_path}:")
print(json.dumps(section_map, indent=2, ensure_ascii=False))