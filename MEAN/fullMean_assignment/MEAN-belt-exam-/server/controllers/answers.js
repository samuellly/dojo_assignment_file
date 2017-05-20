var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');

module.exports = (function() {
	return {
		create: function(req, res) {
			console.log("finding question...")
			Question.findById(req.body._questionId, function (err, question) {
				if (err) {
					console.log(err);
				} else {
					console.log(question)
					console.log("Creating new answer:")
					// console.log(req.body)
					var newAnswer = new Answer({
						author: req.body.author,
						text: req.body.text,
						description: req.body.description,
						likes: 0
					});
					console.log(newAnswer);
					newAnswer.save(function(err) {
						if (err) {
							console.log(err);
							res.json(err);
						} else {
							question._answers.push(newAnswer)
							question.save(function(err) {
								if (err) {
									console.log(err)
								} else {
									console.log(question)
									console.log(newAnswer);
									res.json(newAnswer);
								}
							})

						}
					})
				}
			})
		},
		like: function(req, res) {
			console.log(req.params.id)
			Answer.findById(req.params.id, function(err, answer) {
				if (err) {
					console.log(err)
				} else {
					answer.likes++
					answer.save(function(err) {
						if (err) {
							console.log(err)
						} else {
							res.json(answer.likes)
						}
					})
				}
			})
		}
	}
})();
