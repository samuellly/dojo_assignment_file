var users = require("../controllers/users.js");
var surveys = require("../controllers/surveys.js");

module.exports = function(app) {

  app.post('/users',function(req,res) {
    users.create(req,res);
  })

  app.post('/surveys',function(req,res) {
    surveys.create(req,res);
  })

  app.get('/surveys',function(req,res) {
    surveys.index(req,res);
  })

  app.get('/surveys/:id',function(req,res) {
    surveys.show(req,res);
  })

  app.put('/surveys/:id',function(req,res) {
    surveys.update(req,res);
  })

  app.delete('/surveys/:id',function(req,res) {
    surveys.delete(req,res);
  })




}
