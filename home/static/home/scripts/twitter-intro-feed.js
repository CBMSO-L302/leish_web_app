document.addEventListener("DOMContentLoaded", function () {
  const tabs = ["WHO", "CBM", "CSIC", "UAM"];

  function openSocialTab(evt, tabName) {
    // Hide all content panels
    const panels = document.querySelectorAll(".social-panel");
    panels.forEach(panel => {
      panel.classList.remove("active");
      const spinner = panel.querySelector(".loading-spinner");
      spinner && (spinner.classList.remove("active")); // Hide spinner
    });

    // Deactivate all buttons
    const buttons = document.querySelectorAll(".social-tab-btn");
    buttons.forEach(button => button.classList.remove("active"));

    // Activate the selected tab and show its spinner
    const activePanel = document.getElementById(tabName);
    activePanel.classList.add("active");

    const spinner = activePanel.querySelector(".loading-spinner");
    if (spinner) spinner.classList.add("active"); // Show spinner

    if (evt?.currentTarget) {
      evt.currentTarget.classList.add("active");
    } else {
      document.querySelector(`.social-tab-btn[data-tab="${tabName}"]`).classList.add("active");
    }

    // Load Twitter widget and remove spinner once loaded
    if (typeof twttr !== "undefined" && twttr.widgets) {
      twttr.widgets.load(activePanel);

      // Simulate loading time (replace with actual "load" detection if supported)
      setTimeout(() => {
        if (spinner) spinner.classList.remove("active"); // Hide spinner once loaded
      }, 2000); // Adjust time as needed
    } else if (spinner) {
      spinner.classList.remove("active"); // Ensure spinner hides if widgets fail to load
    }
  }

  // Add button click event listeners
  const tabButtons = document.querySelectorAll(".social-tab-btn");
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      openSocialTab(e, tabs[index]);
    });
  });

  // Load the default tab
  openSocialTab(null, tabs[0]);
});