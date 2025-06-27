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

// Detect clicks on the cards and navigate accordingly
function setupCardClickNavigation() {
  const cardContainer = document.getElementById("leish-card-container");

  cardContainer.addEventListener("click", (event) => {
    const activeCard = cardContainer.querySelector(".leish-card.active");

    if (!activeCard) return;

    const isLeftSide = event.offsetX < activeCard.offsetWidth / 2;

    if (isLeftSide) {
      changeLeishInfoCard(-1); // Move to the previous card
    } else {
      changeLeishInfoCard(1); // Move to the next card
    }
  });
}

// Add swipe detection for mobile/touch screens
function setupSwipeNavigation() {
  const cardContainer = document.getElementById("leish-card-container");
  let startX;

  cardContainer.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  cardContainer.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 30) {
      // Swipe left
      changeLeishInfoCard(1);
    } else if (diffX < -30) {
      // Swipe right
      changeLeishInfoCard(-1);
    }
  });
}

// Setup function for Leishmania info cards
function setupLeishInfoCards() {
  const cardContainer = document.getElementById("leish-card-container");

  // Store references to all cards (these are now pre-rendered by Django)
  leishInfoCards = Array.from(cardContainer.querySelectorAll(".leish-card"));

  // Only proceed if cards exist
  if (leishInfoCards.length === 0) {
    return;
  }

  // Create navigation dots
  createLeishInfoDots(leishInfoCards.length);

  // Initialize the carousel
  leishInfoIndex = 0;
  showLeishInfoCard(leishInfoIndex);

  // Set up click and swipe navigation
  setupCardClickNavigation();
  setupSwipeNavigation();
}

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Make functions globally available if needed
  window.changeLeishInfoCard = changeLeishInfoCard;
  window.setupLeishInfoCards = setupLeishInfoCards;

  // Setup the carousel automatically
  setupLeishInfoCards();
});