document.addEventListener("DOMContentLoaded", function() {
  // Locate the files
  const pathMap = {
    infantum: '/static/species/json/infantum.json',
    donovani: '/static/species/json/donovani.json',
    major: '/static/species/json/major.json',
    braziliensis: '/static/species/json/braziliensis.json'
  };

  const species = window.location.pathname.split("/").pop().split(".")[0];
  const jsonPath = pathMap[species];

  // Get table data and inject it in the HTML
  if (jsonPath) {
    fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        const tableContainer = document.getElementById("downloads-table");
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>File</th>
              <th>Reference Genome</th>
              <th>Version/Year</th>
              <th>Downloads</th>
              <th>Raw Data</th>
              <th>Notes</th>
            </tr>
          </thead>
          ${data.map(item => `
            <tr>
              <td><strong>${item.type.toUpperCase()} (${item.format.toUpperCase()} file)</strong></td>
              <td>${item.url}</td>
              <td>${item.version}/${item.year}</td>
              <td><a href="${item.path_file}" class="download-button">DOWNLOAD</a></td>
              <td>${item.raw_data}</td>
              <td>${item.description}</td>
            </tr>`).join('')}
          </tbody>
        `;
        tableContainer.appendChild(table);
      })
      .catch(error => console.error('Error loading downloads:', error));
  }
});