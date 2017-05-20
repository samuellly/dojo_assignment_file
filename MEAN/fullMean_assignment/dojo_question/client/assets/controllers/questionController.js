myApp.controller('questionController', ['$scope', 'beltFactory', '$location', '$routeParams','$cookies', function ($scope, beltFactory, $location, $routeParams, $cookies){
  
if(!$cookies.get('loginId')) {
    $location.url('/');
  }

  $scope.$watch('check', function(newValue, oldValue) {
     beltFactory.getOneQuestion($routeParams.id, function(data){
      $scope.question = data.data
    })
  })

  $scope.addQuestion = function() {
    $scope.questionError = true;
    $scope.newquestion.id = $cookies.get('loginId')
    $scope.TError = true
    beltFactory.addQuestion($scope.newquestion, function(data) {
      $scope.check = data;
      if(!data.data.message) {
        $location.url('/success')
      }
      else if(data.data.message) {
        $scope.questionError = false;
        $scope.QE = data.data.errors.question.message;
      }
    }); 
  }
  $scope.Answer = function() {
    $scope.answerError = true;
    $scope.answer.userId = $cookies.get('loginId')
    $scope.answer.questionId = $routeParams.id
     beltFactory.answer($scope.answer, function(data) {
      $scope.check = data
      console.log(data.data)
      if(!data.data.message) {
        $location.url('/success')
      }
      else if(data.data.message) {
        $scope.answerError = false;
        $scope.AE = data.data.errors.answer.message;
      }
     })
  }
  $scope.like = function (answerId) {
    $scope.likes = {};
    $scope.likes.userId = $cookies.get('loginId')
    $scope.likes.answerId = answerId
    beltFactory.like($scope.likes, function(data) {
      $scope.check = data
    });
  }


  
}])