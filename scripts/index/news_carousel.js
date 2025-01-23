let currentNewsIndex = 0;
let newsInterval;

function showNewsSlide(index) {
    const newsPosts = document.querySelectorAll('#real-news-container .news-post');
    if (index >= newsPosts.length) {
        currentNewsIndex = 0;
    } else if (index < 0) {
        currentNewsIndex = newsPosts.length - 1;
    } else {
        currentNewsIndex = index;
    }
    newsPosts.forEach((post, i) => {
        post.style.display = i === currentNewsIndex ? 'flex' : 'none';
    });
}

function changeNewsSlide(n) {
    showNewsSlide(currentNewsIndex + n);
}

function loadNews(lang) {
    fetch(`./data/lang/index/news_${lang}.json`)
        .then(response => response.json())
        .then(data => {
            const newsPostsContainer = document.getElementById('real-news-container');
            newsPostsContainer.innerHTML = ''; // Clear existing news

            data.forEach((post, index) => {
                // Create the container for each post
                const postDiv = document.createElement('div');
                postDiv.classList.add('news-post');
                if (index !== 0) postDiv.style.display = 'none'; // Hide all posts except the first one

                // Create and append the image
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('news-post-img');
                    const img = document.createElement('img');
                    img.src = post.img;
                    img.alt = post.title;
                    imgDiv.appendChild(img);

                // Create and append the text container
                const textDiv = document.createElement('div');
                textDiv.classList.add('news-post-text');

                    // Create a div to hold the title
                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('news-post-title');
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
                newsPostsContainer.appendChild(postDiv);
            });

            currentNewsIndex = 0;
            showNewsSlide(currentNewsIndex);

            // Clear any existing interval before starting a new one
            if (newsInterval) {
                clearInterval(newsInterval);
            }
            
            // Start the interval to show the next slide every 3 seconds
            newsInterval = setInterval(() => changeNewsSlide(1), 10000);
        })
        .catch(error => console.error('Error loading news:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    window.changeNewsSlide = changeNewsSlide;
    window.loadNews = loadNews;
});
