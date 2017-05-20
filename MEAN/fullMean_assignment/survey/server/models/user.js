var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name : String,
  survey: [{type: mongoose.Schema.Types.ObjectId,ref:'Survey'}]
})

var User = mongoose.model("User", UserSchema);
