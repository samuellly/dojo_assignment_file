var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', (__dirname+'/views'))

app.use(express.static(__dirname+'/static'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messageboardSchema');

var MessageSchema = new mongoose.Schema({
  name: { type: String, required:true },
  message: { type: String, required:true},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment'}],
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now}
})
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message')

var CommentSchema = new mongoose.Schema({
  name: { type: String, required:true, trim:true },
  _Message: { type: mongoose.Schema.Types.ObjectId, required:true, trim:true, ref:'Message'},
  comment: { type: String, required:true},
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now}
})
mongoose.model('Comment', CommentSchema)
var Comment = mongoose.model('Comment')

app.get('/', function(req, res){
  Message.find({})
  .populate('comments')
  .exec(function(err, records){
    return res.render('index', {messages: records});
  })
})

app.post('/messages', function(req, res){
  var messageInstance = new Message(req.body);
  messageInstance.save(function(err){
    return res.redirect('/');
  })
})

app.post('/comments', function(req, res){

  var commentInstance = new Comment(req.body);
  Message.findOne({_id:req.body._Message}, function(err, record){
    record.comments.push(commentInstance._id);
    record.save(function(){
      commentInstance.save(function(err){
        return res.redirect('/');
      })
    })
  })
})





app.listen(8000);
