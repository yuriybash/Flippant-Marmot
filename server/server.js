var express = require('express')
var app = express();
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/socialstocks');

require('./config/middleware.js')(app, express);

module.exports = app;
