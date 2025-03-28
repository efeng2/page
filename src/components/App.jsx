import React, { useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Connect } from './Connect.jsx';
import { AboutPage } from './AboutPage.jsx';
import { ProjectsPage } from './ProjectsPage.jsx';
import { BlogsPage } from './BlogsPage.jsx';
import { BlogDetails } from './BlogDetails.jsx';
import { BlogGrid } from './BlogGrid.jsx';
import { ProjectsGrid } from './ProjectsGrid.jsx';
import { Footer } from './Footer.jsx';

import PROJECTS_DATA_EN from '../data/en/projects_data.json';
import PROJECTS_DATA_CN from '../data/cn/projects_data.json';
import BLOGS_DATA_EN from '../data/en/blogs_data.json';
import BLOGS_DATA_CN from '../data/cn/blogs_data.json';

function App() {
    const [queryText, setQueryText] = useState([]);

    const handleSearch = (queryText) => {
        setQueryText(queryText);
    }

    return (
        <>
            <Routes>
                <Route path=':language' element={<Navbar searchCallback={handleSearch} />}>
                    <Route index element={<AboutPage projectsDataEN={PROJECTS_DATA_EN} projectsDataCN={PROJECTS_DATA_CN} blogsDataEN={BLOGS_DATA_EN} blogsDataCN={BLOGS_DATA_CN}/>} />
                    <Route path="projects" element={<ProjectsPage projectsDataEN={PROJECTS_DATA_EN} projectsDataCN={PROJECTS_DATA_CN} />}>
                        <Route index element={<ProjectsGrid projectsDataEN={PROJECTS_DATA_EN} projectsDataCN={PROJECTS_DATA_CN}/>} />
                    </Route>
                    <Route path="blog" element={<BlogsPage blogsDataEN={BLOGS_DATA_EN} blogsDataCN={BLOGS_DATA_CN}/>}>
                        <Route path=":section_name/:sub_section/:blog_title" element={<BlogDetails />} />
                        <Route path=":section_name/:sub_section" element={<BlogGrid queryText={queryText} blogsDataEN={BLOGS_DATA_EN} blogsDataCN={BLOGS_DATA_CN} searchCallback={handleSearch} />} />
                        
                        <Route path="search/:searchParams" element={<BlogGrid queryText={queryText} blogsDataEN={BLOGS_DATA_EN} blogsDataCN={BLOGS_DATA_CN} searchCallback={handleSearch}/>}/>
                        
                        <Route index element={<BlogGrid blogsDataEN={BLOGS_DATA_EN} blogsDataCN={BLOGS_DATA_CN}/>} />
                    </Route>
                    <Route path="connect" element={<Connect />} />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Route>
                <Route path="*" element={<Navigate to="/en"/>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
