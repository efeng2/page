import React, { useState } from "react"
import { Outlet } from "react-router"
import { Link } from 'react-router-dom';

export function BlogsPage(props) {
    const { blogsData } = props;

    return (
        <>
            <div className="d-flex">
                <Sidebar blogsData={blogsData} />
                <Outlet />
            </div>

        </>
    );
}

function Sidebar(props) {
    const { blogsData } = props;
    const sections = ['ml_algorithms', 'data_vis', 'web_dev', 'cs_programming'];
    const [expandedSection, setExpandedSection] = useState(null);

    const handleSectionClick = (section) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    const latestUpdates = blogsData.slice(0, 3);

    const latestUpdatesArray = latestUpdates.map((project) => (
        <li key={project.title} className="project-title">
            <Link  className="links hover-orange" to={`${project.section}/${project.title}`}>
                {project.title}
            </Link>
        </li>
    ))

    const sectionsArray = sections.map((section) => {
        const sectionData = blogsData.filter((project) => project.section === section);

        return (
            <div key={section} className="section-container">
                <div className="section-title hover-orange" onClick={() => handleSectionClick(section)}>
                    <span className={`arrow ${expandedSection === section ? 'rotated' : ''}`}>▼</span>
                    {section.replace(/_/g, ' ').toUpperCase()}
                </div>
                <div className={`project-list ${expandedSection === section ? 'expanded' : ''}`}>
                    <ul>
                        {sectionData.map((project) => (
                            <li key={project.title} className="project-title">
                                <Link className="links hover-orange" to={`${project.section}/${project.title}`}>{project.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    })

    return (
        <div className="sidebar d-none d-md-inline-block">
            <div className="m-lg-1 mt-lg-2">
                <div className="latest-updates">
                    <h5>Latest Updates</h5>
                    <ul>
                        {latestUpdatesArray}
                    </ul>
                </div>
                
                <h4 className="projects-header">Blog Sections</h4>
                {sectionsArray}
            </div>
        </div>
    );
}
