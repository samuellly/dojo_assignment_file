survey_app.factory('userFactory', function($http) {
    var factory = {};
    var user = [];
    factory.addUser = function(newUser, callback) {
        $http.post('/users', newUser).success(function(res) {
            factory.user = res;
            callback(user);

        })
    }
    return factory;
})
survey_app.factory('surveyFactory', function($http) {
    var factory = {};
    var surveys = [];
    var currentSurveyID = "";
    factory.addSurvey = function(newSurvey, callback) {
        $http.post('/surveys', newSurvey).success(function(res) {
            factory.surveys = res;
            callback(res);
        })

    }

    factory.getSurvey = function(callback) {
        $http.get('/surveys').success(function(res) {
            factory.surveys = res;
            callback(factory.surveys);
        })
    }

    factory.showSurvey = function(index, callback) {
        var id = factory.surveys[index]._id;
        factory.currentSurveyID = id;

        $http.get('/surveys/' + id).success(function(res) {
            callback(res);

        })
    }
    factory.addVote = function(votes) {
        $http.put('/surveys/' + factory.currentSurveyID, votes).success(function(res) {
            factory.surveys = res;

        })

    }

    factory.deleteSurvey = function(index, callback) {
        var id = factory.surveys[index]._id;
        $http.delete('/surveys/' + id).success(function(res) {
            factory.surveys = res;
            callback(res);
        })
    }
    return factory;
})
