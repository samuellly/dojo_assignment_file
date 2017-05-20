var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    validateEmail = function(value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
    UserSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: [true, 'All fields required!'],
        },
        last_name: {
            type: String,
            required: [true, 'All fields required!'],
        },
        email: {
            type: String,
            required: [true, 'All fields required!'],
            unique: true,
            validate: [validateEmail, "Please enter a valid e-mail"]
        },
        password: {
            type: String,
            required: [true, 'All fields required!'],
            minlength: 8,
            maxlength: 32,
            validate: {
                validator: function(value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
                },
                message: "You must have at least 1 number, uppercase and special character"
            },
        },
        birthday: {
            type: Date,
            required: [true, 'All fields required!'],
        }

    }, {timestamps: true});

    UserSchema.methods.hashPassword = function(input) {
        return bcrypt.hashSync(input, bcrypt.genSaltSync(8));
    };

    UserSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    UserSchema.pre('save', function(done) {
        this.password = this.hashPassword(this.password);
        done();
    });

    mongoose.model('User', UserSchema);
