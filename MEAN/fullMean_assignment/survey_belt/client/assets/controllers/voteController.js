app.controller('voteController', ['$scope', '$location', 'userFactory', '$cookies','$routeParams',function($scope, $location, userFactory, $cookies,$routeParams) {
	$scope.newUser = {};
	$scope.poll = {};
	$scope.voteoption = {};

	if($cookies.getObject('newUser')){
		$scope.newUser = $cookies.getObject('newUser')
	}
	else{
		$location.url('/')
	}
	$scope.getpoll = function(){
		userFactory.getpoll($routeParams.id,function(data){
			if(data.name == "CastError"){
				$location.url('/wall')
			}
			$scope.poll = data
		})
	}

		$scope.vote = function(option){
		$scope.voteoption.option = option;
		userFactory.vote($routeParams.id,$scope.voteoption, function(){
			$scope.voteoption ={};
			$scope.getpoll()
		})
	}
	$scope.getpoll()

}])