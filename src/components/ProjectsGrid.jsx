import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

// props: project_data
export function ProjectsGrid(props) {
    const { projectsData } = props
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
          let elementId = decodeURIComponent(location.hash.substring(1));
      
          // Replace spaces with hyphens to make the ID valid
          elementId = elementId.replace(/\s+/g, '-');
      
          const targetElement = document.querySelector(`#${elementId}`);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, [location]);      

    const mlAlgorithmsProjects = projectsData.filter(project => project.section === 'ml_algorithms');
    const dataVisProjects = projectsData.filter(project => project.section === 'data_vis');
    const webDevProjects = projectsData.filter(project => project.section === 'web_dev');
    const csProgrammingProjects = projectsData.filter(project => project.section === 'cs_programming');

    const mLAlorithmsArray = mlAlgorithmsProjects.map((projectData) => {
        const transformed = (
            <ProjectCard key={projectData.title} projectData={projectData}/>
        )
        return transformed;
    });

    const dataVisArray = dataVisProjects.map((projectData) => {
        const transformed = (
            <ProjectCard key={projectData.title} projectData={projectData}/>
        )
        return transformed;
    });

    const webDevArray = webDevProjects.map((projectData) => {
        const transformed = (
            <ProjectCard key={projectData.title} projectData={projectData}/>
        )
        return transformed;
    });

    const csProgrammingArray = csProgrammingProjects.map((projectData) => {
        const transformed = (
            <ProjectCard key={projectData.title} projectData={projectData}/>
        )
        return transformed;
    });

    return (
        <>
            <section id="projects" className="container mb-5">
                <div className="d-flex justify-content-center">
                    <h2 className="my-4">Projects</h2>
                </div>            

                <div>
                    <h2 className="my-4 text-center">Maching Learning and AI Algorithms</h2>
                    <div className="d-flex justify-content-center">
                        <div className="row">
                            {mLAlorithmsArray}
                        </div>
                    </div>
                </div>         

                <div>
                    <h2 className="my-4 text-center">Data Visualization</h2>
                    <div className="d-flex justify-content-center">
                        <div className="row">
                            {dataVisArray}
                        </div>
                    </div>
                </div> 

                <div>
                    <h2 className="my-4 text-center">Computer Programming and App Development</h2>
                    <div className="d-flex justify-content-center">
                        <div className="row">
                            {csProgrammingArray}
                        </div>
                    </div>
                </div>  

                <div>
                    <h2 className="my-4 text-center">Web Development</h2>
                    <div className="d-flex justify-content-center">
                        <div className="row">
                            {webDevArray}
                        </div>
                    </div>
                </div> 

            </section>
        </>
    );
}

function ProjectCard(props) {
    const { title, date, skills, description, img, linksData} = props.projectData;

    const titleID = title.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    
    const projectLinksArray = linksData.map((linkData) => {
        const transformed = (
            <ProjectLink key={linkData.url} linkData={linkData}/>
        )
        return transformed;
    });


    return (
        <div className="col-md-6 col-lg-4 d-flex" id={titleID}>
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="row">
                        {/* For small screens and medium or smaller devices, image on the left */}
                        <div className="col-4 col-md-12 d-flex justify-content-center align-items-center">
                            <img className="pb-3 mw-100" src={img} alt={title} />
                        </div>

                        {/* For medium or larger screens, text on the right, otherwise it’s below */}
                        <div className="col-8 col-md-12 mt-md-0 mt-3">
                            <h3 className="card-title">{title}</h3>
                            <p className="card-subtitle mb-2 text-muted">{date}</p>
                            <p className="card-text">{skills}</p>
                            <p className="card-text text-muted">{description}</p>
                            {projectLinksArray}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    );
}

function ProjectLink(props) {
    const { website_name, url } = props.linkData;

    return(
        <a href={url} className="card-link" target="_blank">{website_name}</a>
    )
}