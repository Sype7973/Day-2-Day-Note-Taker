const express = require('express');

// import modular routes
const notesRouter = require('./notes');
// create variable to use express router
const app = express();
// create notes.js router
// this is used to create a modular route
app.use('/notes', notesRouter);

module.exports = app;