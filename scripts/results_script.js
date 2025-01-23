$(document).ready(function() {
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function search(query) {
        $.get('/search', { query: query }, function(data) {
            renderResults(data);
        });
    }

    function renderResults(data) {
        var tbody = $('#results-table tbody');
        var thead = $('#results-table thead tr');
        tbody.empty();
        thead.empty();

        if (data.length > 0) {
            // Determine columns dynamically based on first result
            var columns = Object.keys(data[0]);

            columns.forEach(function(col) {
                thead.append($('<th>').attr('data-header', col).text(col));
            });

            data.forEach(function(row) {
                var tr = $('<tr>').attr('data-source-table', row.source_table);
                columns.forEach(function(col) {
                    tr.append($('<td>').attr('data-header', col).text(row[col]));
                });
                tbody.append(tr);
            });
        }

        applyFilters();
    }

    function applyFilters() {
        var selectedSources = $('.filters .opt-in:checked').map(function() {
            return $(this).val();
        }).get();

        $('#results-table tbody tr').each(function() {
            var sourceTable = $(this).attr('data-source-table');
            if (selectedSources.length === 0 || selectedSources.includes(sourceTable)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }                                

    // Get initial query from URL and perform initial search
    var initialQuery = new URLSearchParams(window.location.search).get('query');
    if (initialQuery) {
        $('#live-search-bar').val(initialQuery);
        search(initialQuery);
        $('#live-search-bar').focus();
    }

    $('#live-search-bar').on('input', debounce(function() {
        var query = $(this).val();
        if (query.length > 0) {
            search(query);
        }
    }, 1500)); // 500ms delay


    $('#live-search-bar').on('input', function() {
        var query = $(this).val();
        if (query.length > 0) {
            search(query);
            // Update the URL with the new query
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?query=' + encodeURIComponent(query);
            window.history.pushState({ path: newUrl }, '', newUrl);
        } else {
            // Redirect to index.html if the search bar is empty
            window.location.href = '../index.html';
        }
    });

    // Event listener for checkboxes to apply filters
    $('.filters .opt-in').on('change', function() {
        applyFilters();
    });
});