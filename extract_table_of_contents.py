import os
from pathlib import Path

def generate_toc():
    root_dir = Path("public/blogs/cn")
    output_file = "table_of_contents.md"
    base_url = "https://efeng2.github.io/page/cn/blog"
    
    toc_content = ["# Table of Contents\n"]
    
    for section in sorted(os.listdir(root_dir)):
        section_path = root_dir / section
        if not section_path.is_dir():
            continue
            
        toc_content.append(f"\n## {section}\n")
        
        for subsection in sorted(os.listdir(section_path)):
            subsection_path = section_path / subsection
            if not subsection_path.is_dir():
                continue
                
            toc_content.append(f"\n### {subsection}\n")
            
            for md_file in sorted(os.listdir(subsection_path)):
                if not md_file.endswith('.md'):
                    continue
                    
                title = md_file[:-3].replace('_', ' ')
                
                url_path = f"{section}/{subsection}/{title.replace(' ', '%20')}"
                
                toc_content.append(f"- [{title}]({base_url}/{url_path})\n")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(toc_content)
    
    print(f"Generated {output_file}")

if __name__ == "__main__":
    generate_toc()