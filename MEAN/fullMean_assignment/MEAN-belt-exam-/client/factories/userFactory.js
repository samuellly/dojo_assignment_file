myApp.factory('userFactory', function($http){

	// This is my dummyFactory. I usually add this into any project that
	// I do. Just so that I can use it for reference as I add new Factories
	// below we have an example of how we would create a post request, as well
	// as how we would create a get request.


	var user

	var factory = {};

  factory.login = function(username, callback) {
    user = username;
		factory.user = user
    callback(factory.user);
  }

	return factory;
})
