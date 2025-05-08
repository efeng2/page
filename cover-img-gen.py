import os
import json
from PIL import Image, ImageDraw, ImageFont

# ========================
# 配置参数
# ========================

# JSON 文件路径
JSON_PATH = "blogs-directory.json"

# 输出图片目录
OUTPUT_DIR = "public/blog-covers"

# 图片尺寸
IMAGE_WIDTH = 600
IMAGE_HEIGHT = 200

# 背景色 (R, G, B)
BACKGROUND_COLOR = (240, 240, 240)

# 文字颜色
TEXT_COLOR = (0, 0, 0)

# 字体文件（支持中文）
try:
    # Windows 系统字体（可替换为你本地的字体）
    FONT_PATH = "C:/Windows/Fonts/simhei.ttf"  # 黑体，支持中文
    font = ImageFont.truetype(FONT_PATH, size=30)
except:
    # 如果没有黑体，用默认字体（不支持中文）
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size=30)

# 创建输出目录
os.makedirs(OUTPUT_DIR, exist_ok=True)


# ========================
# 工具函数
# ========================

def wrap_text(text, max_width, font, draw):
    words = text.split(' ')
    lines = []
    current_line = ""
    for word in words:
        test_line = current_line + word + ' '
        bbox = font.getbbox(test_line)
        text_width = bbox[2]
        if text_width <= max_width:
            current_line = test_line
        else:
            lines.append(current_line.strip())
            current_line = word + ' '
    if current_line:
        lines.append(current_line.strip())
    return lines


def generate_cover(title, output_path):
    """生成单张封面图"""
    if os.path.exists(output_path):
        print(f"[跳过] {title} -> 已存在")
        return

    # 创建空白图像
    img = Image.new('RGB', (IMAGE_WIDTH, IMAGE_HEIGHT), color=BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # 自动换行处理
    lines = wrap_text(title, IMAGE_WIDTH - 40, font, draw)

    # 计算总高度
    line_heights = [font.getbbox(line)[3] - font.getbbox(line)[1] for line in lines]
    total_height = sum(line_heights) + 20 * (len(lines) - 1)
    y = (IMAGE_HEIGHT - total_height) // 2

    # 绘制每一行文字
    for line in lines:
        bbox = font.getbbox(line)
        text_width = bbox[2] - bbox[0]
        x = (IMAGE_WIDTH - text_width) // 2
        draw.text((x, y), line, fill=TEXT_COLOR, font=font)
        y += bbox[3] - bbox[1] + 20

    # 保存图片
    img.save(output_path)
    print(f"[生成] {title} -> {output_path}")

# ========================
# 主程序逻辑
# ========================

def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 遍历 structured 中的所有语言、分类、子分类、文章
    for lang in data.get("structured", {}):
        for section, subsections in data["structured"][lang].items():
            for subsection, posts in subsections.items():
                for post in posts:
                    title = post.get("title")
                    if not title:
                        continue
                    safe_title = "".join(c if c.isalnum() or c in (" ", "-", "_") else "_" for c in title)
                    filename = f"{safe_title}.jpg"
                    output_path = os.path.join(OUTPUT_DIR, filename)
                    generate_cover(title, output_path)

    print("\n 封面图生成完成！")


if __name__ == "__main__":
    main()