myApp.factory('answerFactory', function($http){
	var factory = {};

	factory.create = function(questionId, info, callback){
		console.log(info)
		$http.post('/answers', info).then(function(data){
				callback(data.data);
		})
	}
	
	factory.like = function(answerId, callback) {
		$http.get('/answers/'+answerId). then(function(data) {
			callback(data);
		})
	}

	return factory;
})
