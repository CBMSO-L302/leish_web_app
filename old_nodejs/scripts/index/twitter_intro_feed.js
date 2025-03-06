/**
 * @typedef {Object} TwttrWidgets
 * @property {Function} load - A function to load Twitter widgets.
 */

/**
 * @type {{widgets: TwttrWidgets}}
 */
let twttr;

document.addEventListener("DOMContentLoaded",
  function() {
    function openTwitter(evt, twitterName) {
      // Hide all tab content
      const tabcontent = document.querySelectorAll(".tabcontent");
      tabcontent.forEach((content) => {content.style.display = "none";});

      // Remove the "active" class from all tab buttons
      const tablinks = document.querySelectorAll(".tablinks");
      tablinks.forEach(
        (link) => {
          link.classList.remove("active");
        }
      );

      // Show the current tab and add "active" class to the clicked tab button
      document.getElementById(twitterName).style.display = "block";
      evt.currentTarget.classList.add("active");

      // Load Twitter widgets
      if (typeof twttr !== "undefined" && twttr.widgets) {
        twttr.widgets.load();
      }
    }

    // Attach event listeners to all tab buttons dynamically
    const tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach(
      (button) => {
        button.addEventListener(
          "click", function(event) {
            const twitterName = this.getAttribute("data-tab");
            openTwitter(event, twitterName);
          }
        );
      }
    );

    // Default open tab: trigger the first button
    const defaultTab = document.querySelector(".tablinks");
    if (defaultTab) {
      defaultTab.click();
    }

  }
);