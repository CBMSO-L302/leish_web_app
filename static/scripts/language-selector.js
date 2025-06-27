/**
 * Enhanced language selector that updates the flag display
 * and maintains visual consistency
 */
document.addEventListener('DOMContentLoaded', () => {
    const languageDropdown = document.getElementById('language-dropdown');
    const selectedFlag = document.getElementById('selected-flag');

    /**
     * Update the flag display based on the selected language
     */
    const updateFlag = () => {
        const selectedOption = languageDropdown.options[languageDropdown.selectedIndex];
        const flagSrc = selectedOption.dataset.flag;

        if (selectedFlag && flagSrc) {
            selectedFlag.src = flagSrc;
        }
    };

    // Initialize flag on page load
    updateFlag();

    // Update flag when the language changes (before form submission)
    languageDropdown.addEventListener('change', () => {
        updateFlag();
    });
});