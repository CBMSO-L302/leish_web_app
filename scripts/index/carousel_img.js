let teamIntroIndex = 0;
let teamIntroInterval;

function changeSlide(index) {
  console.log('changeSlide called with index:', index);
  const slides = document.querySelectorAll('#carousel-slide .carousel-slide-img');
  
  console.log('Slides found:', slides.length);
  
  if (index >= slides.length) {
    teamIntroIndex = 0;
  } else if (index < 0) {
    teamIntroIndex = slides.length - 1;
  } else {
    teamIntroIndex = index;
  }
  
  console.log('New teamIntroIndex:', teamIntroIndex);

  slides.forEach((slide, i) => {
    slide.style.display = i === teamIntroIndex ? 'flex' : 'none';
  });
}

function changeTeamIntroSlide(n) {
    console.log('changeTeamIntroSlide called with:', n);
    changeSlide(teamIntroIndex + n);
}

function loadTeamIntro() {
  console.log('Fetching JSON data...');
  fetch('./img/lab_team/carousel/team_carousel.json')
    .then(response => {
      console.log('Response received:', response);
      return response.json();
    })
    .then(data => {
        console.log('Data loaded:', data);
        const teamIntroContainer = document.getElementById('carousel-slide');
        
        console.log('teamIntroContainer found:', !!teamIntroContainer);
        
        teamIntroContainer.innerHTML = ''; // Clear existing carousel

        data.forEach((post, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('carousel-slide-img');
            if (index !== 0) imgDiv.style.display = 'none'; // Hide all slides except the first one

            const img = document.createElement('img');
            img.src = post.img;
            img.alt = post.title;
            imgDiv.appendChild(img);

            // Create and add left button
            const leftButton = document.createElement('button');
            leftButton.classList.add('carousel-button', 'prev');
            leftButton.innerHTML = '&#10094;'; // Left arrow symbol
            leftButton.onclick = () => changeTeamIntroSlide(-1);
            imgDiv.appendChild(leftButton);

            // Create and add right button
            const rightButton = document.createElement('button');
            rightButton.classList.add('carousel-button', 'next');
            rightButton.innerHTML = '&#10095;'; // Right arrow symbol
            rightButton.onclick = () => changeTeamIntroSlide(1);
            imgDiv.appendChild(rightButton);

            console.log(`Slide ${index + 1} created with image src: ${img.src}`);
            teamIntroContainer.appendChild(imgDiv);
        });

        teamIntroIndex = 0;
        changeSlide(teamIntroIndex);

        if (teamIntroInterval) {
            clearInterval(teamIntroInterval);
            console.log('Previous interval cleared');
        }
        teamIntroInterval = setInterval(() => changeTeamIntroSlide(1), 5000);
        console.log('New interval set');
    })
    .catch(error => console.error('Error loading carousel:', error));
}

// Initialize the carousel
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    loadTeamIntro();
});
