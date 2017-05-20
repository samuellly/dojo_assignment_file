var mongoose = require('mongoose'),
    FriendSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        birthday: Date
    }),
    Friend = mongoose.model('Friend', FriendSchema);
