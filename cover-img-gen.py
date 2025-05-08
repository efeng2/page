import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import json

# ========================
# 配置参数
# ========================

JSON_PATH = "blogs-directory.json"
OUTPUT_DIR = "public/blog-covers"
ICON_DIR = "icons"

IMAGE_WIDTH = 600
IMAGE_HEIGHT = 200
BACKGROUND_COLOR = (240, 240, 240)
TEXT_COLOR = (0, 0, 0)

FONT_PATH = "C:/Windows/Fonts/simhei.ttf"  # 中文字体路径
DEFAULT_FONT_SIZE = 30

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 分类配色方案（可选）
CATEGORY_COLORS = {
    "人工智能与机器学习": (173, 216, 230),
    "强化学习": (255, 192, 203),
    "搜索算法": (255, 255, 200),
    "数据建模": (144, 238, 144),
    "机器学习算法": (255, 204, 0),
    "深度学习": (255, 165, 0),
    "自然语言处理": (135, 206, 250),
    "学习反思": (255, 228, 181),
    "应用数学": (192, 192, 192),
    "数学建模": (255, 105, 180),
    "数据处理与编程": (100, 149, 237),
    "并行计算": (255, 165, 0),
    "网站制作": (147, 112, 219),
    "React": (135, 206, 250),
    "基础": (211, 211, 211),
    "数据库": (128, 128, 0),
    "default": (240, 240, 240)
}

# 分类 → 图标映射表
SECTION_ICON_MAP = {
    "人工智能与机器学习": "robot",
    "强化学习": "controller",
    "搜索算法": "search",
    "数据建模": "bar-chart-line",
    "机器学习算法": "cpu-fill",
    "深度学习": "layers",
    "自然语言处理": "chat-dots",
    "学习反思": "journal-text",
    "人工智能": "journal-text",
    "应用数学": "calculator",
    "数学建模": "graph-up-arrow",
    "数据处理与编程": "database-fill",
    "并行计算": "clock-history",
    "网站制作": "browser-chrome",
    "React": "code-slash",
    "基础": "book",
    "数据库": "database",
    "default": "file-earmark"
}

# 获取背景颜色
def get_background_color(section):
    return CATEGORY_COLORS.get(section, CATEGORY_COLORS["default"])

# 安全化文件名
def sanitize_title_for_filename(title):
    return "".join(c if c.isalnum() or c in (" ", "-", "_") else "_" for c in title)

# 添加图标到封面图
def add_icon_to_cover(img, section):
    icon_name = SECTION_ICON_MAP.get(section, "file-earmark")
    png_path = os.path.join(ICON_DIR, f"{icon_name}.png")
    svg_path = os.path.join(ICON_DIR, f"{icon_name}.svg")

    try:
        if os.path.exists(png_path):
            icon = Image.open(png_path).convert("RGBA")
        elif os.path.exists(svg_path):
            print(f"[警告] SVG 图标不支持直接加载，跳过: {icon_name}")
            return
        else:
            print(f"[警告] 图标不存在: {icon_name}")
            return

        icon_size = (64, 64)
        icon = icon.resize(icon_size)
        img.paste(icon, (20, 20), icon.split()[3])

    except Exception as e:
        print(f"[警告] 加载图标失败: {e}")

# 创建渐变背景
def create_gradient_background(width, height, color1=(255, 255, 255), color2=(200, 200, 200)):
    base = Image.new('RGB', (1, height), color1)
    top = Image.new('RGB', (1, height), color2)
    mask = Image.new('L', (1, height), 0)
    for y in range(height):
        mask.putpixel((0, y), int(255 * (y / height)))
    base.putalpha(mask.resize(base.size))
    top.putalpha(mask.resize(top.size))

    gradient = Image.new("RGB", (width, height))
    for x in range(width):
        for y in range(height):
            r = int(base.getpixel((0, y))[0] * (1 - y / height) + top.getpixel((0, y))[0] * (y / height))
            g = int(base.getpixel((0, y))[1] * (1 - y / height) + top.getpixel((0, y))[1] * (y / height))
            b = int(base.getpixel((0, y))[2] * (1 - y / height) + top.getpixel((0, y))[2] * (y / height))
            gradient.putpixel((x, y), (r, g, b))
    return gradient

# 自动换行文本
def wrap_text(text, max_width, font, draw):
    words = text.split(' ')
    lines = []
    current_line = ""
    for word in words:
        test_line = current_line + word + ' '
        bbox = font.getbbox(test_line)
        text_width = bbox[2] - bbox[0]
        if text_width <= max_width:
            current_line = test_line
        else:
            lines.append(current_line.strip())
            current_line = word + ' '
    if current_line:
        lines.append(current_line.strip())
    return lines

# 生成单张封面图
def generate_cover(title, output_path, section="默认"):
    if os.path.exists(output_path):
        print(f"[跳过] {title} -> 已存在")
        return

    bg_color = get_background_color(section)
    img = create_gradient_background(IMAGE_WIDTH, IMAGE_HEIGHT, bg_color, (255, 255, 255))
    draw = ImageDraw.Draw(img)

    try:
        font = ImageFont.truetype(FONT_PATH, size=DEFAULT_FONT_SIZE)
    except:
        font = ImageFont.load_default()

    lines = wrap_text(title, IMAGE_WIDTH - 80, font, draw)

    line_heights = [font.getbbox(line)[3] - font.getbbox(line)[1] for line in lines]
    total_height = sum(line_heights) + 20 * (len(lines) - 1)
    y = (IMAGE_HEIGHT - total_height) // 2

    for line in lines:
        bbox = font.getbbox(line)
        text_width = bbox[2] - bbox[0]
        x = (IMAGE_WIDTH - text_width) // 2
        draw.text((x + 2, y + 2), line, fill=(200, 200, 200), font=font)  # 阴影
        draw.text((x, y), line, fill=TEXT_COLOR, font=font)
        y += bbox[3] - bbox[1] + 20

    # 添加图标
    add_icon_to_cover(img, section)

    # 增强对比度
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)

    img.save(output_path)
    print(f"[生成] {title} -> {output_path}")

# 主程序逻辑
def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for lang in data.get("structured", {}):
        for section, subsections in data["structured"][lang].items():
            for subsection, posts in subsections.items():
                for post in posts:
                    title = post.get("title")
                    if not title:
                        continue

                    safe_title = sanitize_title_for_filename(title)
                    filename = f"{safe_title}.jpg"
                    output_path = os.path.join(OUTPUT_DIR, filename)
                    generate_cover(title, output_path, section)

    print("\n✅ 封面图生成完成！")

if __name__ == "__main__":
    main()