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

// Update the active dot based on current slide
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}

// Create dots for navigation
function createDots(count) {
  const dotsContainer = document.getElementById('carousel-dots');
  dotsContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Load team data and build carousel
function loadCarousel() {
  fetch('/static/home/json/team_carousel.json')
    .then(response => response.json())
    .then(data => {
      const carouselContainer = document.getElementById('carousel-slide');

      // Clear existing content
      carouselContainer.innerHTML = '';

      // Create slides for each team member
      data.forEach((member, index) => {
        // Create the slide container
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide-img');
        slide.style.display = 'none';

        // Add member image
        const img = document.createElement('img');
        img.src = member.img;
        img.alt = member.title;
        slide.appendChild(img);

        // Add slide to carousel
        carouselContainer.appendChild(slide);
      });

      // Create navigation dots
      createDots(data.length);

      // Show the first slide
      currentSlideIndex = 0;
      showSlide(currentSlideIndex);

      // Optional: Auto-play the carousel
      // setInterval(() => showSlide(currentSlideIndex + 1), 5000);
    })
    .catch(error => console.error('Error loading carousel:', error));
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', loadCarousel);