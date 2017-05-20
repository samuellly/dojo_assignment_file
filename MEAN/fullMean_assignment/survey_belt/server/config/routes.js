console.log('routes')
var users = require('../controllers/users.js');
module.exports = function(app){

	app.post('/create_user', users.createUser);
	app.post('/createpoll', users.createPoll);
	app.get('/getpolls', users.getpolls);
	app.get('/getpoll/:id', users.getpoll);
	app.get('/deletepoll/:id', users.deletepoll);
	app.post('/vote/:id', users.vote);
	
}