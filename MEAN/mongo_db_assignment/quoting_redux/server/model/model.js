var mongoose = require('mongoose');
Schema = mongoose.Schema;

//model
var QuotingDojoSchema = new mongoose.Schema({
	name: String,
	quote: String,
	created_at: {type: Date, default: Date.now},
	likes: { type: Number, default : 0 }
});

// Validations from mongoose which was in node modules
QuotingDojoSchema.path('name').required(true, 'Name cannot be blank');
QuotingDojoSchema.path('quote').required(true, 'Quotes cannot be blank');


mongoose.model('QuotingDojo', QuotingDojoSchema)
