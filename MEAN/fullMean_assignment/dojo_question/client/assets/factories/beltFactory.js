myApp.factory('beltFactory', ['$filter', '$http', '$location', function ( $filter, $http, $location){

    var factory = {};

    factory.addUser = function(newUser, callback) {
      $http.post('/user', newUser).then(function(data){
        console.log("data sent back")
        if(data.data.errors || data.data.errmsg || data.data.firstName) {
          console.log(data)
          callback(data);
        }
      })
    }
    factory.login = function(user, callback) {
      $http.post('/login', user).then(function(data){
        console.log("login data back")
        if(data.data.noEmail || data.data.IncorrectPassword) {
          callback(data);
        }
        else if (data.data._id) {
          callback(data)
        }
      })
    }
    factory.getQuestions = function(callback) {
      $http.get('/getQuestions').then(function(data) {
        console.log('got questions')
        callback(data);
      })
    }
    factory.addQuestion = function(newQuestion, callback) {
      $http.post('/newQuestion', newQuestion).then(function(data){
        console.log("question added")
        callback(data);
      })
    }
    factory.getOneQuestion = function(questionId, callback) {
      $http.get('/getOneQuestion/' + questionId).then(function(data) {
        console.log('got one question')
        callback(data);
      })
    }
    factory.answer = function(newanswer, callback) {
      $http.post('/newAnswer', newanswer).then(function(data) {
        console.log('answer successful')
        callback(data)
      })
    }
    factory.like = function(info, callback) {
      $http.post('/like', info).then(function(data) {
        console.log('Like successful')
        callback(data)
      })
    }



    return factory;
    }]);
