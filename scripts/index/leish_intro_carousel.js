let leishIntroIndex = 0;
let leishIntroInterval;

function showLeishIntroSlide(index) {
    const leishIntroPosts = document.querySelectorAll('#real-leish-container .leish-post');
    if (index >= leishIntroPosts.length) {
        leishIntroIndex = 0;
    } else if (index < 0) {
        leishIntroIndex = leishIntroPosts.length - 1;
    } else {
        leishIntroIndex = index;
    }
    leishIntroPosts.forEach((post, i) => {
        post.style.display = i === leishIntroIndex ? 'flex' : 'none';
    });
}

function changeLeishIntroSlide(n) {
    showLeishIntroSlide(leishIntroIndex + n);
}

function loadLeishIntro(lang) {
    fetch(`./data/lang/index/leish_intro_${lang}.json`)
        .then(response => response.json())
        .then(data => {
            const leishIntroPostsContainer = document.getElementById('real-leish-container');
            leishIntroPostsContainer.innerHTML = ''; // Clear existing news

            data.forEach((post, index) => {
                // Create the container for each post
                const postDiv = document.createElement('div');
                postDiv.classList.add('leish-post');
                if (index !== 0) postDiv.style.display = 'none'; // Hide all posts except the first one

                // Create and append the image
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('leish-post-img');
                const img = document.createElement('img');
                img.src = post.img;
                img.alt = post.title;
                imgDiv.appendChild(img);

                // Create and append the text container
                const textDiv = document.createElement('div');
                textDiv.classList.add('leish-post-text');

                // Create a div to hold the title
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('leish-post-title');
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
                leishIntroPostsContainer.appendChild(postDiv);
            });

            leishIntroIndex = 0;
            showLeishIntroSlide(leishIntroIndex);

            // Clear any existing interval before starting a new one
            if (leishIntroInterval) {
                clearInterval(leishIntroInterval);
            }

            // Start the interval to show the next slide every 10 seconds
            leishIntroInterval = setInterval(() => changeLeishIntroSlide(1), 10000);
        })
        .catch(error => console.error('Error loading leish intro:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    window.changeLeishIntroSlide = changeLeishIntroSlide;
    window.loadLeishIntro = loadLeishIntro;
});
