const express = require('express');
const app = express();
const router = require('./router/main')(app);


var server = app.listen(80);
