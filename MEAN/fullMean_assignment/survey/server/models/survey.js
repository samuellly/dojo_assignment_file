var mongoose = require("mongoose");
var SurveySchema = new mongoose.Schema({
	question: {type: String, minlength:8, required: true},
	created_at: {type:Date, default: Date.now},
	_user: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
	options: [{type:String,minglength:3}],
	votes: [Number]
})


SurveySchema.pre("save",function(next) {
	for (var i = 0; i < this.options.length; i++) {
		if (this.options[i] == null || this.options[i] == undefined) {
			console.log("yes");
			next(new Error('Options are not fully filled'));
			return;
		}
	}
	next();
})





var Survey = mongoose.model('Survey',SurveySchema);
