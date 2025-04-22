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
    card.classList.remove("active", "prev", "next");

    if (i === index) {
      card.classList.add("active");
    } else if (i === (index - 1 + leishInfoCards.length) % leishInfoCards.length) {
      card.classList.add("prev");
    } else if (i === (index + 1) % leishInfoCards.length) {
      card.classList.add("next");
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
  const dots = document.querySelectorAll(".card-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === leishInfoIndex);
  });
}

// Create dots for navigation
function createLeishInfoDots(count) {
  const dotsContainer = document.getElementById("leish-card-dots");
  dotsContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add("card-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showLeishInfoCard(i));
    dotsContainer.appendChild(dot);
  }
}

// Set up the Leishmania info cards when they are loaded
function setupLeishInfoCards() {
  const cardContainer = document.getElementById("leish-card-container");

  // Store references to all cards
  leishInfoCards = Array.from(cardContainer.querySelectorAll(".leish-card"));

  // Create navigation dots
  createLeishInfoDots(leishInfoCards.length);

  // Initialize the carousel
  leishInfoIndex = 0;
  showLeishInfoCard(leishInfoIndex);
}

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Attach carousel controls to global namespace (for debugging or additional logic)
  window.changeLeishInfoCard = changeLeishInfoCard;
  window.setupLeishInfoCards = setupLeishInfoCards;

  // We expect cards to be dynamically loaded by `translate.js`
  // so we only need to set up the carousel when this happens.
});