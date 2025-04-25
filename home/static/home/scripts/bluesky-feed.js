document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".social-tab-btn");
  const panels = document.querySelectorAll(".social-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and panels
      tabButtons.forEach((button) => button.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to the clicked button
      btn.classList.add("active");

      // Get the tab name from data-tab attribute
      const targetPanelId = btn.getAttribute("data-tab");

      // Show the corresponding panel by adding active class
      document.getElementById(targetPanelId).classList.add("active");
    });
  });
});