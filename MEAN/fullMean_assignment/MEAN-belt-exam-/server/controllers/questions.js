var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = (function() {
	return {
		index: function(req, res) {
			Question.find({}, function(err, questions) {
				if (err) {
					console.log(err)
				} else {
					res.json(questions)
				}
			})
		},
		create: function(req, res) {
			console.log("Creating new question:")
			// console.log(req.body)
			var newQuestion = new Question(req.body);
			// console.log(newQuestion);
			console.log(newQuestion);
			newQuestion.save(function(err) {
				if (err) {
					console.log(err);
					res.json(err);
				} else {
					console.log(newQuestion);
					res.json(newQuestion);
				}
			})
		},
		show: function(req, res) {
			console.log(req.params.id)
			Question.findById(req.params.id)
			.populate('_answers')
			.exec(function(err, question) {
				if (err) {
					console.log(err)
				} else {
					console.log(question)
					res.json(question)
				}
			})
		}
	}
})();
