var mongoose = require('mongoose')
var User = mongoose.model('User')
var Poll = mongoose.model('Poll')

console.log("I am at the users Controller-Backend")

function UsersController() {
    this.createUser = function(req, res) {
        User.findOne({ name: req.body.name }, function(err, user) {
            if (err) {
                res.json(err)
            } else {
                if (user == null) {
                    var newuser = User({ name: req.body.name })
                    newuser.save(function(newerr) {
                        if (newerr) {
                            res.json(newerr)
                        } else {
                            res.json(newuser)
                        }
                    })
                } else { res.json(user) }
            }


        })
    }

    this.createPoll = function(req, res) {
        console.log(req.body)
        var poll = Poll({ _user: req.body.userid, question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, value1: 0, value2: 0, value3: 0, value4: 0 })
        poll.save(function(err) {
            if (err) {
                res.json(err)
            } else {
                User.findOne({ _id: req.body.userid }, function(err, user) {
                    if (err) {
                        res.json(err)
                    } else {
                        user._polls.push(poll)
                        user.save(function(err) {
                            if (err) {
                                res.json(err)
                            } else {
                                res.send()
                            }
                        })
                    }
                })
            }
        })
    }

    this.getpolls = function(req, res) {
        Poll.find({}).populate('_user').exec(function(err, polls) {
            if (err) {
                res.json(err)
            } else {
                res.json(polls)
            }
        })
    }
    this.getpoll = function(req, res) {
    	console.log("I am here too")
        Poll.findOne({ _id: req.params.id }, function(err, poll) {
            if (err) {
                res.json(err)
            } else {
                res.json(poll)
            }
        })
    }

    this.deletepoll = function(req,res){
    	Poll.remove({_id:req.params.id}, function(err,poll) {
    		if(err){
				res.json(err)
			}
			else{
				res.send()
			}

    	})
    }

    this.vote = function(req,res){
		Poll.findOne({_id: req.params.id}, function(err, poll){
			if(err){
				res.json(err)
			}
			else{
				if(req.body.option==1){
					poll.value1++
				}
				else if(req.body.option == 2){
					poll.value2++
				}
				else if(req.body.option == 3){
					poll.value3++
				}
				else if(req.body.option == 4){
					poll.value4++
				}
				poll.save(function(err){
					if(err){
						res.json(err)
					}
					else{
						res.send()
					}
				})
			}
		})
	}
}


module.exports = new UsersController();
