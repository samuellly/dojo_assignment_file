myApp.controller('loginController', function($scope, $location, userFactory){
  $scope.user = '';
  $scope.login = function() {
    console.log("logging in")
    userFactory.login($scope.user, function callback () {
      $location.url('/')
    })
  }
})
