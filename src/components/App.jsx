import React from 'react';
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

import PROJECTS_DATA from '../data/projects_data.json';
import BLOGS_DATA from '../data/blogs_data.json';

function App() {
    const latest_blogs_data = BLOGS_DATA.slice(0, 3);
    const latest_projects_data = PROJECTS_DATA.slice(0, 3);

    return (
        <>
            <Navbar />
            <Routes basename="/page">
                <Route path="page" element={<AboutPage latest_blogs_data={latest_blogs_data} latest_projects_data={latest_projects_data} />} />
                <Route path="page/projects" element={<ProjectsPage projectsData={PROJECTS_DATA} />}>
                    <Route index element={<ProjectsGrid  projectsData={PROJECTS_DATA}/>} />
                </Route>
                <Route path="page/blog" element={<BlogsPage blogsData={BLOGS_DATA}/>}>
                    <Route path=":section_name/:blog_title" element={<BlogDetails />} />
                    <Route index element={<BlogGrid blogsData={BLOGS_DATA}/>} />
                </Route>
                <Route path="page/connect" element={<Connect />} />
                <Route path="*" element={<Navigate to="/page"/>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
