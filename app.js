const express = require('express');
const path = require('path');
const app = express(); // Initialize the express app

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up static file directory for public assets
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

module.exports = app; // Export the app to be used in index.js
