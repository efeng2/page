import React, { useState } from "react"
import { Outlet } from "react-router"
import { Link, useParams } from 'react-router-dom';

export function BlogsPage(props) {
    const { blogsDataEN, blogsDataCN } = props;

    let blogsData = blogsDataEN;

    const text_EN = {
        latest_updates: "Latest Updates",
        blog_sections: "Blog Sections",
        sections: ['Maching Learning and AI Algorithms', 'Data Visualization', 'Computer Programming and App Development', 'Web Development']
    }

    const text_CN ={
        latest_updates: "最新动态",
        blog_sections: "博客分类",
        sections: ["机器学习与AI算法", "数据可视化", "计算机编程与应用开发", "网页开发"]
    }

    const sections_EN = {
        "Advanced Math": [
          "Mathematical Modeling"
        ],
        "AI and ML Algorithms": [
          "Bayes Nets",
          "Game Agents",
          "Machine Learning",
          "Markov Models",
          "Natrual Language Processing",
          "Search Algorithms"
        ],
        "Computer Science": [
          "Data Science",
          "Parallel Computing"
        ],
        "Reflections": [
          "Artifical Intellegence"
        ],
        "Web Development": [
          "Basics",
          "Database",
          "React"
        ]
    }

    const sections_CN = {
        "人工智能与机器学习": [
          "强化学习",
          "搜索算法",
          "数据建模",
          "机器学习算法",
          "深度学习",
          "自然语言处理"
        ],
        "学习反思": [
          "人工智能"
        ],
        "应用数学": [
          "数学建模"
        ],
        "数据处理与编程": [
          "并行计算"
        ],
        "网站制作": [
          "React",
          "基础",
          "数据库"
        ]
    }

    let curr_text = text_EN;
    let sections = sections_EN;

    const { language } = useParams();
    if (language == 'cn') {
        blogsData = blogsDataCN;
        curr_text = text_CN;
        sections = sections_CN;
    }

    return (
        <>
            <div className="d-flex">
                <Sidebar blogsData={blogsData} sections={sections} curr_text={curr_text}/>
                <Outlet />
            </div>

        </>
    );
}
function Sidebar(props) {
    const { blogsData, sections, curr_text } = props;

    const [expandedSection, setExpandedSection] = useState(null);

    const handleSectionClick = (section) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    const latestUpdates = blogsData.slice(0, 3);

    const latestUpdatesArray = latestUpdates.map((blog) => (
        <li key={blog.title} className="project-title">
            <Link className="links hover-orange" to={`${blog.section}/${blog.sub_section}/${blog.title}`}>
                {blog.title}
            </Link>
        </li>
    ))

    const sectionsArray = Object.entries(sections).map(([section, subsections]) => {
        return (
            <div key={section} className="section-container">
                <div className="section-title hover-orange" onClick={() => handleSectionClick(section)}>
                    <span className={`arrow ${expandedSection === section ? 'rotated' : ''}`}>▼</span>
                    {section.replace(/_/g, ' ').toUpperCase()}
                </div>
                <div className={`project-list ${expandedSection === section ? 'expanded' : ''}`}>
                    <ul>
                        {subsections.map((subsection) => (
                            <li key={subsection} className="project-title">
                                <Link 
                                    className="links hover-orange" 
                                    to={`${section}/${subsection.replace(/\s+/g, '%20')}`}
                                >
                                    {subsection}
                                </Link>
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
                    <h5>{curr_text.latest_updates}</h5>
                    <ul>
                        {latestUpdatesArray}
                    </ul>
                </div>
                
                <h4 className="projects-header">{curr_text.blog_sections}</h4>
                {sectionsArray}
            </div>
        </div>
    );
}