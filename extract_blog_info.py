import os
import json
import re
from datetime import datetime

DEFAULT_DATE = "2025-01-01"
MAX_DESCRIPTION_LENGTH = 300  # Maximum length for the short description

def extract_blog_info(md_file_path):
    """
    Extracts title, date, short_description, section, and image from a markdown file.
    Defaults the date if not extracted, shortens the description, and removes the '#' from title.
    """
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

            # Ensure we have at least 5 lines for the expected data
            if len(lines) < 5:
                print(f"Skipping {md_file_path}: Not enough content.")
                return None

            # Extract the title (first line), remove the '#' and strip spaces
            title = lines[0].strip().lstrip('#').strip()

            # Extract the date from the second line, or use the default date if it's invalid
            date = lines[1].strip()
            if not re.match(r'\d{4}-\d{2}-\d{2}', date):  # If invalid date format
                print(f"Invalid date format in {md_file_path}, defaulting to {DEFAULT_DATE}.")
                date = DEFAULT_DATE

            # Extract the short description from the 5th line and truncate it
            short_description = lines[4].strip()[:MAX_DESCRIPTION_LENGTH]

            # Extract section from the file path
            section = md_file_path.split(os.sep)[2]  # Use os.sep for platform compatibility

            # Construct image path from title (replace spaces with underscores and lowercase)
            img = f"/page/images/blogs/{title.replace(' ', '_').lower()}.png"

            # Return the extracted data
            return {
                "title": title,
                "date": date,
                "short_description": short_description,
                "section": section,
                "img": img
            }
    except Exception as e:
        print(f"Error processing {md_file_path}: {e}")
        return None

def extract_from_directory(directory_path):
    """
    Walk through the directory and process each markdown file.
    """
    blog_info_list = []

    # Walk through the public/blogs directory
    for root, _, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.md'):
                md_file_path = os.path.join(root, file)
                blog_info = extract_blog_info(md_file_path)
                if blog_info:
                    blog_info_list.append(blog_info)

    # Sort the blogs by date
    blog_info_list.sort(key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'), reverse=True)

    return blog_info_list

def save_to_json(data, output_file):
    """
    Save the extracted data to a JSON file.
    """
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

def main():
    directory_path = 'public\\blogs'  # The root directory where blog markdowns are located
    output_file = 'src/data/blogs_data.json'   # The name of the output JSON file

    blog_info = extract_from_directory(directory_path)
    save_to_json(blog_info, output_file)

    print(f"Blog information has been saved to {output_file}")

if __name__ == "__main__":
    main()
