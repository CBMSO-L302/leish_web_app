document.addEventListener('DOMContentLoaded', () => {
    const languageDropdown = document.getElementById('language-dropdown');
    const selectedFlag = document.getElementById('selected-flag');

    /**
     * Change and persist the selected language, then reload translations.
     */
    const changeLanguage = (lang) => {
        localStorage.setItem('selectedLanguage', lang);
        loadLanguage(lang);
    };

    // Expose changeLanguage globally if needed
    window.changeLanguage = changeLanguage;

    /**
     * Update translations for a list of elements based on their IDs or selectors.
     * @param {object} elementsToTranslate - Mapping of selector/IDs to translation keys.
     * @param {object} translations - Translations for the selected language.
     */
    const updatePageTranslations = (elementsToTranslate, translations) => {
        Object.entries(elementsToTranslate).forEach(([selector, translationKey]) => {
            const element = document.querySelector(selector);
            if (element && translations[translationKey]) {
                element.textContent = translations[translationKey];
            } else if (!translations[translationKey]) {
                console.error(`Translation key "${translationKey}" not found.`);
            } else {
                console.error(`DOM element for selector "${selector}" not found.`);
            }
        });
    };

    /**
     * Dynamically load and create the Leishmania info cards from translations JSON.
     * @param {string} lang - Selected language.
     */
    const loadLeishInfoCards = (lang) => {
        fetch(`/static/home/json/translations.json`)
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                if (!translations || !translations.leishIntro) {
                    console.error(`LeishIntro data for language "${lang}" not found.`);
                    return;
                }

                const leishInfoData = translations.leishIntro;
                const cardContainer = document.getElementById('leish-card-container');

                // Clear existing cards
                cardContainer.innerHTML = '';

                // Create new cards
                leishInfoData.forEach((info) => {
                    const card = document.createElement('div');
                    card.classList.add('leish-card');

                    // Title
                    const title = document.createElement('h3');
                    title.classList.add('leish-card-title');
                    title.textContent = info.title;
                    card.appendChild(title);

                    // Image
                    const imgDiv = document.createElement('div');
                    imgDiv.classList.add('leish-card-img');
                    const img = document.createElement('img');
                    img.src = info.img;
                    img.alt = info.title;
                    imgDiv.appendChild(img);
                    card.appendChild(imgDiv);

                    // Description
                    const desc = document.createElement('p');
                    desc.classList.add('leish-card-description');
                    desc.textContent = info.description;
                    card.appendChild(desc);

                    cardContainer.appendChild(card);
                });

                // Update carousel functionality (from leish-intro-carousel.js)
                setupLeishInfoCards();
            })
            .catch(error => console.error('Error loading translations.json:', error));
    };

    /**
     * Load and apply the translations for the selected language.
     * @param {string} lang - Selected language.
     */
    const loadLanguage = (lang) => {
        fetch(`/static/home/json/translations.json`)
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                if (!translations) {
                    console.error(`Translations for language "${lang}" not found.`);
                    return;
                }

                // Map of selectors/IDs to their corresponding translation keys
                const elementsToTranslate = {
                    '#lang_genome_decoding': 'genomeDecoding',
                    '#lang_about_us': 'aboutUs',
                    '#lang_mission': 'mission',
                    '#lang_team': 'team',
                    '#lang_species': 'species',
                    '#lang_downloads': 'downloads',
                    '#lang_reports': 'reports',
                    '#lang_datasets': 'datasets',
                    '#lang_software': 'software',
                    '#team-frontshow-text-header h3': 'theTeam',
                    '#team-frontshow-text p': 'theTeamDescription',
                    '#team-frontshow-button': 'theTeamLearnMore',
                    '.who-map-title h2': 'whoMapTitle',
                    '.who-map-description p': 'whoMapDescription',
                    '.social-header h2': 'latestUpdatesTitle',
                    '.social-header p': 'latestUpdatesDescription'
                };

                // Apply translations
                updatePageTranslations(elementsToTranslate, translations);

                // Load Leishmania cards
                loadLeishInfoCards(lang);

                // Update flag for selected language
                const flagElement = languageDropdown.querySelector(`option[value="${lang}"]`);
                if (selectedFlag && flagElement) {
                    selectedFlag.src = flagElement.dataset.flag;
                } else {
                    console.error('Language flag element not found.');
                }
            })
            .catch(error => console.error('Error loading translations.json:', error));
    };

    // Load language from localStorage or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'eng';
    languageDropdown.value = savedLanguage;
    loadLanguage(savedLanguage);

    // Event listener for language changes
    languageDropdown.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});