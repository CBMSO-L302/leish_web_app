// Function to handle tab switching
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove the active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add an active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
});