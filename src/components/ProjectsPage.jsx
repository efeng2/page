import React, { useState } from 'react';
import { Outlet } from "react-router"
import { Link, useParams } from 'react-router-dom';

export function ProjectsPage(props) {
    const { projectsDataEN, projectsDataCN } = props;

    const text_EN = {
        latest_updates: "Latest Updates",
        project_sections: "Project Sections",
        sections: ['Maching Learning and AI Algorithms', 'Data Visualization', 'Computer Programming and App Development', 'Web Development']
    }

    const text_CN ={
        latest_updates: "最新动态",
        project_sections: "项目分类",
        sections: ["机器学习与AI算法", "数据可视化", "计算机编程与应用开发", "网页开发"]
    }

    let curr_text = text_EN;
    let projectsData = projectsDataEN;

    const { language } = useParams();
    if (language == 'cn') {
        projectsData = projectsDataCN;
        curr_text = text_CN;
    }

    return (
        <>
            <div className="d-flex">
                <Sidebar projectsData={projectsData} curr_text={curr_text} language={language}/>
                <Outlet />
            </div>
        </>
    );
}

function Sidebar(props) {
    const { projectsData, curr_text, language } = props;
    const { sections } = curr_text;
    const sections_class = ['ml_algorithms', 'data_vis', 'cs_programming', 'web_dev'];

    const [expandedSection, setExpandedSection] = useState(null);

    const handleSectionClick = (section) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    const latestUpdates = projectsData.slice(0, 3);

    const latestUpdatesArray = latestUpdates.map((project) => (
        <li key={project.title} className="project-title">
            <Link className="links hover-orange" to={`#${project.title}`}>
                {project.title}
            </Link>
        </li>
    ))

    const sectionsArray = sections_class.map((section, index) => {
        const sectionData = projectsData.filter((project) => project.section === section);

        return (
            <div key={section} className="section-container">
                <div className="hover-orange section-title" onClick={() => handleSectionClick(section)}>
                    <span className={`arrow ${expandedSection === section ? 'rotated' : ''}`}>▼</span>
                    {sections[index]}
                </div>
                <div className={`project-list ${expandedSection === section ? 'expanded' : ''}`}>
                    <ul>
                        {sectionData.map((project) => (
                            <li key={project.title} className="project-title">
                                <Link className="links hover-orange" to={`#${project.title}`}>{project.title}</Link>
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
                {/* Latest Updates Section */}
                <div className="latest-updates">
                    <h5>{curr_text.latest_updates}</h5>
                    <ul>
                        {latestUpdatesArray}
                    </ul>
                </div>
                
                {/* Latest Updates Section */}
                <h4 className="projects-header">{curr_text.project_sections}</h4>
                {sectionsArray}
            </div>
        </div>
    );
}
