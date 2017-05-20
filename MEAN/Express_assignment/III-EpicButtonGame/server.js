// REQUIRE
var path = require('path');
var express = require('express');

// CREATE
var app = express();

// SET VIEW
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// USE
app.use(express.static(path.join(__dirname, './static')));

// LISTEN
var server = app.listen(8000, function() {
	console.log('Listening on port 8000');
});

// ROUTE
var route = require('./routes/index.js')(app, server);