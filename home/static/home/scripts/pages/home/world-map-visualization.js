/**
 * @fileoverview World Map Visualization for Leishmaniasis Cases
 * @global Plotly
 */

// World Map Visualization for Leishmaniasis Cases
document.addEventListener('DOMContentLoaded', function () {
    // Load data from hidden elements in the DOM
    const mapDataElement = document.getElementById('map-data');
    if (!mapDataElement) return; // Exit if an element not found

    // Parse data from DOM element attributes, default to empty arrays/objects if missing
    const years = JSON.parse(mapDataElement.dataset.years || '[]');
    const countries = JSON.parse(mapDataElement.dataset.countries || '[]');
    const cutaneousData = JSON.parse(mapDataElement.dataset.cutaneous || '{}');
    const visceralData = JSON.parse(mapDataElement.dataset.visceral || '{}');

    // Validate that we have all required data before proceeding
    if (years.length === 0 || countries.length === 0 ||
        Object.keys(cutaneousData).length === 0 || Object.keys(visceralData).length === 0) {
        console.error('No data available for the world map visualization');
        return;
    }

    // Get references to the year and case type dropdown selectors
    const yearSelector = document.getElementById('year-selector');
    const caseTypeSelector = document.getElementById('case-type-selector');
    if (!yearSelector || !caseTypeSelector) return; // Exit if selectors not found

    // Dynamically populate the year selector dropdown with options
    years.forEach((year, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = year;
        yearSelector.appendChild(option);
    });

    // Set initial default values for selectors
    yearSelector.value = 0; // Start with the first year
    caseTypeSelector.value = 'cutaneous'; // Default to cutaneous cases

    // Helper function to get the appropriate dataset based on a selected case type
    function getCurrentDataset() {
        return caseTypeSelector.value === 'cutaneous' ? cutaneousData : visceralData;
    }

    // Helper function to get a display name for the selected case type
    function getCaseTypeDisplayName() {
        return caseTypeSelector.value === 'cutaneous' ? 'Cutaneous' : 'Visceral';
    }

    // Helper function to determine if device is mobile/tablet
    function isMobileOrTablet() {
        return window.innerWidth <= 1024;
    }

    // Main function to create and update the world map visualization
    function createWorldMap(yearIndex) {
        const selectedYear = years[yearIndex];
        const mapContainer = document.getElementById('world-map-plot');
        if (!mapContainer) return; // Exit if container not found

        // Get data for a currently selected case type
        const casesData = getCurrentDataset();
        const caseTypeDisplayName = getCaseTypeDisplayName();

        // Initialize arrays to hold map data
        const data = [];
        const values = [];
        const locations = [];
        const hoverText = [];

        // Process data for each country
        countries.forEach((country) => {
            if (casesData[country] && yearIndex < casesData[country].length) {
                const caseCount = casesData[country][yearIndex];
                values.push(caseCount);
                locations.push(country);
                hoverText.push(`${country}: ${caseCount} cases (${selectedYear})`);
            }
        });

        // Configure colorbar based on screen size
        const colorbarConfig = isMobileOrTablet() ? {
            title: 'Cases',
            orientation: 'h',     // Horizontal orientation
            x: 0.5,              // Center horizontally
            xanchor: 'center',   // Anchor point for centering
            y: -0.1,             // Position below the map
            yanchor: 'top',      // Anchor from the top
            len: 0.8,            // Length of the colorbar (80% of container width)
            thickness: 15        // Thickness of the horizontal bar
        } : {
            title: 'Cases',
            thickness: 20        // Default vertical colorbar for desktop
        };

        // Configure the choropleth map trace
        const trace = {
            type: 'choropleth',
            locations: locations,
            z: values,
            text: hoverText,
            hoverinfo: 'text',
            colorscale: [
                [0, 'rgb(242, 240, 247)'],    // Lightest purple
                [0.2, 'rgb(218, 218, 235)'],
                [0.4, 'rgb(188, 189, 220)'],
                [0.6, 'rgb(158, 154, 200)'],
                [0.8, 'rgb(117, 107, 177)'],
                [1, 'rgb(84, 39, 143)']       // Darkest purple
            ],
            colorbar: colorbarConfig,
            locationmode: 'country names'
        };

        data.push(trace);

        // Configure the map layout with responsive margins
        const layout = {
            title: `Reported ${caseTypeDisplayName} Leishmaniasis Cases (${selectedYear})`,
            geo: {
                showframe: false,
                showcoastlines: true,
                projection: {
                    type: 'natural earth'
                }
            },
            margin: {
                l: 0,          // left margin
                r: 0,          // right margin
                b: isMobileOrTablet() ? 60 : 0,  // Extra bottom margin for horizontal legend
                t: 50,         // top margin
                pad: 4         // padding
            },
            paper_bgcolor: 'rgba(0,0,0,0)',  // Transparent background
            plot_bgcolor: 'rgba(0,0,0,0)',   // Transparent plot area
            font: {
                family: 'Arial, sans-serif'
            }
        };

        // Configuration for plot behavior
        const config = {
            responsive: true,          // Make plot responsive to window resizing
            displayModeBar: false      // Hide the mode bar
        };

        // Create the plot using Plotly
        // noinspection JSUnresolvedReference
        Plotly.newPlot(mapContainer, data, layout, config);
    }

    // Initialize map with first year data
    createWorldMap(0);

    // Add event listener for year selection changes
    yearSelector.addEventListener('change', function () {
        createWorldMap(parseInt(this.value));
    });

    // Add an event listener for case type selection changes
    caseTypeSelector.addEventListener('change', function () {
        createWorldMap(parseInt(yearSelector.value));
    });

    // Add a window resize listener to handle orientation changes
    window.addEventListener('resize', function () {
        createWorldMap(parseInt(yearSelector.value));
    });
});