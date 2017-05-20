var mongoose = require('mongoose'),

SurveySchema = new mongoose.Schema({

	user: {
		type: Object,
	},
	question: {
		type: String,
		required: [true, "A survey question is required."],
		minlength: [8, "Question must be at least 8 characters."],
	},
	option1: {
		content: {
			type: String,
			minlength: [3, "Option 1 must be at least 3 characters."],
		},
		votes: {
			type: Number,
			default: 0,
		}
	},
	option2: {
		content: {
			type: String,
			minlength: [3, "Option 2 must be at least 3 characters."],
		},
		votes: {
			type: Number,
			default: 0,
		}
	},
	option3: {
		content: {
			type: String,
			minlength: [3, "Option 3 must be at least 3 characters."],
		},
		votes: {
			type: Number,
			default: 0,
		}
	},
	option4: {
		content: {
			type: String,
			minlength: [3, "Option 4 must be at least 3 characters."],
		},
		votes: {
			type: Number,
			default: 0,
		}
	},

}, {timestamps: {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
	}
})


function checkLength(value){
	return value.content.length < 3; 
}

Surveys = mongoose.model('Surveys', SurveySchema);









