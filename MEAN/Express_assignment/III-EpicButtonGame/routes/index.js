module.exports = function Route(app, server) {

	// REQUIRE: Socket
	var io = require('socket.io').listen(server);

	// GET
	app.get('/', function(req, res) {
		res.render('index');
	});

	// SOCKET: listen
	var counter = 0;
	io.sockets.on('connection', function(socket) {
		socket.on('buttonClicked', function() {
			counter++;
			io.emit('countIncreased', counter);
		});
		socket.on('resetClicked', function() {
			counter = 0;
			io.emit('countReset', counter);
		});
	});
}