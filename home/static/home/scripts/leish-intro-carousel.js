// Current position in the Leishmania info cards
let leishInfoIndex = 0;
let leishInfoCards = [];

// Show the card at the specified index with a circular effect
function showLeishInfoCard(index) {
  // Handle circular navigation
  if (index >= leishInfoCards.length) {
    index = 0;
  } else if (index < 0) {
    index = leishInfoCards.length - 1;
  }

  leishInfoIndex = index;

  // Update card classes for 3D circular effect
  leishInfoCards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next');

    if (i === index) {
      card.classList.add('active');
    } else if (i === (index - 1 + leishInfoCards.length) % leishInfoCards.length) {
      card.classList.add('prev');
    } else if (i === (index + 1) % leishInfoCards.length) {
      card.classList.add('next');
    }
  });

  // Update the dots
  updateLeishInfoDots();
}

// Change the current card
function changeLeishInfoCard(direction) {
  showLeishInfoCard(leishInfoIndex + direction);
}

// Update the active dot
function updateLeishInfoDots() {
  const dots = document.querySelectorAll('.card-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === leishInfoIndex);
  });
}

// Create dots for navigation
function createLeishInfoDots(count) {
  const dotsContainer = document.getElementById('leish-card-dots');
  dotsContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.classList.add('card-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showLeishInfoCard(i));
    dotsContainer.appendChild(dot);
  }
}

// Load Leishmania info cards
function loadLeishInfoCards(lang) {
  fetch(`/static/home/json/leish_intro_${lang}.json`)
    .then(response => response.json())
    .then(data => {
      const cardContainer = document.getElementById('leish-card-container');

      // Clear existing content
      cardContainer.innerHTML = '';

      // Create cards
      data.forEach((info, index) => {
        const card = document.createElement('div');
        card.classList.add('leish-card');

        // Add title
        const title = document.createElement('h3');
        title.classList.add('leish-card-title');
        title.textContent = info.title;
        card.appendChild(title);

        // Add image
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('leish-card-img');
        const img = document.createElement('img');
        img.src = info.img;
        img.alt = info.title;
        imgDiv.appendChild(img);
        card.appendChild(imgDiv);

        // Add description
        const desc = document.createElement('p');
        desc.classList.add('leish-card-description');
        desc.textContent = info.description;
        card.appendChild(desc);

        // Add to container
        cardContainer.appendChild(card);
      });

      // Store cards for reference
      leishInfoCards = Array.from(document.querySelectorAll('.leish-card'));

      // Create navigation dots
      createLeishInfoDots(data.length);

      // Initialize the carousel
      leishInfoIndex = 0;
      showLeishInfoCard(leishInfoIndex);
    })
    .catch(error => console.error('Error loading Leishmania info cards:', error));
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.changeLeishInfoCard = changeLeishInfoCard;
  window.loadLeishInfoCards = loadLeishInfoCards;

  // This will be called from the translate.js file with appropriate language
  // loadLeishInfoCards('eng');
});