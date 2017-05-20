var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var fs = require('fs');

module.exports = {
	create: function(req, res){
      var user = new User(req.body);
      user.save(function(err, context) {
	    if(err) {
	      console.log('Error with registering new user');
        console.log(err)
        return res.json(err)
	    } else {
	      console.log('successfully registered a new user!');
        console.log(context)
        return res.json(context)
	    }
  	})
  },
  login: function(req, res) {
    console.log(req.body.emailLogin)
    User.find({ email: req.body.emailLogin}, function(err, context) {
      if(context[0]) {
        console.log('success finding email')
        if(context[0].validPassword(req.body.passwordLogin)) {
          return res.json({_id:context[0]._id})
        } else {
          console.log("wrong password")
          return res.json({IncorrectPassword: 'Incorrect Password'})
        }
      }
      else {
        console.log("no email found")
        return res.json({noEmail: "No such email in database"})
      }
    })
  },
  getQuestions: function (req, res) {
    Question.find({}, null, {sort: 'created_at'}).populate('_user').exec( function(err, context) {
      if(context[0]) {
        for(item in context) {
          context[item].answerCounter();
        }
        console.log('success getting question')
        return res.json(context)
      }
      else {
        console.log('no Questions yet')
        return res.json(context)
      }
    })
  },
  newQuestion: function (req, res) {
    User.findOne({_id : req.body.id}, function(err, user) {
      var question = new Question(req.body)
      question._user = req.body.id;
      question.answerCounter()
      question.save(function(err) {
        console.log(err)
        if(err) {
          console.log('question not saved')
          return res.json(err)
        } else {
          console.log('question saved')
          // return res.json({he:"hi"})
          user.questions.push(question)
          user.save(function(err) {
            if(err) {
              console.log(err)
              console.log('Error with saving user after saving question')
            } else {
              console.log('user saved after saving question')
              return res.json({he:"hi"})
            }
          })
        }
      })
    })
  },
  getOneQuestion: function (req, res) {
    Question.findOne({_id: req.params.id}, null, {sort: 'created_at'}).populate('_user').populate({path: 'answers', options: {sort:{'numberLikes': -1 }}, populate: [{ path: '_user'}] }).exec( function(err, context) {
      if(context) {
        console.log('success getting one question')
        return res.json(context)
      }
      else {
        console.log('no one Question yet')
        return res.json(context)
      }
    })
  },
    newAnswer: function (req, res) {
    console.log(req.body)
    User.findOne({_id : req.body.userId}, function(err, user) {    
      Question.findOne({_id : req.body.questionId}, function(err, question) {  
      var answer = new Answer({answer: req.body.answer, description: req.body.description})
      answer._user = req.body.userId;
      answer._question= req.body.questionId;
      answer.save(function(err) {
        if(err) {
          console.log('answer not saved')
          return res.json(err)
        } else {
          console.log('answer saved')
          user.answers.push(answer)
          question.answers.push(answer)
          user.save(function(err) {
            if(err) {
              console.log(err)
              console.log('Error with saving user after saving answer')
            } else {
              console.log('user saved after saving answer')
              // return res.json({he:"hi"})
            }
          })
          question.save(function(err) {
            if(err) {
              console.log(err)
              console.log('Error with saving question after saving answer')
            } else {
              console.log('question saved after saving answer')
              return res.json({he:"hi"})
            }
          })
        }
      })
    })
    })
  },
    like: function(req, res) {
    Answer.findOne({_id: req.body.answerId}, function(err, answer){
      if(!err) {
        answer.like(req.body.userId);
        console.log("successful like")
        return res.json(answer)
      }
    })
  },
};