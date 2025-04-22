document.addEventListener('DOMContentLoaded', () => {
    const languageDropdown = document.getElementById('language-dropdown');
    const selectedFlag = document.getElementById('selected-flag');

    // Function to change language
    const changeLanguage = (lang) => {
        localStorage.setItem('selectedLanguage', lang);
        loadLanguage(lang);
    };

    // Expose the changeLanguage globally if needed
    window.changeLanguage = changeLanguage;

    function loadLeishInfoCards(lang) {
        // Implementation for loading the Leishmania cards (already defined elsewhere)
    }

    // Update translations on language change
    function loadLanguage(lang) {
        fetch(`/static/home/json/translations.json`)
            .then(response => response.json())
            .then(data => {
                const translations = data[lang];
                if (!translations) {
                    console.error(`Translations for language "${lang}" not found.`);
                    return;
                }

                // Header translations
                document.getElementById('lang_genome_decoding').textContent = translations.genomeDecoding;
                document.getElementById('lang_about_us').textContent = translations.aboutUs;
                document.getElementById('lang_mission').textContent = translations.mission;
                document.getElementById('lang_team').textContent = translations.team;
                document.getElementById('lang_species').textContent = translations.species;
                document.getElementById('lang_downloads').textContent = translations.downloads;
                document.getElementById('lang_reports').textContent = translations.reports;
                document.getElementById('lang_datasets').textContent = translations.datasets;
                document.getElementById('lang_software').textContent = translations.software;

                // Main content translations
                document.getElementById('team-frontshow-text-header').querySelector('h3').textContent = translations.theTeam;
                document.getElementById('team-frontshow-text').querySelector('p').textContent = translations.theTeamDescription;
                document.getElementById('team-frontshow-button').textContent = translations.theTeamLearnMore;

                // WHO map content translations
                document.querySelector('.who-map-title h2').textContent = translations.whoMapTitle;
                document.querySelector('.who-map-description p').textContent = translations.whoMapDescription;

                // Latest updates section
                document.querySelector('.social-header h2').textContent = translations.latestUpdatesTitle;
                document.querySelector('.social-header p').textContent = translations.latestUpdatesDescription;

                // Load Leishmania cards
                loadLeishInfoCards(lang);
            })
            .catch(error => console.error('Error loading translations.json:', error));
    }

    // Load language from localStorage if it exists
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageDropdown.value = savedLanguage;
    loadLanguage(savedLanguage);

    // Event listener for language change
    languageDropdown.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});