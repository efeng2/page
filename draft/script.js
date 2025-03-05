particlesJS('particles-js', {
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

// Search functionality triggered by pressing Enter or clicking the search button
function searchCards() {
  const searchInput = document.getElementById('search');
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let firstMatch = null;
  let matchFound = false;

  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const subtitle = card.querySelector('.card-subtitle').textContent.toLowerCase();
    const text = card.querySelector('.card-text').textContent.toLowerCase();

    if (title.includes(query) || subtitle.includes(query) || text.includes(query)) {
      if (!firstMatch) {
        firstMatch = card;
      }
      matchFound = true;
    }
  });

  // If a match is found, scroll to the first matching card
  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    searchInput.placeholder = 'Search...';
  } else {
    searchInput.placeholder = 'No results found';
  }

  searchInput.value = '';
}

document.getElementById('search').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchCards();
  }
});

document.getElementById('search-btn').addEventListener('click', function (event) {
  event.preventDefault();
  searchCards();
});

