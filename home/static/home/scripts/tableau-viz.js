/**
 * Tableau Visualization Initialization Script
 * 
 * This script handles the initialization, responsive sizing, and device-specific views
 * for the Tableau Public visualization embedded in the WHO Leishmaniasis Map section.
 * 
 * The visualization displays Visceral Leishmaniasis (VL) data on a world map with
 * country-specific information and yearly case data.
 * 
 * Source: https://public.tableau.com/views/VisceralLeishmaniasisVL-Mapandcasesperyear/VL_Dashboard_map_countries
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the main container elements
  const divElement = document.getElementById('viz1716304800000');  // Main container div
  let vizElement = divElement.getElementsByTagName('object')[0]; // Tableau object element
  let deviceParam = document.getElementById('device-param');     // Device parameter for responsive views
  let currentDevice = '';                                        // Tracks current device type (desktop/tablet/phone)

  /**
   * Initialize the Tableau visualization with proper sizing and load the API
   * 
   * This function:
   * 1. Sets the appropriate size based on container width
   * 2. Makes the visualization visible
   * 3. Loads the Tableau JavaScript API
   */
  function initViz() {
    // Set responsive size based on container width
    // For larger screens (>800 px), use 75% height ratio
    if (divElement.offsetWidth > 800) {
      vizElement.style.width = '100%';
      vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } 
    // For medium screens (500-800 px), also use 75% height ratio
    else if (divElement.offsetWidth > 500) {
      vizElement.style.width = '100%';
      vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } 
    // For small screens (<500 px), use fixed height to ensure visibility
    else {
      vizElement.style.width = '100%';
      vizElement.style.height = '700px';
    }

    // Ensure the visualization is visible
    vizElement.style.display = 'block';

    // Dynamically load the Tableau JavaScript API
    // This approach avoids loading the API until the visualization is ready
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }

  /**
   * Determine and set the appropriate device type based on screen width
   * 
   * This function:
   * 1. Detects the current device type based on screen width
   * 2. Updates the device parameter if it has changed
   * 3. Reinitialized the visualization with the new device type if necessary
   * 
   * Device breakpoints match the site's CSS media queries:
   * - Phone: ≤480px
   * - Tablet: 481-775 px
   * - Desktop: >775 px
   */
  function setDeviceType() {
    let newDevice;

    // Determine a device type based on window width
    // These breakpoints match the CSS media queries in home.css
    if (window.innerWidth <= 480) {
      newDevice = 'phone';
    } else if (window.innerWidth <= 775) {
      newDevice = 'tablet';
    } else {
      newDevice = 'desktop';
    }

    // Only update if a device type has changed to avoid unnecessary reloads
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      deviceParam.value = currentDevice;

      // If the visualization has already been loaded (iframe exists),
      // we need to completely rebuild it with the new device parameter
      if (document.querySelector('.tableauPlaceholder iframe')) {
        // Remove existing visualization content
        divElement.innerHTML = '';

        // Recreate the placeholder and object with an updated device parameter
        // This HTML structure is required by Tableau's embedding system
        // noinspection XmlDeprecatedElement,HtmlDeprecatedTag,HtmlDeprecatedAttribute
        divElement.innerHTML = `
          <noscript>
            <a href='#'>
              <img alt='Visceral Leishmaniasis (VL) Dashboard' src='https://public.tableau.com/static/images/Vi/VisceralLeishmaniasisVL-Mapandcasesperyear/VL_Dashboard_map_countries/1_rss.png' style='border: none' />
            </a>
          </noscript>
          <object class='tableauViz' style='display:none;'>
            <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
            <param name='embed_code_version' value='3' />
            <param name='site_root' value='' />
            <param name='name' value='VisceralLeishmaniasisVL-Mapandcasesperyear/VL_Dashboard_map_countries' />
            <param name='tabs' value='no' />
            <param name='toolbar' value='yes' />
            <param name='static_image' value='https://public.tableau.com/static/images/Vi/VisceralLeishmaniasisVL-Mapandcasesperyear/VL_Dashboard_map_countries/1.png' />
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='no' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
            <param name='language' value='en-US' />
            <param name='filter' value='publish=yes' />
            <param name='device' value='${currentDevice}' id='device-param' />
          </object>
        `;

        // Update references to the newly created elements
        vizElement = divElement.getElementsByTagName('object')[0];
        deviceParam = document.getElementById('device-param');

        // Initialize the visualization again with the new settings
        initViz();
      }
    }
  }

  // Initial setup: set device type and initialize visualization
  setDeviceType();
  initViz();

  // Add debounced resize handler to avoid performance issues
  // Only triggers the update after resizing has stopped for 250 ms
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setDeviceType, 250);
  });
});
