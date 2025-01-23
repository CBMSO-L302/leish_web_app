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
        fetch(`../data/lang/pages/team/${lang}.json`)
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
                document.getElementById('selector-1').querySelector('span').textContent = data.mission;
                document.getElementById('selector-2').querySelector('span').textContent = data.team;
                document.getElementById('selector-3').querySelector('span').textContent = data.publications;
                document.getElementById('team-frontshow-text').innerHTML = data.teamText;
                document.getElementById('members-btn').textContent = data.members;
                document.getElementById('former-members-btn').textContent = data.formerMembers;

            })
            .catch(error => console.error('Error loading language:', error));

        // Change flag
        selectedFlag.src = languageDropdown.querySelector(`option[value="${lang}"]`).dataset.flag;
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
