const express = require('express');

// import modular routes
const notesRouter = require('./notes');
// create variable to use express router
const app = express();
// create notes.js router
app.use('/notes', notesRouter);

module.exports = app;