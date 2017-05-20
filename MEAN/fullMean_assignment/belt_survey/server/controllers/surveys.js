require('../models/survey.js');
var mongoose 		= require('mongoose'),
	Surveys 		= mongoose.model('Surveys');


function surveysController(){
	this.index = function(req,res){
		return Surveys.find({}, function(err, result){
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	this.create = function(req,res){
		return Surveys.create(req.body, function(err, result){
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	
	this.delete = function(req,res){
		return Surveys.remove({"_id": req.params.id}, function(err, result){
			(err) ? res.json({errors: err}) : res.json({data: result});
		});
	};

	this.vote = function(req,res){
		return Surveys.findOne({"_id": req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			result[req.body.id].votes += 1;
			result.save();
			return res.json({data: result});
		});
	};
}

module.exports = new surveysController();