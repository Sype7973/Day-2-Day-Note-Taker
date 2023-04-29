const express = require('express');

// import modular routes
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;