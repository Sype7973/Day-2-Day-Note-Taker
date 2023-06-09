// import express router
// import fs
// import uniqid
const fs = require('fs');
const uniqid = require('uniqid');
const Notes = require('express').Router();


// get request to /api/notes should read the db.json file and return all saves notes as JSON
Notes.get('/' , (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
// unique id should be assigned to each note when it is saved
// uniqid npm package can be used to assign unique id when note is saved
// post request to /api/notes should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client
Notes.post('/', (req, res) => {
    const newNote = req.body;
    console.log("****************")
    console.log(req.body);
    newNote.id = uniqid();
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// delete request to /api/notes/:id should recieve a query parameter containing the id of a note to delete
// in order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file
Notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});
module.exports = Notes;

