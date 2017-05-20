var mongoose = require('mongoose');
var QuestionSchema = new mongoose.Schema({
  author: {type: String, required: true},
  text: { type: String, required: true, minlength: 10 },
  description: String,
  _answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
});

mongoose.model('Question', QuestionSchema);
