import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// props: blogData
export function BlogGrid(props) {
    const { blogsData } = props

    const blogCardArray = blogsData.map((blogData) => {
        const transformed = (
            <BlogCard key={blogData.title} blogData={blogData}/>
        )
        return transformed;
    });

    return (
        <>
            <section id="blogs" className="container">
                <div className="d-flex justify-content-center">
                    <h2 className="my-4">Blogs</h2>
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

    return (
        <div className="col-12 d-flex card m-2">
                <div className="row">
                    <div className="col-4 col-lg-3">
                        <img className="card-img" src={img} alt={alt} />
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
                                <p className="text-muted card-subtitle d-none d-lg-inline-block">{short_description}</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}