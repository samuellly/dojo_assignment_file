app.factory('loginFactory', function($http) {
    var factory = {};

    factory.index = function(callback) {
        $http.get('/users')
        .then(callback);
    };

    factory.login = function(data, callback) {
        $http.post('/login', data)
        .then(callback);
    };

    factory.register = function(data, callback) {
        $http.post('/register', data)
        .then(callback);
    };

    return factory;
});
