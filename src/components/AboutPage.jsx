import React from 'react';

import { Header } from './Header.jsx'
import { AboutGrid } from './AboutGrid.jsx'
import { useParams } from 'react-router-dom';

export function AboutPage(props) {
    const { projectsDataEN, projectsDataCN, blogsDataEN, blogsDataCN } = props;

    const text_EN = {
        name: "Emily Feng",
        description: "Data Science Professional | Creative Enthusiast",
        view_btn: "View Projects",
        latest_blogs: "Latest Blog Posts",
        latest_projects: "Latest Project Overview",
        top_skills: "Top Skills",
        programming: "Programming (Python, Java, C++, R, MPI, ...)",
        web_dev: "Web Development (React, JavaScript (ES6+), Node.js, ...)",
        transformers: "Transformers (LLMs)",
        search_alg: 'Search Algorithms',
        math: "Mathematical Modeling",
        data_vis: "Data Visualization (D3, VegaLite, Observable, R shiny, ...)",
        ml: "Machine Learning (Sklearn, XGBoost, ANNs, ...)",
        information_systems: "Information System Design",
        design: "UI-UX Design, Figma",
        rewards: "Rewards & Achievements",
        deans_list: "University of Washington Dean's List Student",
        hackathon: "2022 Husky Hackathon Second Place",
        major: "Majoring in Applied Math Data Science at the University of Washington, Seattle",
        hobbies: "Hobbies",
        hobby_des: "When I'm not coding, you can find me playing chess, experimenting with new art styles, or doing cardistry!",
        chess: "Chess",
        art: "Art",
        cardistry: "Cardistry"
    }

    const text_CN = {
        name: "Emily Feng",
        description: "数据科学家 | 创意爱好者",
        view_btn: "查看项目",
        latest_blogs: "最新博客文章",
        latest_projects: "最新项目概览",
        top_skills: "核心技能",
        programming: "编程 (Python, Java, C++, R, MPI, ...)",
        web_dev: "网页开发 (React, JavaScript (ES6+), Node.js, ...)",
        transformers: "Transformer架构 (大语言模型)",
        search_alg: "搜索算法",
        math: "数学建模",
        data_vis: "数据可视化 (D3, VegaLite, Observable, R shiny, ...)",
        ml: "机器学习 (Sklearn, XGBoost, ANNs, ...)",
        information_systems: "信息系统设计",
        design: "UI/UX设计, Figma",
        rewards: "荣誉与成就",
        deans_list: "华盛顿大学院长荣誉名单",
        hackathon: "2022 Husky黑客马拉松第二名",
        major: "华盛顿大学西雅图分校应用数学（数据科学方向）在读",
        hobbies: "兴趣爱好",
        hobby_des: "闲暇时喜欢下国际象棋、尝试新艺术风格或练习花式切牌",
        chess: "国际象棋",
        art: "艺术创作",
        cardistry: "花式切牌"
    }

    let curr_text = text_EN;
    let latest_blogs_data = {};
    let latest_projects_data = {};

    let { language } = useParams();
    if (language == 'cn') {
        curr_text = text_CN;
        latest_blogs_data = blogsDataCN.slice(0, 3);
        latest_projects_data = projectsDataCN.slice(0, 3);
    } else {
        latest_blogs_data = blogsDataEN.slice(0, 3);
        latest_projects_data = projectsDataEN.slice(0, 3);
    }

    return(
        <>
            <Header curr_text={curr_text}/>
            <AboutGrid latest_blogs_data={latest_blogs_data} latest_projects_data={latest_projects_data} curr_text={curr_text}/>
        </>
    )
}