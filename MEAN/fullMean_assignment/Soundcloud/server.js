/* globals module, __dirname, console */

var mongoose = module.require('mongoose');
var express = module.require('express');
var app = express();
var bodyParser = module.require('body-parser');
var morgan = module.require('morgan');
var database = module.require('./config/database');

//Connect to Database
//mongoose.connect(database.url);

//App settings
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(bodyParser());

//Listening to new connection
app.listen(8080);
console.log('Listening to 8080 connections...');