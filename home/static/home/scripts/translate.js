document.addEventListener('DOMContentLoaded', () => {
    const languageDropdown = document.getElementById('language-dropdown');
    const selectedFlag = document.getElementById('selected-flag');

    // Function to change language
    const changeLanguage = (lang) => {
        localStorage.setItem('selectedLanguage', lang);
        loadLanguage(lang);
    };

    // Expose changeLanguage globally if needed
    window.changeLanguage = changeLanguage;

    // Function to load language
    const loadLanguage = (lang) => {
        fetch(`/static/home/json/translations.json`)
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                if (!translations) {
                    console.error(`Translations for language "${lang}" not found.`);
                    return;
                }

                // Header content
                document.getElementById('lang_genome_decoding').textContent = translations.genomeDecoding;
                document.getElementById('lang_about_us').textContent = translations.aboutUs;
                document.getElementById('lang_mission').textContent = translations.mission;
                document.getElementById('lang_team').textContent = translations.team;
                document.getElementById('lang_species').textContent = translations.species;
                document.getElementById('lang_downloads').textContent = translations.downloads;
                document.getElementById('lang_reports').textContent = translations.reports;
                document.getElementById('lang_datasets').textContent = translations.datasets;
                document.getElementById('lang_software').textContent = translations.software;

                // Main content
                document.getElementById('team-frontshow-text-header').querySelector('h3').textContent = translations.theTeam;
                document.getElementById('team-frontshow-text').querySelector('p').textContent = translations.theTeamDescription;
                document.getElementById('team-frontshow-button').textContent = translations.theTeamLearnMore;

                // Load leish intro content
                loadLeishInfoCards(lang);

            })
            .catch(error => console.error('Error loading language file:', error));

        // Change flag
        const flagSrc = languageDropdown.querySelector(`option[value="${lang}"]`).dataset.flag;
        selectedFlag.src = flagSrc;
    };

    // Load language from localStorage if it exists
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageDropdown.value = savedLanguage;
    loadLanguage(savedLanguage);

    // Event listener for language change
    languageDropdown.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});