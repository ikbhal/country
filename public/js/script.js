$(document).ready(function() {
    // Filter table by country name
    $("#filterInput").on("keyup", function() {
      const value = $(this).val().toLowerCase();
      $("#populationTable tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  
    // Sort table by population (descending/ascending)
    let ascending = true;
    $("#populationTable thead th:nth-child(2)").click(function() {
      const column = 1; // Index of the column to sort
      const rows = $("#populationTable tbody tr").get();
  
      rows.sort(function(a, b) {
        const aValue = $(a).children("td").eq(column).text();
        const bValue = $(b).children("td").eq(column).text();
  
        return ascending ? aValue - bValue : bValue - aValue;
      });
  
      ascending = !ascending;
      rows.forEach(row => $("#populationTable tbody").append(row));
    });
  });
  