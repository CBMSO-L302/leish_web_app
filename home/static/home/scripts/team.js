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

// Function to load team description from a translation file
function loadTeamDescription() {
  const teamDescription = document.getElementById('team-description');
  const teamTitle = document.getElementById('team-title');
  
  // Get the current language from localStorage or default to English
  const currentLang = localStorage.getItem('selectedLanguage') || 'eng';
  
  // Load translations
  fetch(`/static/species/json/translation/team/${currentLang}.json`)
    .then(response => response.json())
    .then(data => {
      // Set team title
      teamTitle.textContent = data.team || 'Our Team';
      
      // Set team description
      if (data.teamText) {
        teamDescription.innerHTML = data.teamText;
      }
      
      // Update tab button text
      const currentMembersTab = document.querySelector('[data-tab="current-members"]');
      const formerMembersTab = document.querySelector('[data-tab="former-members"]');
      const studentsTab = document.querySelector('[data-tab="students"]');
      
      if (currentMembersTab && data.members) {
        currentMembersTab.textContent = data.members;
      }
      
      if (formerMembersTab && data.formerMembers) {
        formerMembersTab.textContent = data.formerMembers;
      }
      
      if (studentsTab && data.students) {
        studentsTab.textContent = data.students || 'Students';
      }
    })
    .catch(error => {
      console.error('Error loading team translations:', error);
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  loadTeamDescription();
  
  // Listen for language change events
  window.addEventListener('languageChanged', loadTeamDescription);
});