// Current position in the carousel
let currentSlideIndex = 0;

// Show the slide at the specified index
function showSlide(index) {
  // Find all slides in the carousel
  const slides = document.querySelectorAll('#carousel-slide .carousel-slide-img');

  // Handle out-of-bounds indices
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } else {
    currentSlideIndex = index;
  }

  // Show the current slide, hide all others
  slides.forEach((slide, i) => {
    slide.style.display = i === currentSlideIndex ? 'flex' : 'none';
  });

  // Update the active dot
  updateDots();
}

// Update the active dot based on the current slide
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}

// Handle swipe gestures
function handleSwipe() {
  const carousel = document.getElementById('carousel-container');
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;

  // Touch start event
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isSwiping = true;
  }, { passive: true });

  // Touch move event - prevent default scrolling during swipe
  // noinspection JSUnusedLocalSymbols
  carousel.addEventListener('touchmove', (e) => {
    if (isSwiping) {
      // Don't prevent default here to allow natural scrolling,
      // but we track that a move is happening
    }
  }, { passive: true });

  // Touch end event
  carousel.addEventListener('touchend', (e) => {
    if (isSwiping) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
      isSwiping = false;
    }
  }, { passive: true });

  // Determine a swipe direction and navigate accordingly
  function handleSwipeGesture() {
    const swipeThreshold = 50; // Minimum distance to be considered a swipe
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) >= swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - show previous slide
        showSlide(currentSlideIndex - 1);
      } else {
        // Swipe left - show the next slide
        showSlide(currentSlideIndex + 1);
      }
    }
  }
}

// Initialize the carousel functionality
function initializeCarousel() {
  const slides = document.querySelectorAll('#carousel-slide .carousel-slide-img');

  if (slides.length === 0) {
    console.warn('No carousel slides found');
    return;
  }

  // Set the initial slide
  currentSlideIndex = 0;
  showSlide(currentSlideIndex);

  // Initialize swipe functionality
  handleSwipe();

  // Optional: Auto-play the carousel
  // setInterval(() => showSlide(currentSlideIndex + 1), 5000);
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', initializeCarousel);
