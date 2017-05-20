// REQUIRE
var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");

// CREATE
var app = express();

// SET
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// GET: route to render view
app.get('/', function(req, res) {
	res.render("index");
});

// USE
app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
app.use(bodyParser.urlencoded({ extended: true }));

// POST: retrieve input, render data to view
app.post('/result', function(req, res) {
	res.render('result', {result: req.body});
});

// REDIRECT: back to root
app.post('/', function(req, res) {
	res.redirect('/');
});

// LISTEN: on port
app.listen(8000, function() {
	console.log("listening on port 8000");
});