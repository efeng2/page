import os 
import json
import re
from datetime import datetime

DEFAULT_DATE = "2025-01-01"
MAX_DESCRIPTION_LENGTH = 300
DEFAULT_IMAGE = "/page/images/default.png"

def find_first_image(md_file_path):
    """
    Scan the markdown file for the first image reference (e.g., ![alt](path)).
    Returns the image path or None if not found.
    """
    image_pattern = re.compile(r'!\[.*?\]\((.*?)\)')
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            for line in file:
                match = image_pattern.search(line)
                if match:
                    return match.group(1)
    except Exception as e:
        print(f"Error reading {md_file_path}: {e}")
    return None

def extract_blog_info(md_file_path):
    """
    Extracts title, date, short_description, section, and image from a markdown file.
    Defaults the date if not extracted, shortens the description, and finds an image.
    """
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

            if len(lines) < 5:
                print(f"Skipping {md_file_path}: Not enough content.")
                return None
            
            title = lines[0].strip().lstrip('#').strip()

            date = lines[1].strip()
            if not re.match(r'\d{4}-\d{2}-\d{2}', date):  # Default date
                print(f"Invalid date format in {md_file_path}, defaulting to {DEFAULT_DATE}.")
                date = DEFAULT_DATE

            short_description = lines[4].strip()[:MAX_DESCRIPTION_LENGTH]
            section = md_file_path.split(os.sep)[3]
            sub_section = md_file_path.split(os.sep)[4]
            
            # Determine image path
            img = DEFAULT_IMAGE
            image_loc = find_first_image(md_file_path)
            if image_loc:
                # if image_loc[0, 5] == 'https':
                #     img = image_loc
                # else:
                img = f'/page/blogs/en/{section}/{sub_section}/' + image_loc

            return {
                "title": title,
                "date": date,
                "short_description": short_description,
                "section": section,
                "sub_section": sub_section,
                "img": img
            }
        
    except Exception as e:
        print(f"Error processing {md_file_path}: {e}")
        return None

def extract_from_directory(directory_path):
    """
    Walk through the public/blogs and process each markdown file.
    """
    blog_info_list = []

    for root, _, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.md'):
                md_file_path = os.path.join(root, file)
                blog_info = extract_blog_info(md_file_path)
                if blog_info:
                    blog_info_list.append(blog_info)

    # Sort by date
    blog_info_list.sort(key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'), reverse=True)

    return blog_info_list

def save_to_json(data, output_file):
    """
    Save the extracted data to a JSON file.
    """
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

def main():
    directory_path = 'public\\blogs\\en'
    output_file = 'src/data/en/blogs_data.json'

    blog_info = extract_from_directory(directory_path)
    save_to_json(blog_info, output_file)

    print(f"Blog information has been saved to {output_file}")

if __name__ == "__main__":
    main()