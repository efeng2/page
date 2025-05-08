import os
import json

def collect_blog_paths(base_path):
    result = {
        "flat": {"cn": [], "en": []},
        "structured": {"cn": {}, "en": {}}
    }

    for lang in ["cn", "en"]:
        lang_dir = os.path.join(base_path, lang)
        for root, _, files in os.walk(lang_dir):
            for file in files:
                if file.endswith(".md"):
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, base_path)
                    rel_path = rel_path.replace("/", "\\")  # normalize slashes

                    # Add to flat list
                    result["flat"][lang].append(rel_path)

                    # Build structured entry
                    parts = rel_path.split("\\")
                    if len(parts) >= 4:
                        _, section, subsection, filename = parts
                        title = os.path.splitext(filename)[0]

                        # Ensure structure: lang -> section (dict) -> subsection (list) -> item (dict)
                        structured = result["structured"][lang]
                        if section not in structured:
                            structured[section] = {}
                        section_dict = structured[section]
                        if subsection not in section_dict:
                            section_dict[subsection] = []
                        section_dict[subsection].append({
                            "title": title,
                            "path": rel_path
                        })

        # Sort flat list
        result["flat"][lang].sort()

        # Sort structured hierarchy
        sorted_structured = {}
        for section in sorted(result["structured"][lang]):
            sorted_subsections = {}
            for subsection in sorted(result["structured"][lang][section]):
                sorted_entries = sorted(
                    result["structured"][lang][section][subsection],
                    key=lambda x: x["title"]
                )
                sorted_subsections[subsection] = sorted_entries
            sorted_structured[section] = sorted_subsections
        result["structured"][lang] = sorted_structured

    return result

if __name__ == "__main__":
    base_path = "public/blogs"
    output = collect_blog_paths(base_path)

    with open("blogs-directory.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=True, indent=2)

    print("blogs-directory.json has been created with unicode-escaped output.")