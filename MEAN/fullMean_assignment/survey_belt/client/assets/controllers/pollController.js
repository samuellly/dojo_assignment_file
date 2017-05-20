app.controller('pollController', ['$scope', '$location', 'userFactory', '$cookies','$routeParams',function($scope, $location, userFactory, $cookies,$routeParams) {
	$scope.newUser = {};
	$scope.errors = false;
	$scope.messages = [];
	$scope.poll = {};


	if($cookies.getObject('newUser')){
		$scope.newUser = $cookies.getObject('newUser')
	}
	else{
		$location.url('/')
	}

	$scope.createPoll = function(){
		$scope.newPoll.userid = $scope.newUser._id
		userFactory.createPoll($scope.newPoll,function(data){
			$scope.messages =[]
			if(data.errors){
				$scope.errors = true;
				for (err in data.errors){
					console.log(data.errors[err].message)
					$scope.messages.push(data.errors[err].message)
				}
			}
			else{
				$location.url('/wall')
			}
		})
	}

$scope.getpoll = function(){
	console.log("@getpoll-pollController")
		userFactory.getpoll($routeParams.id,function(data){
			console.log(data)
		    })
			$scope.poll = data
		
	}
	


	


}])