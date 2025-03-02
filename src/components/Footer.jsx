import React from "react";

export function Footer(props) {
    return (
        <footer className="bg-body-tertiary text-dark py-3">
            <div className="container text-center">
                <ul className="nav justify-content-center mb-3">
                    <li className="nav-item">
                        <a href="https://github.com/efeng2" target="_blank" className="nav-link hover-orange"><i className="bi bi-github m-1"></i>Github</a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.linkedin.com/in/emily-feng-b37b1223a/" target="_blank" className="nav-link hover-orange"><i className="bi bi-linkedin m-1"></i>LinkedIn</a>
                    </li>
                    <li className="nav-item">
                        <a href="https://blog.csdn.net/2401_86205687?spm=1000.2115.3001.5343" target="_blank" className="nav-link hover-orange"><i className="bi bi-csdn m-1"></i>CSDN</a>
                    </li>
                    <li className="nav-item">
                        <a href="https://dev.to/efeng2" target="_blank" className="nav-link hover-orange"><i className="bi bi-dev m-1"></i>Dev</a>
                    </li>

                    <li>
                        <a href="https://space.bilibili.com/3493258667755815?spm_id_from=333.1007.0.0" target="_blank" className="nav-link hover-orange"><i className="bi bi-bilibili m-1"></i>Bilibili</a>
                    </li>
                </ul>
                <p className="mb-0">&copy; {new Date().getFullYear()} Emily Feng. All rights reserved.</p>
            </div>
        </footer>
    );
}