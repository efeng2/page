import React, { useState } from "react";
import { NavLink, useNavigate, useParams, Link } from 'react-router-dom';
import { Outlet } from "react-router"

export function Navbar(props) {
    const { searchCallback } = props;
    const [queryText, setQueryText] = useState('');
    const navigate = useNavigate();
    const { language } = useParams();

    const handleChange = (event) => {
        setQueryText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setQueryText('');
        navigate({pathname: '/' + language + '/blog/search/' + queryText });
        searchCallback(queryText);
    }

    const text_EN = {
        welcome: "Welcome",
        about: "About",
        projects: 'Projects',
        blog: "Blog",
        connect: "Connect",
        search: "Search",
        language: "Switch Lanugage"
    }

    const text_CN = {
        welcome: "欢迎",
        about: "关于",
        projects: "项目",
        blog: "博客", 
        connect: "联系",
        search: "搜索",
        language: "切换语言"
    }

    let curr_text = text_EN;
    let lang_link = "cn";

    if (language == 'cn') {
        curr_text = text_CN;
        lang_link = 'en';
    }

    return (
            <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-2">
                <div className="container-fluid">
                    <NavLink className="navbar-brand hover-orange" to="">{curr_text.welcome}</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link hover-orange" aria-current="page" to={"/" + language}>{curr_text.about}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link hover-orange" to={"/" + language + "/projects"}>{curr_text.projects}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link hover-orange" to={"/" + language + "/blog"}>{curr_text.blog}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link hover-orange"
                                    to="/connect"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({
                                        top: document.documentElement.scrollHeight,
                                        behavior: 'smooth'
                                    });
                                    }}
                                >
                                    {curr_text.connect}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link hover-orange" to={"/" + lang_link}>{curr_text.language}</Link>
                            </li>
                        </ul>

                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input id="search" className="w-custom form-control me-2" type="search" value={queryText} aria-label="Search" onChange={handleChange} placeholder={curr_text.search} />
                            <button id="search-btn" className="btn btn-outline-dark" type="submit">{curr_text.search}</button>
                        </form>
                    </div>
                </div>
            </nav>
        <Outlet/>
        </>
    );
}