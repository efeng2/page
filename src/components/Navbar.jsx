import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

export function Navbar(props) {
    const { onSearch } = props

    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(query); // Send query to parent component
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-2">
            <div className="container-fluid">
                <NavLink className="navbar-brand hover-orange" to="">Welcome</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link hover-orange" aria-current="page" to=""> About </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link hover-orange" to="/projects">Projects</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link hover-orange" to="/blog">Blog</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link hover-orange"
                                to="/connect"
                                onClick={(e) => {
                                e.preventDefault(); // Prevent the default behavior (redirect)
                                window.scrollTo({
                                    top: document.documentElement.scrollHeight, // Scroll to the bottom
                                    behavior: 'smooth' // Smooth scrolling
                                });
                                }}
                            >
                                Connect
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(event) => setQuery(event.target.value)}/>
                        <button id="search-btn" className="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}