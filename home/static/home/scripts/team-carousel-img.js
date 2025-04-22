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
}

// Navigate forward or backward in the carousel
function navigateSlide(step) {
  showSlide(currentSlideIndex + step);
}

// Create a navigation button
function createNavButton(direction, symbol) {
  const button = document.createElement('button');
  button.classList.add('carousel-button', direction);
  button.innerHTML = symbol;
  button.onclick = () => navigateSlide(direction === 'prev' ? -1 : 1);
  return button;
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
        
        // Add navigation buttons
        slide.appendChild(createNavButton('prev', '&#10094;'));
        slide.appendChild(createNavButton('next', '&#10095;'));
        
        // Add slide to carousel
        carouselContainer.appendChild(slide);
      });
      
      // Show the first slide
      currentSlideIndex = 0;
      showSlide(currentSlideIndex);
    })
    .catch(error => console.error('Error loading carousel:', error));
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', loadCarousel);