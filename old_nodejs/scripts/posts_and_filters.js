let leishIntroIndex = 0;
let leishIntroInterval;

function showLeishIntroSlide(index) {
    console.log(`showLeishIntroSlide called with index: ${index}`);
    const leishIntroPosts = document.querySelectorAll('#real-leish-container .leish-post');
    console.log(`Found ${leishIntroPosts.length} posts in the container.`);
    if (index >= leishIntroPosts.length) {
        leishIntroIndex = 0;
    } else if (index < 0) {
        leishIntroIndex = leishIntroPosts.length - 1;
    } else {
        leishIntroIndex = index;
    }
    console.log(`Updated leishIntroIndex to: ${leishIntroIndex}`);
    leishIntroPosts.forEach((post, idx) => {
        post.style.display = (idx === leishIntroIndex) ? 'block' : 'none';
    });
}

function changeLeishIntroSlide(n) {
    console.log(`changeLeishIntroSlide called with increment: ${n}`);
    showLeishIntroSlide(leishIntroIndex + n);
}

function loadLeishIntro(lang) {
    console.log(`loadLeishIntro called with language: ${lang}`);
    fetch(`./data/lang/leish_intro_${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(`Fetched data from ./data/lang/leish_intro_${lang}.json`);
            return response.json();
        })
        .then(data => {
            console.log('JSON data received:', data);
            const leishIntroPostsContainer = document.getElementById('real-leish-container');
            console.log('Found real-leish-container:', leishIntroPostsContainer);
            leishIntroPostsContainer.innerHTML = ''; // Clear existing news

            data.forEach((post, index) => {
                console.log(`Creating post ${index}:`, post);
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

                postDiv.appendChild(imgDiv);
                postDiv.appendChild(textDiv);

                leishIntroPostsContainer.appendChild(postDiv);
            });

            leishIntroIndex = 0;
            showLeishIntroSlide(leishIntroIndex);

            if (leishIntroInterval) {
                clearInterval(leishIntroInterval);
            }

            leishIntroInterval = setInterval(() => changeLeishIntroSlide(1), 10000);
        })
        .catch(error => console.error('Error loading news:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    window.changeLeishIntroSlide = changeLeishIntroSlide;
    window.loadLeishIntro = loadLeishIntro;
    loadLeishIntro('eng'); // Call the function with a default language for testing
});
