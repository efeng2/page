import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// props: blogData
export function BlogGrid(props) {
    const { blogsDataEN, blogsDataCN } = props;

    let blogsData = blogsDataEN;
    let searchParams = useParams().searchParams;
    let alertClass = 'd-none';
    let searchString = 'Search Results for: ' + searchParams;
    let alertString = "Nothing found for " + searchParams;
    
    const { language, sub_section } = useParams();
    
    if (language == 'cn') {
        blogsData = blogsDataCN;
        searchString = '"' + searchParams + '" 的搜索结果：';
        alertString = '没有找到 "' + searchParams + '" 的搜索结果：';
    }

    let filteredBlogsData= blogsData;

    // if search
    if (searchParams == undefined) {
        searchParams = '';
        if (language == 'cn') {
            searchString = "博客";
        } else {
            searchString = 'Blogs';
        }
    } else {
        filteredBlogsData = blogsData.filter((blogData) => {
            if (searchParams.trim() == '') {
                return true;
            } else {
                return blogData.title.toLowerCase().includes(searchParams.toLowerCase());
            }
        })
    }

    // if filter
    if (sub_section != undefined) {
        filteredBlogsData = blogsData.filter(blog => blog.sub_section === sub_section);
        if (language == 'cn') {
            searchString = '"' + sub_section + '" 分区的博客';
        } else {
            searchString = "Blogs in " + sub_section;
        }
    }

    // alert
    if (filteredBlogsData.length == 0) {
        alertClass = 'd-inline-block';
    } else {
        alertClass = 'd-none';
    }

    const blogCardArray = filteredBlogsData.map((blogData) => {
        const transformed = (
            <BlogCard 
                key={blogData.title} 
                blogData={blogData}
                searchTerm={searchParams}
                language={language}
            />
        )
        return transformed;
    });

    return (
        <>
            <section id="blogs" className="mt-2 container">
                <div className="d-flex justify-content-center">
                    <h2 className="my-4">{searchString}</h2>
                </div>          

                <div className='container d-flex justify-content-center'>
                    <p className={'mb-10 alert alert-danger ' + alertClass}>{alertString}</p>
                </div>  

                <div className="row">
                    {blogCardArray}
                </div>
            </section>
        </>
    );
}

function BlogCard(props) {
    const { title, date, img, alt, short_description, section, sub_section } = props.blogData;
    const { searchTerm, language } = props;
    const defaultImage = "/page/images/default.png";
    const [imageSrc, setImageSrc] = useState(img);
    
    // highlight
    const highlightSearchTerms = (text, term) => {
        if (!term || !text) return text;
        
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        
        return text.split(regex).map((part, index) => {
            if (part.toLowerCase() === term.toLowerCase()) {
                return (
                    <span 
                        key={index} 
                        style={{
                            backgroundColor: '#ffeb3b',
                            padding: '0 2px',
                            borderRadius: '3px'
                        }}
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
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
                    <Link to={`/${language}/blog/${section}/${sub_section}/${title}`} className="text-decoration-none">
                            <h2 className="card-title">
                                {highlightSearchTerms(title, searchTerm)}
                            </h2>
                        </Link>
                        <div className="d-flex flex-wrap">
                            <p className="text-muted card-subtitle">{date}</p>
                        </div>
                        <div className="d-flex flex-wrap mt-2">
                            <p className="text-muted card-subtitle">{short_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}