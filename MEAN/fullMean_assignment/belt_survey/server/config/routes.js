var users	 	= require('../controllers/users.js'),
	surveys		= require('../controllers/surveys.js');

module.exports = function(app){
	app.get('/users/index', users.index);
	app.post('/users/create', users.create);
	app.post('/users/login', users.login);

	app.get('/surveys/index', surveys.index);
	app.post('/surveys/create', surveys.create);
	app.post('/surveys/delete/:id', surveys.delete);
	app.post('/surveys/vote/:id', surveys.vote);

}