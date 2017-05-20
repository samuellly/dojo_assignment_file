var mongoose = require('mongoose');
var AnswerSchema = new mongoose.Schema({
  author: {type: String, required: true},
  text: { type: String, required: true, minlength: 5 },
  description: String,
  likes: Number
});

mongoose.model('Answer', AnswerSchema);
