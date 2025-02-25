import React from "react"

export function Connect(props) {

    return (
        <section id="connect" className="container">
            <h2 className="my-3">Connect</h2>
            <div className="d-flex mb-3 gap-3">
                <a href="https://github.com/efeng2" className="btn btn-light" target="_blank">
                    <i className="bi bi-github d-none d-sm-inline"></i> Github
                </a>
                <a href="https://www.linkedin.com/in/emily-feng-b37b1223a/" className="btn btn-light" target="_blank">
                    <i className="bi bi-linkedin d-none d-sm-inline"></i> LinkedIn
                </a>
                <a href="https://blog.csdn.net/2401_86205687?spm=1000.2115.3001.5343" className="btn btn-light" target="_blank">
                    <i className="bi bi-csdn d-none d-sm-inline"></i> CSDN
                </a>
                <a href="https://dev.to/efeng2" className="btn btn-light" target="_blank">
                    <i className="bi bi-dev d-none d-sm-inline"></i> Dev
                </a>
            </div>
        </section>
    )
}