const express = require('express');
const app = express();
const user = require('./omni-client-router');

app.use('/omniclient', user);

module.exports = app;
