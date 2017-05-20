var mongoose = require("mongoose");
var User = mongoose.model('User');
var Survey = mongoose.model('Survey');

module.exports = {
  index: function(req,res) {
    Survey.find({})
    .populate('_user')
    .exec(function(err,surveys) {
      res.json(surveys);
    })
  },
  show: function(req,res) {
    Survey.find({_id: req.params.id},function(err,survey) {
      if (err) {console.log(err);}
      else {res.json(survey);}
    })

  },
  update: function(req,res) {
    var _this = this;
    Survey.findOne({_id: req.params.id},function(err,survey){
      if (err) {console.log(err);}
      else {
        survey.votes = req.body;
        survey.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            _this.index(req,res);
          }

        })
      }
    })
  },
  delete: function(req,res) {
    var _this = this;
    Survey.findOne({_id:req.params.id})
    .remove({},function(err) {
      if (err) {console.log(err);}
      else {
        _this.index(req,res);
      }
    })
  },
  create: function(req,res) {
    var _this = this;
    User.findOne({name: req.body.user},function(err,user) {
      var newOptions = [req.body.survey.optionOne,req.body.survey.optionTwo,req.body.survey.optionThree,
      req.body.survey.optionFour];
      var newSurvey = new Survey({question:req.body.survey.question});
      newSurvey._user = user._id;
      newSurvey.options = newOptions;
      newSurvey.save(function(err) {
        if (err) {

          if (err.errors) {
            console.log(err.errors);
            if (err.errors.question.kind == "minlength") {

              res.json({errors: "Question min length has to 8 characters"});
              return;
            }

          }
          if (err.errors) {
            console.log(err.errors);
            if (err.errors.question.kind == "miglength") {

              res.json({errors: "please typed least 3 characters for options"});
              return;
            }

          }
          if (err.message) {
            res.json({errors: err.message});
            return;
          }
        }
        else {
          user.save(function(err) {
            if (err) {
              console.log(err);
            }
            else {
              _this.index(req,res);
            }
          })
        }
      })


    })
  }



}
