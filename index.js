const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3010; // Change the port to 3010

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

// Function to convert population to various formats
function formatPopulation(population) {
  if (population >= 10000000) {
    // Convert to crore format
    return (population / 10000000).toFixed(2) + ' crore';
  } else if (population >= 50000) {
    // Convert to lakh format
    return (population / 100000).toFixed(2) + ' lakh';
  } else {
    // Convert to thousands format
    return (population / 1000).toFixed(2) + ' thousand';
  }
}

// Route to render the /country/population page
app.get('/country/population', (req, res) => {
  const data = [];

  fs.createReadStream(path.join(__dirname, 'data', 'country_population_2021sep.csv'))
    .pipe(csvParser())
    .on('data', (row) => {
      // Convert population to various formats
      row['Population (September 2021)'] = formatPopulation(parseInt(row['Population (September 2021)']));
      data.push(row);
    })
    .on('end', () => {
      res.render('index', { data });
    });
});

// Route to render the home page
app.get('/', (req, res) => {
  res.render('home');
});

// Test route
app.get('/test', (req, res) => {
  res.send('Hello World!');
});


// Function to convert literacy rate to percentage format
function formatLiteracy(literacyRate) {
  return parseFloat(literacyRate).toFixed(2) + '%';
}

// Route to render the /country/literacy page
app.get('/country/literacy', (req, res) => {
  const data = [];

  fs.createReadStream(path.join(__dirname, 'data', 'country_literacy_2021sep.csv'))
    .pipe(csvParser())
    .on('data', (row) => {
      // Convert literacy rate to percentage format
      row['Literacy Rate'] = formatLiteracy(row['Literacy Rate']);
      data.push(row);
    })
    .on('end', () => {
      res.render('literacy', { data });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
