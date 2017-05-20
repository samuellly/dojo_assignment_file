angular.module('app')
.factory('userFactory', ['$http', '$q', function($http, $q) {

	var users = [];
	var current_user = {};

	function userFactory(){
		var self = this;

////////// httpPromise
		function httpP(req){
			let q = $q.defer();
			req.then(
				res=>(res.data.errors)?q.reject(res):q.resolve(res),
				err=>q.reject(err)
			);
			return q.promise;
		}

////////// Login
		this.login = function(user){
			return httpP($http.post('/users/login', user))
			.then(
				res=>{
					current_user = res.data.data;
					return res;
				},
				err=>err
			)
		};

////////// Initialize Users in Factory
		this.index = function(){
			return httpPromise($http.get('/users/index'))
			.then(
				res=>{
					users = res.data;
					return res;
				},
				err=>err
			)
		};

////////// Logout
		this.logout = user=>{
			current_user = {};
		};		

////////// Get Current User
		this.getCurrentUser = ()=>current_user;
	}
	return new userFactory();
}]);