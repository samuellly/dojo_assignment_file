console.log('**********friends controller***********');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
Friend = mongoose.model('Friend')


function FriendsController(){
  this.index = function(req,res){
      Friend.find({}, function(err, friends){
        if(err){
          console.log(err)
        } else{
          res.json(friends);
        }
      })

  };
  this.create = function(req,res){
    var friend = new Friend(req.body)
    friend.save(function(err){
      if(err){
        console.log(err)
      } else{
        res.json(friend);
      }
    })
  };
  this.update = function(req,res){
    //your code here
    res.json({placeholder:'update'});
  };
  this.delete = function(req,res){
    console.log(req.params)
    Friend.remove({_id:req.params.id}, function(err){
      if(err){
        console.log(err)
      }
      else{
        Friend.find({}, function(err, friends){
        if(err){
          console.log(err)
        } else{
          res.json(friends);
        }
      });
      }
    })
  };
  this.show = function(req,res){
    //your code here
    res.json({placeholder:'show'});
  };
}
module.exports = new FriendsController();
