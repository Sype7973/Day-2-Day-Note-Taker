// import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/index.js');


// create an api request to the server
const PORT = process.env.PORT || 8080;

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api',api);

app.use(express.static('public'));

// Get request
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// get request too notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// wildcard route (HTML PAGE)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// host local port and deploy to heroku
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});