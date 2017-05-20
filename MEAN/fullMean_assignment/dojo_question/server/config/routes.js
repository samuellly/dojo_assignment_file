var mongoose = require('mongoose');
var user = require('../controllers/controls.js');


module.exports = function(app) {

app.post('/user',function(req, res){
  user.create(req, res)
});

app.post('/login', function(req, res) {
  user.login(req, res)
});

app.get('/getQuestions', function(req, res) {
  user.getQuestions(req, res)
})

app.post('/newQuestion', function(req, res) {
  user.newQuestion(req, res)
})

app.post('/newAnswer', function(req, res) {
  user.newAnswer(req, res)
})

app.post('/like', function(req, res) {
  user.like(req, res)
})

app.get('/getOneQuestion/:id', function(req, res) {
  user.getOneQuestion(req, res)
})


}