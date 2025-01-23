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
        fetch(`./data/lang/index/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                // Header content
                document.getElementById('lang_genome_decoding').textContent = data.genomeDecoding;
                document.getElementById('lang_about_us').textContent = data.aboutUs;
                document.getElementById('lang_mission').textContent = data.mission;
                document.getElementById('lang_team').textContent = data.team;
                document.getElementById('lang_species').textContent = data.species;
                document.getElementById('lang_downloads').textContent = data.downloads;
                document.getElementById('lang_reports').textContent = data.reports;
                document.getElementById('lang_datasets').textContent = data.datasets;
                document.getElementById('lang_software').textContent = data.software;
                // Main content
                document.getElementById('team-frontshow-text-header').querySelector('h3').textContent = data.theTeam;
                document.getElementById('team-frontshow-text').querySelector('p').textContent = data.theTeam_description;
                document.getElementById('team-frontshow-button').textContent = data.theTeam_learnMore;

                // Load news content
                loadNews(lang);
                // Load leish intro content
                loadLeishIntro(lang);

                // Load map intro content
                loadMapIntro(lang);
            })
            .catch(error => console.error('Error loading language:', error));
        
        // Change flag
        const flagSrc = languageDropdown.querySelector(`option[value="${lang}"]`).dataset.flag;
        selectedFlag.src = flagSrc;
    };

    // Load language from localStorage if exists
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'eng';
    languageDropdown.value = savedLanguage;
    loadLanguage(savedLanguage);

    // Event listener for language change
    languageDropdown.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});
