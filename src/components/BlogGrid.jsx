import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function BlogGrid() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { language, searchParams, section_name, sub_section } = useParams();
    
    useEffect(() => {
        const loadData = async () => {
            const loadedBlogs = await loadBlogPosts(language);
            setBlogs(loadedBlogs);
            setIsLoading(false);
        };
        
        loadData();
    }, [language]);

    if (isLoading) {
        return (
            <>
                <div className="m-5 d-flex">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="ms-3">Loading blogs...</div>
                </div>
            </>
        );
    }

    let filteredBlogs = blogs;
    let searchString = 'Blogs';
    let alertString = "Nothing found";
    
    if (language === 'cn') {
        searchString = "博客";
        alertString = "没有找到结果";
    }

    if (searchParams) {
        filteredBlogs = blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchParams.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchParams.toLowerCase())
        );
        
        searchString = language === 'cn' 
            ? `"${searchParams}" 的搜索结果` 
            : `Search results for "${searchParams}"`;
    }

    if (sub_section) {
        filteredBlogs = blogs.filter(blog => blog.sub_section === sub_section);
        searchString = language === 'cn'
            ? `"${sub_section}" 分区的博客`
            : `Blogs in ${sub_section}`;
    }

    return (
        <section id="blogs" className="mt-2 container">
            <div className="d-flex justify-content-center">
                <h2 className="my-4">{searchString}</h2>
            </div>
            
            {filteredBlogs.length === 0 && (
                <div className='container d-flex justify-content-center'>
                    <p className='mb-10 alert alert-danger'>{alertString}</p>
                </div>
            )}
            
            <div className="row">
                {filteredBlogs.map(blog => (
                    <BlogCard 
                        key={`${blog.section}-${blog.sub_section}-${blog.title}`}
                        blog={blog}
                        language={language}
                        searchTerm={searchParams}
                    />
                ))}
            </div>
        </section>
    );
}

function BlogCard(props) {
    const { blog, language, searchTerm } = props;
    const { title, section, sub_section, date, img, alt, short_description, content } = blog;
    const defaultImage = "/page/images/default.png";
    const [imageSrc, setImageSrc] = useState(img);
    
    const highlight = (text) => {
        if (!searchTerm || !text) return text;
        
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={i} style={{ backgroundColor: '#ffeb3b' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    // Extract the first paragraph that contains the search term if it exists in content
    const getHighlightedPreview = () => {
        if (!searchTerm || !content.toLowerCase().includes(searchTerm.toLowerCase())) {
            return highlight(short_description);
        }

        // Split content into paragraphs
        const paragraphs = content.split('\n').filter(p => p.trim());
        
        // Find the first paragraph that contains the search term
        const matchingParagraph = paragraphs.find(p => 
            p.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // If found, use it (cleaned up), otherwise fall back to short_description
        const previewText = matchingParagraph 
            ? matchingParagraph
                .replace(/[#*`_\-\[\]!<>]/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .substring(0, 150) + (matchingParagraph.length > 150 ? '...' : '')
            : short_description;

        return highlight(previewText);
    };
    
    return (
        <div className="col-12 d-flex card m-2">
            <div className="row">
                <div className="col-4 col-lg-3">
                    <img 
                        className="card-img" 
                        src={imageSrc} 
                        alt={alt} 
                        onError={() => setImageSrc(defaultImage)} 
                    />
                </div>
                <div className="col-8 col-lg-9">
                    <div className="card-body">
                        <Link 
                            to={`/${language}/blog/${section}/${sub_section}/${title}`} 
                            className="text-decoration-none"
                        >
                            <h2 className="card-title">{highlight(title)}</h2>
                        </Link>
                        <p className="text-muted">{date}</p>
                        <p className="text-muted">{getHighlightedPreview()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function sanitizeTitleForFilename(title) {
    // 允许英文、数字、空格、中文、以及部分符号（- _）
    return title
        .replace(/[^\w\s\-_\u4e00-\u9fa5\u3400-\u4dbf\uf900-\ufaff]/g, '_');
}

async function loadBlogPosts(language = 'en') {
    try {
        const response = await fetch('/page/blogs-directory.json');
        const fileList = await response.json();
        
        const blogs = [];

        for (const filePath of fileList.flat[language] || []) {
            const parts = filePath.split('\\');

            // 确保路径至少有4个部分（lang\section\subsection\filename.md）
            if (parts.length < 4) {
                console.warn('Invalid file path structure:', filePath);
                continue;
            }

            const section = parts[1];
            const sub_section = parts[2];
            const filename = parts[3];
            const title = filename.replace('.md', '');

            const safeTitle = sanitizeTitleForFilename(title);
            const coverImagePath = `/page/blog-covers/${safeTitle}.jpg`;

            // 请求 Markdown 文件内容
            const contentResponse = await fetch(`/page/blogs/${language}/${section}/${sub_section}/${title}.md`);
            const content = await contentResponse.text();

            // 提取元数据，并传入封面图路径
            const metadata = extractMetadata(content, coverImagePath);
            
            blogs.push({
                title,
                section,
                sub_section,
                ...metadata,
                content
            });
        }
        
        // Sort blogs by date (newest first)
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return blogs;
    } catch (error) {
        console.error('Error loading blogs:', error);
        return [];
    }
}

function extractMetadata(content, coverImagePath = null) {
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    const contentWithoutFrontMatter = frontMatterMatch 
        ? content.slice(frontMatterMatch[0].length) 
        : content;
    
    const paragraphs = contentWithoutFrontMatter.split('\n');
    let firstParagraph = '';
    const minLength = 75;
    const maxLength = 100;
    
    for (let i = 0; i < paragraphs.length; i++) {
        const trimmed = paragraphs[i].trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('2')) {
            firstParagraph = trimmed;
            while (firstParagraph.length < minLength && i + 1 < paragraphs.length) {
                const nextTrimmed = paragraphs[i + 1].trim();
                if (nextTrimmed && !nextTrimmed.startsWith('#') && !nextTrimmed.startsWith('2')) {
                    firstParagraph += ' ' + nextTrimmed;
                }
                i++;
            }
            break;
        }
    }

    let short_description = firstParagraph
        .replace(/[#*`_\-\[\]!<>]/g, '')
        .replace(/\s+/g, ' ') 
        .trim();

    // default
    if (!short_description) {
        short_description = 'No preview available';
    } else if (short_description.length > 150) {
        short_description = short_description.substring(0, maxLength) + '...';
    }

    // date
    const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[0] : new Date().toISOString().split('T')[0];
    
    // image path logic
    let imgPath = '/page/images/default.png'; // fallback

    console.log(coverImagePath)
    // 1. Use generated cover image if provided
    const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (imgMatch) {
        imgPath = imgMatch[1].replace(/^<|>$/g, '');
    }
    // 2. Else try to extract from markdown
    else {
        imgPath = coverImagePath;
    }

    // alt text
    const altMatch = content.match(/$$.*?$$$/);
    const altText = altMatch ? altMatch[0].slice(1, -1) : 'Blog post image';

    return {
        short_description,
        date,
        img: imgPath,
        alt: altText
    };
}