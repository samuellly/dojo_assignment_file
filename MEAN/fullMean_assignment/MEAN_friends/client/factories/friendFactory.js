app.factory('friendFactory', ['$http', function($http) {
    var factory = {};
    var friends = [];
    factory.create = function(friend, callback) {
        $http.post('/friends', friend)
        .then(function(result) {
            callback(result.data);
        });
    };

    factory.index = function(callback) {
        $http.get('/friends')
        .then(function(results) {
            friends = results.data;
            callback(friends);
        });
    };

    factory.show = function(id, callback) {
        $http.get('/friends/' + id)
        .then(function(result) {
            callback(result.data);
        });
    };

    factory.delete = function(id, callback) {
        $http.delete('/friends/' + id)
        .then(function() {
            console.log('deleted!');
        });
    };

    factory.update = function(id, data) {
        $http.put('/friends/' + id, data)
        .then(function(result) {
        });
    };

    return factory;
}]);
