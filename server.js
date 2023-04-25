// import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/notes.js');


// create an api request to the server
const PORT = process.env.PORT || 8080;

const app = express();

// middleware

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
// Append DB file


// delete request
app.delete('/api/notes/:id', (req, res) => {
    // read the db.json file
    const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    // filter out the note with the id that was passed in the url
    const newDb = db.filter((note) => note.id !== req.params.id);
    // write the new db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
    // send the new db.json file back to the client
    res.json(newDb);
});

// host local port and deploy to heroku
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});