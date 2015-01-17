var port = 1337;
var express = require('./config/express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.listen(process.env.PORT || port);
module.exports = app;
console.log('Server running at http://localhost:' + port);
