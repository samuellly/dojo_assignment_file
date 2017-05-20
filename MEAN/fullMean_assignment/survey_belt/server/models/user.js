var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  name : {
    type:String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [6," First name must be atleast 2 letters"]
  }
,
_polls:[{type: Schema.Types.ObjectId, ref :'Poll'}]
}
,{timestamps:true})


  var User = mongoose.model('User', UserSchema)