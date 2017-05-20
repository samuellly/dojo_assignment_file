var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

module.exports = {
    index: function(req,res){
        Friend.find({}, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.json(results);
            }
        });
    },
    create: function(req,res){
        Friend.create(req.body, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
    },
    update: function(req, res){
        Friend.findByIdAndUpdate(req.params.id, req.body ,function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
    },
    delete: function(req,res){
    Friend.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({message: 'Friend destroyed!'});
        }
    });
    },
    show: function(req,res){
    Friend.findById(req.params.id, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
    }
};
