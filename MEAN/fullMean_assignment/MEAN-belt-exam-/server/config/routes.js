var questionsController = require('../controllers/questions.js')
var answersController = require('../controllers/answers.js')

module.exports = function(app){
	app.get('/questions', function(req, res) {
		questionsController.index(req, res);
	})
	app.post('/questions', function(req, res) {
		questionsController.create(req, res);
	})
	app.get('/questions/:id', function(req, res) {
		questionsController.show(req, res);
	})

	// app.get('/answers', function(req, res) {
	// 	answersController.index(req, res);
	// })
	app.post('/answers', function(req, res) {
		answersController.create(req, res);
	})
	app.get('/answers/:id', function(req, res) {
		answersController.like(req, res);
	})
}
