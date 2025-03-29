import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

export const AboutGrid = (props) => {
  const { latest_blogs_data, latest_projects_data, curr_text } = props;
  const [autoPlay, setAutoPlay] = useState(true);
  const { language } = useParams();

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <LatestBlogPosts latest_blogs_data={latest_blogs_data} latest_blogs={curr_text.latest_blogs} />

          {/* Latest Projects */}
          <div className="card text-center shadow-sm rounded mb-4 project-card">
            <div className="card-body">
              <h3 className="card-title mb-4">{curr_text.latest_projects}</h3>
              <Carousel
                interval={3000}
                pause="hover"
                onMouseEnter={() => setAutoPlay(false)} 
                onMouseLeave={() => setAutoPlay(true)}
                controls={true}
                indicators={true}>
                {latest_projects_data.map((project, index) => (
                  <Carousel.Item key={index}>
                      <h5 className="blog-post-item"><Link className="hover-orange links" to={`projects#${project.title}`}>{project.title}</Link></h5>
                      <p className="text-muted">{project.date + ': ' + project.description}</p>
                      <div className="project-image">
                        <img src={project.img} alt={project.title} className="img-fluid"/> 
                      </div>
                      <Link className="btn btn-primary mt-3 mb-5" to={"/" + language + "/projects#" + project.title}>{curr_text.view_btn}</Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-5">
          <div className="card shadow-sm rounded mb-4 skills-card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">{curr_text.top_skills}</h3>
              <div className="skills-list">
                <div className="skill-item btn btn-light"><i className="bi bi-terminal"></i><span>{curr_text.programming} </span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-cloud-arrow-down"></i><span>{curr_text.web_dev}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-cpu"></i><span>{curr_text.transformers}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-diagram-2"></i><span>{curr_text.search_alg}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-calculator"></i><span>{curr_text.math}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-graph-up"></i><span>{curr_text.data_vis}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-bar-chart-line"></i><span>{curr_text.ml}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-pen"></i><span>{curr_text.information_systems}</span></div>
                <div className="skill-item btn btn-light"><i className="bi bi-palette"></i><span>{curr_text.design}</span></div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm rounded mb-4 achievements-card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">{"🏆 " + curr_text.rewards}</h3>
              <ul className="achievements-list">
                <li className="achievement-item"><i className="bi bi-trophy-fill"></i><span>{curr_text.deans_list}</span></li>
                <li className="achievement-item"><i className="bi bi-lightbulb-fill"></i><span>{curr_text.hackathon}</span></li>
                <li className="achievement-item"><i className="bi bi-award-fill"></i><span>{curr_text.major}</span></li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm rounded mb-4 hobbies-card">
            <div className="card-body">
              <h3 className="card-title text-center">{curr_text.hobbies}</h3>
              <p className="text-center">
                {curr_text.hobby_des}
              </p>
              <div className="row text-center">
                <div className="col-4">
                  <img 
                    src="https://efeng2.github.io/page/images/chess.jpg" 
                    alt="Playing Chess" 
                    className="img-fluid rounded shadow-sm img-size" 
                  />
                  <p className="mt-2">{curr_text.chess}</p>
                </div>
                <div className="col-4">
                  <img 
                    src="https://efeng2.github.io/page/images/art.png" 
                    alt="Art" 
                    className="img-fluid rounded shadow-sm img-size" 
                  />
                  <p className="mt-2">{curr_text.art}</p>
                </div>
                <div className="col-4">
                  <img 
                    src="https://efeng2.github.io/page/images/cardistry.jpg" 
                    alt="Cardistry" 
                    className="img-fluid rounded shadow-sm img-size" 
                  />
                  <p className="mt-2">{curr_text.cardistry}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestBlogPosts = (props) => { 
  const { latest_blogs_data, latest_blogs} = props;
  const blogIcons = ["bi-pencil", "bi-book", "bi-lightbulb", "bi-code"];

  return (
    <div className="card shadow-sm rounded mb-4 blog-card">
      <div className="card-body">
        <h3 className="card-title mb-4 text-center">{latest_blogs}</h3>
        <ul className="list-unstyled">
          {latest_blogs_data.map((blog, index) => (
            <li key={index} className="blog-post-item d-flex align-items-center">
              <Link to={`blog/${blog.section}/${blog.sub_section}/${blog.title}`} className="blog-link d-flex align-items-center w-100">
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