document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".diagonal-section, .diagonal-section-alt");

  const observerOptions = {
      root: null, // Viewport
      threshold: 0.2, // Trigger when 20% of the section is visible
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("section-visible");
          }
      });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach(section => observer.observe(section));
});

document.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  document.querySelectorAll(".diagonal-section, .diagonal-section-alt").forEach((section) => {
      const speed = section.dataset.speed || 0.5; // Default parallax speed
      const offset = scrollTop * speed;
      
      // Adjust background position for parallax effect
      const backgroundPosition = `center ${offset}px`;
      section.style.backgroundPosition = backgroundPosition;
  });
});

document.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('#navbar a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 60) { // Adjust the scroll position threshold
      currentSection = section.getAttribute('id');
    }
  });

  navbarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
});

