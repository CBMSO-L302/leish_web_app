let mapIntroIndex = 0;
let mapIntroInterval;

function showMapIntroSlide(index) {
    const mapIntroPosts = document.querySelectorAll('#real-map-container .map-post');
    if (index >= mapIntroPosts.length) {
        mapIntroIndex = 0;
    } else if (index < 0) {
        mapIntroIndex = mapIntroPosts.length - 1;
    } else {
        mapIntroIndex = index;
    }
    mapIntroPosts.forEach((post, i) => {
        post.style.display = i === mapIntroIndex ? 'flex' : 'none';
    });
}

function changeMapIntroSlide(n) {
    showMapIntroSlide(mapIntroIndex + n);
}

function loadMapIntro(lang) {
    fetch(`./data/lang/index/map_intro_${lang}.json`)
        .then(response => response.json())
        .then(data => {
            const mapIntroPostsContainer = document.getElementById('real-map-container');
            mapIntroPostsContainer.innerHTML = ''; // Clear existing news

            data.forEach((post, index) => {
                // Create the container for each post
                const postDiv = document.createElement('div');
                postDiv.classList.add('map-post');
                if (index !== 0) postDiv.style.display = 'none'; // Hide all posts except the first one

                // Create and append the image
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('map-post-img');
                const img = document.createElement('img');
                img.src = post.img;
                img.alt = post.title;
                imgDiv.appendChild(img);

                // Create and append the text container
                const textDiv = document.createElement('div');
                textDiv.classList.add('map-post-text');

                // Create a div to hold the title
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('map-post-title');
                const title = document.createElement('h3');
                title.textContent = post.title;
                titleDiv.appendChild(title);
                textDiv.appendChild(titleDiv);

                // Add the description
                const description = document.createElement('p');
                description.textContent = post.description;
                textDiv.appendChild(description);

                // Add the date
                const date = document.createElement('p');
                date.textContent = post.date;
                textDiv.appendChild(date);

                // Append the image and text containers to the post container
                postDiv.appendChild(imgDiv);
                postDiv.appendChild(textDiv);

                // Append the post container to the news posts container
                mapIntroPostsContainer.appendChild(postDiv);
            });

            mapIntroIndex = 0;
            showMapIntroSlide(mapIntroIndex);

            // Clear any existing interval before starting a new one
            if (mapIntroInterval) {
                clearInterval(mapIntroInterval);
            }

            // Start the interval to show the next slide every 10 seconds
            mapIntroInterval = setInterval(() => changeMapIntroSlide(1), 10000);
        })
        .catch(error => console.error('Error loading leish intro:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    window.changeMapIntroSlide = changeMapIntroSlide;
    window.loadMapIntro = loadMapIntro;
});
