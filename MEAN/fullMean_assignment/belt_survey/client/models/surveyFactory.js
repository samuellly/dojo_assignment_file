angular.module('app')
.factory('surveyFactory', ['$http', '$q', 'userFactory', function($http, $q, userFactory) {

	var surveys = [];

	function surveyFactory(){
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

////////// Initialize Surveys in Factory
		this.index = function(){
			let q = httpP($http.get('/surveys/index'))

			q.then(
				ret=>{
					surveys = ret.data;
					return ret;
				}
			)
			return q
		};

////////// Create Survey
		this.create = function(survey){
			let q = httpP($http.post('/surveys/create', survey))
			q.then(
				ret=>{
					surveys =[];
					return ret;
				},
				err=>err
			)
			return q;
		} 

////////// Get a Survey
		this.getSurvey = function(idx){
			function findSurvey(survey){
				return survey._id == idx.id;
			}
			if(surveys.length == 0){
				return this.index()
				.then(
					res=>surveys.data.find(findSurvey)
				)
			}else{
				return $q((res, rej)=>{
					res(surveys.data.find(findSurvey))
				})
			}
		};

/////////// Vote
		this.vote = function(option, survey){
			return httpP($http.post('/surveys/vote/' + survey.id, option))
			.then(ret=>{
				surveys = [];
				return ret;
			})
		}

////////// Destroy
		this.delete = function(id){
			let q = httpP($http.post('/surveys/delete/' + id))
			q.then(
				res=>self.index(),
				err=>err
			)
			return q; 
		};
	}
	return new surveyFactory();
}]);