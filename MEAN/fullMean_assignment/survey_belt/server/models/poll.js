var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PollSchema = new mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
    question: {
        type: String,
        required: [true, "Question cannot be left empty"],
        trim: true,
        minlength: [8, " Question must be atleast 8 letters long"]
    },

    option1: {
    	type:String,
        required: [true, "Option 1 cannot be left empty"],
        minlength: [3, " Option 1 must be atleast 3 letters long"]
    },

     option2: {
     	type:String,
        required: [true, "Option 2 cannot be left empty"],
        minlength: [3, " Option 2 must be atleast 3 letters long"]
    },

     option3: {
     	type:String,
        required: [true, "Option 3 cannot be left empty"],
        minlength: [3, " Option 3 must be atleast 3 letters long"]
    },

     option4: {
     	type:String,
        required: [true, "Option 4 cannot be left empty"],
        minlength: [3, " Option 4 must be atleast 3 letters long"]
    },
    value1: {
		type:Number
	},
	value2: {
		type:Number
	},
	value3: {
		type:Number
	},
	value4: {
		type:Number
	}

 }, { timestamps: true })


var Poll = mongoose.model('Poll', PollSchema)