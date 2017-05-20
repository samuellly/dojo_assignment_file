var mongoose = require('mongoose')
var path = require('path')
var Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	dob: Date
}, {timestamp :true});

var Friend = mongoose.model('Friend', FriendSchema)
