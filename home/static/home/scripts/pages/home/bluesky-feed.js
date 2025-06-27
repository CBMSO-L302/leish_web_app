document.addEventListener("DOMContentLoaded", () => {
  // Modern tab switching implementation for Bluesky social media feeds
  const tabContainer = document.querySelector(".social-tabs");
  const tabButtons = Array.from(document.querySelectorAll(".social-tab-btn"));
  const panels = Array.from(document.querySelectorAll(".social-panel"));
  
  // Initialize tabs with proper ARIA attributes for accessibility
  const initTabs = () => {
    tabContainer?.setAttribute("role", "tablist");
    
    tabButtons.forEach((button) => {
      // Set ARIA attributes for accessibility
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", button.classList.contains("active") ? "true" : "false");
      button.setAttribute("tabindex", button.classList.contains("active") ? "0" : "-1");
      button.setAttribute("id", `tab-${button.getAttribute("data-tab")}`);
      button.setAttribute("aria-controls", button.getAttribute("data-tab"));
      
      // Add keyboard navigation
      button.addEventListener("keydown", handleTabKeydown);
    });
    
    panels.forEach(panel => {
      // Set ARIA attributes for panels
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", `tab-${panel.id}`);
      panel.setAttribute("tabindex", "0");
    });
  };
  
  // Handle keyboard navigation for tabs
  const handleTabKeydown = (event) => {
    const { key } = event;
    const currentIndex = tabButtons.indexOf(event.target);
    
    switch (key) {
      case "ArrowRight":
        event.preventDefault();
        activateTab(tabButtons[(currentIndex + 1) % tabButtons.length]);
        break;
      case "ArrowLeft":
        event.preventDefault();
        activateTab(tabButtons[(currentIndex - 1 + tabButtons.length) % tabButtons.length]);
        break;
      case "Home":
        event.preventDefault();
        activateTab(tabButtons[0]);
        break;
      case "End":
        event.preventDefault();
        activateTab(tabButtons[tabButtons.length - 1]);
        break;
    }
  };
  
  // Activate a tab and its corresponding panel
  const activateTab = (tabButton) => {
    // Deactivate all tabs and panels
    tabButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("tabindex", "-1");
    });
    
    panels.forEach(panel => {
      panel.classList.remove("active");
    });
    
    // Activate the selected tab and panel
    tabButton.classList.add("active");
    tabButton.setAttribute("aria-selected", "true");
    tabButton.setAttribute("tabindex", "0");
    tabButton.focus();
    
    const targetPanelId = tabButton.getAttribute("data-tab");
    const targetPanel = document.getElementById(targetPanelId);
    
    if (targetPanel) {
      targetPanel.classList.add("active");
      
      // Handle Bluesky embed resizing
      refreshBskyEmbed(targetPanel);
    }
  };
  
  // Refresh Bluesky embed when the tab is activated
  const refreshBskyEmbed = (panel) => {
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      // noinspection CssInvalidHtmlTagReference
      const bskyEmbed = panel.querySelector('bsky-embed');
      
      if (bskyEmbed) {
        // Trigger resize events to ensure proper rendering
        window.dispatchEvent(new Event('resize'));
        
        // Force layout recalculation
        bskyEmbed.style.opacity = '0.99';
        setTimeout(() => {
          bskyEmbed.style.opacity = '1';
        }, 50);
      }
    });
  };
  
  // Add click event listeners to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      activateTab(button);
    });
  });
  
  // Initialize tabs
  initTabs();
  
  // Refresh the active embed on a page load
  const activePanel = document.querySelector(".social-panel.active");
  if (activePanel) {
    refreshBskyEmbed(activePanel);
  }
});