
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Header(props) {
    const { curr_text } = props;
    const { language } = useParams();

    useEffect(() => {
      if (window.particlesJS) {
          window.particlesJS('particles-js', {
              particles: {
                  number: {
                      value: 80,
                      density: { 
                          enable: true, 
                          value_area: 800 
                      },
                      max: 10
                  },
                  color: { value: '#ffffff' },
                  shape: { type: 'circle' },
                  opacity: { 
                      value: 0.5, 
                      random: true,
                      anim: {
                          enable: true,
                          speed: 1,
                          opacity_min: 0.1,
                          sync: false
                      }
                  },
                  size: { 
                      value: 3, 
                      random: true,
                      anim: {
                          enable: true,
                          speed: 2,
                          size_min: 0.3,
                          sync: false
                      }
                  },
                  line_linked: {
                      enable: true,
                      distance: 150,
                      color: '#ffffff',
                      opacity: 0.4,
                      width: 1,
                  },
                  move: {
                      enable: true,
                      speed: 2,
                      direction: 'none',
                      random: false,
                      straight: false,
                      out_mode: 'out',
                      bounce: false,
                      attract: {
                          enable: true,
                          rotateX: 600,
                          rotateY: 1200
                      }
                  },
              },
              interactivity: {
                  detect_on: 'window',
                  events: {
                      onhover: { 
                          enable: true, 
                          mode: 'repulse',
                          parallax: {
                              enable: true,
                              force: 30,
                              smooth: 10
                          }
                      },
                  },
                  modes: { 
                      repulse: { 
                          distance: 100,
                          duration: 0.8,
                          speed: 0.1,
                          factor: 1,
                          easing: "ease-out-quad"
                      } 
                  },
              },
              retina_detect: true,
              smooth: true,
              background: {
                  color: "transparent",
                  image: "",
                  position: "50% 50%",
                  repeat: "no-repeat",
                  size: "cover"
              }
          });
      }
  }, []);

    return(
        <header id="about" className="text-white py-5 mb-4">
            <div className="fallback"></div>

            <div id="particles-js" className="particles-js"></div>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                        <h1>{curr_text.name}</h1>
                        <p className="lead">{curr_text.description}</p>
                        <div className="d-flex justify-content-start">
                            <Link to={`/${language}/projects`} className="btn btn-primary mt-3 px-4 py-2">{curr_text.view_btn}</Link>
                        </div>
                    </div>
                    <div className="col-md-4 text-center mb-4 mt-5 mt-md-4">
                    <img src="https://efeng2.github.io/page/images/profile.png" alt="Profile" className="img-fluid rounded-circle" />
                    </div>
                </div>
            </div>
        </header>  
    )
}