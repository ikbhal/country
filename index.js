const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3010;

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
    res.send('Hello World!');
});
// create home route which direct to /country/population
app.get('/', (req, res) => {
    res.render('home');
});

// Route to render the /country/population page
app.get('/country/population', (req, res) => {
    // res.send("country popuoation");
  const data = [];

  fs.createReadStream(path.join(__dirname, 'data', 'country_population_2021sep.csv'))
    .pipe(csvParser())
    .on('data', (row) => {
        console.log("row:" , row);
      data.push(row);
    })
    .on('end', () => {
      res.render('index', { data });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
