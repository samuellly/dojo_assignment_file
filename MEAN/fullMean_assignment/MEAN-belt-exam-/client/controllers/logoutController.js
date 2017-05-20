myApp.controller('logoutController', function($scope, $location, userFactory){
  console.log("Logging out")
  userFactory.login(undefined, function callback () {
    $location.url('/login')
  })
})
