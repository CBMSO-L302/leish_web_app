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

  // Optional: Auto-play the carousel
  // setInterval(() => showSlide(currentSlideIndex + 1), 5000);
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', initializeCarousel);