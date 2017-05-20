var mongoose = require ('mongoose');
var QuotingDojo = mongoose.model('QuotingDojo');

//this will be automatically instsantiated
// module.exports = {}

module.exports = (function() {
	errors_array = [];

return{

	get_quotes: function(req, res){
		QuotingDojo.find({}, function(err, quotes){
			res.render('index', {errors:errors_array});
		});
	},

	get_quotes_main: function(req, res){
		QuotingDojo.find({}, function(err, quotes){
			res.render('main', {quotes: quotes});
		});
	},

	add_quote: function(req, res){
		var a = new QuotingDojo(req.body);
		a.save(function(err, quotes){
			if(err){
				// res.send(err);
				for(var x in err.errors){
					errors_array.push(err.errors[x].message);
				}
				res.redirect('/');
			} else {
				res.redirect('/main');
			}
		})
	},

	delete_quote: function(req, res){
		QuotingDojo.remove({ _id: { _id: req.id } },  function(err, result){
			if(err){
				console.log('error');
				// console.log(err)
			}else{
				console.log(result);
				res.redirect('/main');
			}
		})
	},

	edit_quote: function(req, res){
		QuotingDojo.update(query, function(err, result){
			if(err){
				console.log(err)
			} else {
				console.log(result);
				res.redirect('/main');
			}
		})
	},

	add_like: function(req, res){
		query = { _id: req.id }

		QuotingDojo.update(query, { $inc: {'likes' : 1}}, function(err, result){
			if(err){
				res.send(err);
			} else {
				res.redirect('/main');
			}
		})

	}

}
})();
//automatically instsantiate