app.factory('userFactory', ['$http', function($http) {
    function userFactory() {
        this.createUser = function(user, callback) {
        	console.log("I am in factory"+user)
            $http.post('/create_user', user).then(function(r_data) {
                callback(r_data.data)
            })
        }

        this.createPoll = function(newPoll, callback){
			$http.post('/createpoll', newPoll).then(function(r_data){

				callback(r_data.data);
			})
		}

		this.getpolls = function(callback){
			$http.get('/getpolls').then(function(r_data){
				console.log(r_data)
				callback(r_data.data)
			})
		}
		this.getpoll = function(id,callback){
			console.log("I am here")
			$http.get('/getpoll/'+id).then(function(r_data){
			callback(r_data.data)
			})
		}
		this.vote = function(id,option,callback){
			$http.post('/vote/'+id, option).then(function(){
				callback()
			})
		}

		this.deletepoll = function(id, callback){
			$http.get('/deletepoll/'+id).then(function(){
				callback()
			})
		}
    }

    return new userFactory();
}])
