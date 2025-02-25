
import React, { useEffect } from 'react';

export function Header() {

    useEffect(() => {
        // Initialize particles.js after the component mounts
        if (window.particlesJS) {
          window.particlesJS('particles-js', {
            particles: {
              number: {
                value: 80,
                density: { enable: true, value_area: 800 },
              },
              color: { value: '#ffffff' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
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
              },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'repulse' },
              },
              modes: { repulse: { distance: 100 } },
            },
            retina_detect: true,
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
                        <h1>Emily Feng</h1>
                        <p className="lead">Data Science Professional | Creative Enthusiast</p>
                        <div className="d-flex justify-content-start">
                            <a href="#projects" className="btn btn-primary mt-3 px-4 py-2">View Projects</a>
                        </div>
                    </div>
                    <div className="col-md-4 text-center mb-4 mt-5 mt-md-4">
                    <img src="src/assets/profile.jpg" alt="Profile" className="img-fluid rounded-circle" />
                    </div>
                </div>
            </div>
        </header>  
    )
}