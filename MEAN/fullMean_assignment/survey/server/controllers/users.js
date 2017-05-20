var mongoose = require("mongoose");
var User = mongoose.model('User');

module.exports = {

  create: function(req,res) {
    User.findOne({name: req.body.name},function(err,user) {
      if (user == null) {
        var newUser = new User(req.body);
        newUser.save(function(err) {
          if(err) {console.log(err);}
          else {res.json(newUser);}
        })
      } else {
        res.json(user);
      }
    })
  }





}
