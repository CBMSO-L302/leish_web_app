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
     * Load and apply the translations for the selected language.
     * @param {string} lang - Selected language.
     */
    const loadLanguage = (lang) => {
        fetch(`/static/json/translation/header-footer-translation.json`)
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                if (!translations) {
                    console.error(`Translations for language "${lang}" not found.`);
                    return;
                }

                // Map of selectors/IDs with their corresponding translation keys
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
                };

                // Apply translations
                updatePageTranslations(elementsToTranslate, translations);

                // Update flag for the selected language
                const flagElement = languageDropdown.querySelector(`option[value="${lang}"]`);
                if (selectedFlag && flagElement) {
                    selectedFlag.src = flagElement.dataset.flag;
                } else {
                    console.error('Language flag element not found.');
                }
            })
            .catch(error => console.error('Error loading header-footer-translation.json:', error));
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