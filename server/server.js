var express = require('express')
var app = express();
var mongoose = require('mongoose')

mongoose.connect('mongodb://heroku_app36669420:ou53l12n7t6r8h9144oqrokpgu@ds061208.mongolab.com:61208/heroku_app36669420');

require('./config/middleware.js')(app, express);

module.exports = app;
