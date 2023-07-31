// // literacy.js

// $(document).ready(function() {
//     let tableData = []; // Store the original table data
  
//     // Function to update the table data based on the country name filter
//     function updateTable() {
//       const filterText = $('#filterInput').val().toLowerCase();
  
//       const filteredData = tableData.filter(country => {
//         return country.Country.toLowerCase().includes(filterText);
//       });
  
//       renderTable(filteredData);
//     }
  
//     // Function to render the table with the provided data
//     function renderTable(data) {
//       const tableBody = $('#literacyTable tbody');
//       tableBody.empty();
  
//       data.forEach(country => {
//         const row = `
//           <tr>
//             <td>${country.Country}</td>
//             <td>${country['Literacy Rate (September 2021)']}</td>
//           </tr>
//         `;
//         tableBody.append(row);
//       });
//     }
  
//     // Fetch the table data from the server
//     $.ajax({
//       url: '/country/literacy',
//       method: 'GET',
//       success: function(data) {
//         tableData = data;
//         renderTable(data);
//       },
//       error: function(err) {
//         console.log('Error fetching data:', err);
//       }
//     });
  
//     // Filter input keyup event
//     $('#filterInput').on('keyup', function() {
//       updateTable();
//     });
//   });
  