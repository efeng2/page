import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

export const AboutGrid = (props) => {
  const { latest_blogs_data, latest_projects_data } = props;
  const [autoPlay, setAutoPlay] = useState(true);

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <LatestBlogPosts latest_blogs_data={latest_blogs_data} />

          {/* Latest Projects */}
          <div className="card text-center shadow-sm rounded mb-4 project-card">
            <div className="card-body">
              <h3 className="card-title mb-4">Latest Project Overview</h3>
              <Carousel
                interval={3000}
                pause="hover"
                onMouseEnter={() => setAutoPlay(false)} 
                onMouseLeave={() => setAutoPlay(true)}
                controls={true}
                indicators={true}>
                {latest_projects_data.map((project, index) => (
                  <Carousel.Item key={index}>
                      <h5 className="blog-post-item"><Link className="hover-orange links" to={`/projects#${project.title}`}>{project.title}</Link></h5>
                      <p className="text-muted">{project.date + ': ' + project.description}</p>
                      <div className="project-image">
                        <img src={project.img} alt={project.title} className="img-fluid"/> 
                      </div>
                      <Link className="btn btn-primary mt-3 mb-5" to={`/projects#${project.title}`}>View Project</Link>

                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm rounded mb-4 skills-card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Top Skills</h3>
              <div className="skills-list">
                <div className="skill-item btn btn-light"><i className="bi bi-terminal"></i><span>Programming (Python, Java, C++, R, MPI, ...) </span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-cloud-arrow-down"></i><span>Web Development (React, JavaScript (ES6+), Node.js, ...)</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-cpu"></i><span>Transformers (LLMs)</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-diagram-2"></i><span>Search Algorithms</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-calculator"></i><span>Mathematical Modeling</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-graph-up"></i><span>Data Visualization (D3, VegaLite, Observable, R shiny, ...)</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-bar-chart-line"></i><span>Machine Learning (Sklearn, XGBoost, ANNs, ...)</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-pen"></i><span>Information System Design</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-palette"></i><span>UI-UX Design, Figma</span></div>
              </div>
            </div>
          </div>


          <div className="card shadow-sm rounded mb-4 achievements-card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">🏆 Rewards & Achievements</h3>
              <ul className="achievements-list">
                <li className="achievement-item"><i className="bi bi-trophy-fill"></i><span>University of Washington Dean's List Student</span></li>
                <li className="achievement-item"><i className="bi bi-lightbulb-fill"></i><span>2022 Husky Hackathon Second Place</span></li>
                <li className="achievement-item"><i className="bi bi-award-fill"></i><span>Majoring in Applied Math Data Science at the University of Washington, Seattle</span></li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm rounded mb-4 hobbies-card">
            <div className="card-body">
              <h3 className="card-title text-center">Hobbies</h3>
              <p className="text-center">
                When I'm not coding, you can find me playing chess, experimenting with new art styles, or doing cardistry tricks!
              </p>
              <div className="row text-center">
                <div className="col-4">
                  <img 
                    src="images/chess.jpg" 
                    alt="Playing Chess" 
                    className="img-fluid rounded shadow-sm img-size" 
                  />
                  <p className="mt-2">Chess</p>
                </div>
                <div className="col-4">
                  <img 
                    src="images/art.png" 
                    alt="Art" 
                    className="img-fluid rounded shadow-sm img-size" 
                  />
                  <p className="mt-2">Art</p>
                </div>
                <div className="col-4">
                  <img 
                    src="images/cardistry.jpg" 
                    alt="Cardistry" 
                    className="img-fluid rounded shadow-sm img-size" 
                  />
                  <p className="mt-2">Cardistry</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div id="connect" className="card shadow-sm rounded mb-4 skills-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Connect</h2>
              <div className="skills-list">
                  <a href="https://github.com/efeng2" className="skill-item btn btn-light" target="_blank">
                      <i className="bi bi-github d-none d-sm-inline"></i> Github
                  </a>
                  <a href="https://www.linkedin.com/in/emily-feng-b37b1223a/" className="skill-item btn btn-light" target="_blank">
                      <i className="bi bi-linkedin d-none d-sm-inline"></i> LinkedIn
                  </a>
                  <a href="https://blog.csdn.net/2401_86205687?spm=1000.2115.3001.5343" className="skill-item btn btn-light" target="_blank">
                      <i className="bi bi-csdn d-none d-sm-inline"></i> CSDN
                  </a>
                  <a href="https://dev.to/efeng2" className="skill-item btn btn-light" target="_blank">
                      <i className="bi bi-dev d-none d-sm-inline"></i> Dev
                  </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const LatestBlogPosts = (props) => { 
  const { latest_blogs_data } = props;

  // Define a fixed list of icons
  const blogIcons = ["bi-pencil", "bi-book", "bi-lightbulb", "bi-code"];

  return (
    <div className="card shadow-sm rounded mb-4 blog-card">
      <div className="card-body">
        <h3 className="card-title mb-4 text-center">Latest Blog Posts</h3>
        <ul className="list-unstyled">
          {latest_blogs_data.map((blog, index) => (
            <li key={index} className="blog-post-item d-flex align-items-center">
              <Link to={`/blog/${blog.section}/${blog.title}`} className="blog-link d-flex align-items-center w-100">
                <div className="icon-container me-3">
                  <i className={`bi ${blogIcons[index % blogIcons.length]} blog-icon`}></i>
                </div>
                <div className="text-container">
                  <h5 className="mb-1">{blog.title}</h5>
                  <p className="mb-0 text-muted">{blog.short_description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};