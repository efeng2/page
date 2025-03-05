import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// props: blogData
export function BlogGrid(props) {
    const { blogsData } = props

    let searchParams = useParams().searchParams;
    let alertClass = 'd-none';

    if (searchParams == undefined) {
        searchParams = '';
    }

    let searchString = 'Search Results for: ' + searchParams
    if (searchParams == ''){
        searchString = 'Blogs'
    }

    const filteredBlogsData = blogsData.filter((blogData) => {
        if (searchParams.trim() == '') {
            return true;
        } else {
            return blogData.title.toLowerCase().includes(searchParams.toLowerCase());
        }
    })

    if (filteredBlogsData.length == 0) {
        alertClass = 'd-inline-block';
    } else {
        alertClass = 'd-none';
    }

    const blogCardArray = filteredBlogsData.map((blogData) => {
        const transformed = (
            <BlogCard key={blogData.title} blogData={blogData}/>
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
                    <p className={'mb-10 alert alert-danger ' + alertClass}>{"Nothing found for " + searchParams}</p>
                </div>  

                <div className="row">
                    {blogCardArray}
                </div>
            </section>
        </>
    );
}
function BlogCard(props) {
    const { title, date, img, alt, short_description, section } = props.blogData;
    const defaultImage = "/page/images/default.png";
    const [imageSrc, setImageSrc] = useState(img);
    
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
                        <Link to={`${section}/${title}`} className="text-decoration-none">
                            <h2 className="card-title">{title}</h2>
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