// Leishmaniasis Dashboard Script
document.addEventListener('DOMContentLoaded', function() {
    // Load the leishmaniasis data from the JSON file
    fetch('/static/home/json/leishmaniasis_data.json')
        .then(response => response.json())
        .then(data => {
            createDashboard(data);
        })
        .catch(error => {
            console.error('Error loading leishmaniasis data:', error);
            document.querySelector('.who-map-container').innerHTML = 
                '<div class="error-message">Error loading data. Please try again later.</div>';
        });
});

function createDashboard(data) {
    // Get the container element
    const container = document.querySelector('.who-map-container');

    // Clear the existing content (iframe)
    container.innerHTML = '';

    // Create dashboard title
    const titleElement = document.createElement('div');
    titleElement.className = 'who-map-title';
    titleElement.innerHTML = '<h2>Global Cutaneous Leishmaniasis Cases</h2>';
    container.appendChild(titleElement);

    // Create dashboard description
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'who-map-description';
    descriptionElement.innerHTML = '<p>Interactive dashboard showing reported cases of cutaneous leishmaniasis worldwide. Data source: World Health Organization (WHO).</p>';
    container.appendChild(descriptionElement);

    // Create dashboard container
    const dashboardContainer = document.createElement('div');
    dashboardContainer.className = 'dashboard-container';
    container.appendChild(dashboardContainer);

    // Create visualization containers
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-visualization';
    mapContainer.className = 'visualization-container';
    dashboardContainer.appendChild(mapContainer);

    const trendsContainer = document.createElement('div');
    trendsContainer.id = 'trends-visualization';
    trendsContainer.className = 'visualization-container';
    dashboardContainer.appendChild(trendsContainer);

    const regionContainer = document.createElement('div');
    regionContainer.id = 'region-visualization';
    regionContainer.className = 'visualization-container';
    dashboardContainer.appendChild(regionContainer);

    // Create source attribution
    const sourceElement = document.createElement('div');
    sourceElement.className = 'who-map-source';
    sourceElement.innerHTML = '<p>Source: <a href="https://www.who.int/data/gho/data/indicators/indicator-details/GHO/number-of-cases-of-cutaneous-leishmaniasis-reported" target="_blank">World Health Organization</a></p>';
    container.appendChild(sourceElement);

    // Get screen width for responsive adjustments
    const screenWidth = window.innerWidth;

    // Create the visualizations with responsive adjustments
    createWorldMap(data, mapContainer.id, screenWidth);
    createTrendsChart(data, trendsContainer.id, screenWidth);
    createRegionChart(data, regionContainer.id, screenWidth);

    // Add window resize handler for responsiveness
    window.addEventListener('resize', function() {
        const newWidth = window.innerWidth;
        createWorldMap(data, mapContainer.id, newWidth);
        createTrendsChart(data, trendsContainer.id, newWidth);
        createRegionChart(data, regionContainer.id, newWidth);
    });
}

function createWorldMap(data, containerId, screenWidth = window.innerWidth) {
    // Process data for the map
    // Get the most recent year's data for each country
    const latestYear = Math.max(...data.map(d => d.year));
    const latestData = data.filter(d => d.year === latestYear);

    // Create the choropleth map
    const mapData = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: latestData.map(d => d.country),
        z: latestData.map(d => d.cases),
        text: latestData.map(d => `${d.country}<br>Cases: ${d.cases}`),
        colorscale: 'YlOrRd',
        colorbar: {
            title: 'Cases',
            thickness: screenWidth < 480 ? 15 : 20
        },
        marker: {
            line: {
                color: 'rgb(150,150,150)',
                width: 0.5
            }
        }
    }];

    // Adjust layout based on screen size
    const mapHeight = screenWidth < 480 ? 300 : screenWidth < 768 ? 350 : 450;

    const mapLayout = {
        title: `Cutaneous Leishmaniasis Cases (${latestYear})`,
        geo: {
            showframe: false,
            showcoastlines: true,
            projection: {
                type: 'natural earth'
            }
        },
        margin: {
            l: 0,
            r: 0,
            t: 50,
            b: 0
        },
        height: mapHeight,
        font: {
            size: screenWidth < 480 ? 10 : 12
        }
    };

    Plotly.newPlot(containerId, mapData, mapLayout, {responsive: true});
}

function createTrendsChart(data, containerId, screenWidth = window.innerWidth) {
    // Process data for the trends chart
    // Get unique countries and years
    const countries = [...new Set(data.map(d => d.country))];
    const years = [...new Set(data.map(d => d.year))].sort();

    // For smaller screens, limit the number of countries shown to avoid overcrowding
    let displayCountries = countries;
    if (screenWidth < 768) {
        // Show only top 5 countries by case count for the most recent year
        const latestYear = Math.max(...years);
        const latestData = data.filter(d => d.year === latestYear);

        // Sort countries by case count and take top 5
        const topCountries = latestData
            .sort((a, b) => b.cases - a.cases)
            .slice(0, 5)
            .map(d => d.country);

        displayCountries = topCountries;
    }

    // Create traces for each country
    const traces = displayCountries.map(country => {
        const countryData = data.filter(d => d.country === country);
        return {
            type: 'scatter',
            mode: 'lines+markers',
            name: country,
            x: countryData.map(d => d.year),
            y: countryData.map(d => d.cases),
            hovertemplate: '%{y} cases in %{x}<extra>%{fullData.name}</extra>',
            marker: {
                size: screenWidth < 480 ? 6 : 8
            },
            line: {
                width: screenWidth < 480 ? 2 : 3
            }
        };
    });

    // Adjust chart height based on screen size
    const chartHeight = screenWidth < 480 ? 300 : screenWidth < 768 ? 350 : 400;

    const layout = {
        title: 'Trends in Cutaneous Leishmaniasis Cases by Country',
        xaxis: {
            title: screenWidth < 480 ? '' : 'Year',
            tickvals: years
        },
        yaxis: {
            title: screenWidth < 480 ? '' : 'Number of Cases'
        },
        legend: {
            orientation: 'h',
            y: screenWidth < 480 ? -0.3 : -0.2,
            font: {
                size: screenWidth < 480 ? 8 : 10
            }
        },
        height: chartHeight,
        margin: {
            l: screenWidth < 480 ? 40 : 60,
            r: screenWidth < 480 ? 20 : 30,
            t: 50,
            b: screenWidth < 480 ? 80 : 100
        },
        font: {
            size: screenWidth < 480 ? 10 : 12
        }
    };

    Plotly.newPlot(containerId, traces, layout, {responsive: true});
}

function createRegionChart(data, containerId, screenWidth = window.innerWidth) {
    // Process data for the region chart
    // Get the most recent year's data
    const latestYear = Math.max(...data.map(d => d.year));
    const latestData = data.filter(d => d.year === latestYear);

    // Aggregate data by region
    const regionData = {};
    latestData.forEach(d => {
        if (!regionData[d.region]) {
            regionData[d.region] = 0;
        }
        regionData[d.region] += d.cases;
    });

    // Adjust text display based on screen size
    let textInfo = 'label+percent';
    if (screenWidth < 480) {
        textInfo = 'percent'; // Show only percentages on very small screens
    } else if (screenWidth < 768) {
        textInfo = 'percent+label'; // Different order for better readability on medium screens
    }

    // Create the pie chart
    const pieData = [{
        type: 'pie',
        labels: Object.keys(regionData),
        values: Object.values(regionData),
        textinfo: textInfo,
        insidetextorientation: 'radial',
        hoverinfo: 'label+value',
        hole: screenWidth < 480 ? 0.3 : 0.4,
        textfont: {
            size: screenWidth < 480 ? 10 : 12
        }
    }];

    // Adjust chart height based on screen size
    const chartHeight = screenWidth < 480 ? 300 : screenWidth < 768 ? 350 : 400;

    const pieLayout = {
        title: `Cutaneous Leishmaniasis Cases by Region (${latestYear})`,
        height: chartHeight,
        margin: {
            l: screenWidth < 480 ? 20 : 30,
            r: screenWidth < 480 ? 20 : 30,
            t: 50,
            b: screenWidth < 480 ? 20 : 30
        },
        font: {
            size: screenWidth < 480 ? 10 : 12
        }
    };

    Plotly.newPlot(containerId, pieData, pieLayout, {responsive: true});
}
