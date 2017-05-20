myApp.controller('dashboardController', ['$scope', 'beltFactory', '$location', '$routeParams','$cookies', function ($scope, beltFactory, $location, $routeParams, $cookies){

if(!$cookies.get('loginId')) {
    $location.url('/');
  }


  $scope.$watch('check', function(newValue, oldValue) {
     beltFactory.getQuestions(function(data){
      $scope.questions = data.data
    })
  })

  $scope.addTopic = function() {
  	$scope.topic.id = $cookies.get('loginId')
    $scope.TError = true
    beltFactory.addTopic($scope.topic, function(data) {
      $scope.check = data;
      // if(data.data.errors.name) {
      //           $scope.ACError = false
      //           $scope.customerError = data.data.errors.name.message
      //         }
    });
  }


}])
