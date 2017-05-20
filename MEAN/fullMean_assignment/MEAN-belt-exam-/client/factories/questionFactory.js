myApp.factory('questionFactory', function($http){
	var questions = []
	var factory = {}

	factory.index = function(callback){
		$http.get('/questions').then(function(data){
			questions = data.data;
			callback(questions);
		});
	}

	factory.create = function(info, callback){
		$http.post('/questions', info).then(function(data){
			// console.log(data)
			if(data.data.errors){
				callback(data.data)
			} else {
				questions.push(data.data)
				callback(data.data);
			}
		})
	}

	factory.show = function (id, callback) {
		$http.get('/questions/' + id).then(function (data) {
			callback(data.data);
		})
	}

	return factory;
})
