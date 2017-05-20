// REQUIRE, CREATE EXPRESS
var path = require('path');
var io = require('socket.io');
var express = require('express');
var app = express();

// SET VIEW, GET: route to render view
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	res.render('index');
});

// USE: CSS
app.use(express.static(path.join(__dirname, './static')));

// store app.listen
var server = app.listen(8000, function() {
	console.log('listening on port 8000');
});

// SOCKETS: listen
io = io.listen(server);

// connection (event is built-in)
io.sockets.on('connection', function (socket) {
	console.log('Socket ID: ' + socket.id);

	socket.on('posting_form', function (formData) {
		// Data received from client
		console.log('Form data: ' + formData);

		// Create object from serialized form data
		var formObject = {};
		for (var i = 0; i < formData.length; i++) {
			formObject[formData[i].name] = formData[i].value;
		}

		// Transform object to JSON string
		jsonObject = JSON.stringify(formObject, null, 4);

		// Create random number
		var rand = Math.floor((Math.random() * 1000) + 1);

		// Emit to client
		socket.emit('random_number', rand);
		socket.emit('updated_message', jsonObject);
		
	});
});