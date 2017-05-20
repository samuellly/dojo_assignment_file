var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {
    index: function(req, res) {
        User.find({}, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.json(results);
            }
        });
    },

    register: function(req, res) {
        var user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.pword1,
            birthday: req.body.birthday,
        });
        user.save(function(err, newuser) {
            if (err) {
                var errorlist = [];
                for (var key in err.errors) {
                    if (errorlist.indexOf(err.errors[key].message) < 0) {
                        errorlist.push(err.errors[key].message);
                    }
                }
                var errors = {errors: errorlist};
                res.json(errors);
            } else {
                res.json({_id: newuser._id});
            }
        });
    },

    login: function(req, res) {
        User.findOne({email: req.body.email_l
        }, function(err, data) {
            if (err) {
                res.json({errors: 'E-mail/Password invalid!'});
            } else if (data && data.validPassword(req.body.password_l)) {
                res.json({_id: data._id});
            } else {
                res.json({errors: 'E-mail/Password invalid!'});
            }
        });
    }
};
