var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var path = require('path')

var userSchema = new mongoose.Schema({
  firstName : {
  	type: String,
  	required: [true, 'First name is required'],
  	minlength: [2, 'First name must be at least 2 characters'],
  	trim: true
  },
  lastName : {
  	type: String,
  	required: [true, 'Last name is required'],
  	minlength: [2, 'Last name must be at least 2 characters'],
  	trim: true
  },
  email : {
  	type: String,
  	validate: {
  		validator: function(email) {
  		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  		return emailRegex.test(email)
  		},
  		message: 'Not a valid email'
  	},
	required: [true, "Email is required"],
	unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function( value ) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      },
      message: "Password failed validation, you must have at least 1 number, uppercase and special character"
    }
  },
  birthday: {
  	type: Date,
  	required: [true, 'Birthday is required']
  },
  created_at: { type : Date, default: Date.now },
  questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
 });

userSchema.methods.generateHash = function(password) {
	if(password.length > 32) {
		return password
	} else {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	}
}
userSchema.pre('save', function(done) {
	this.password = this.generateHash(this.password);
	done();
})
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', userSchema);

var questionSchema = new mongoose.Schema({
  question: { type: String, required: [true, "Question is required"], minlength: [10, 'Question must be at least 10 characters'] },
  description: { type: String},
  created_at: { type : Date, default: Date.now },
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  answerCount: {type: Number}
  });

questionSchema.methods.answerCounter = function() {
  this.answerCount = this.answers.length
  return this.answers.length
}
mongoose.model('Question', questionSchema);

var answerSchema = new mongoose.Schema({
  answer: { type: String, required: [true, "Text is required"], minlength: [5, 'Answer must be at least 5 characters'] },
  description: { type: String},
  created_at: { type : Date, default: Date.now },
  likes: [],
  numberLikes : {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _question: {type: Schema.Types.ObjectId, ref: 'Topic'},
  });
answerSchema.methods.like = function(userId) {
  var exist = false;
  if(exist == false) { this.likes.push(userId) }
  this.numberLikes = this.likes.length;
  this.save()
}
mongoose.model('Answer', answerSchema);

