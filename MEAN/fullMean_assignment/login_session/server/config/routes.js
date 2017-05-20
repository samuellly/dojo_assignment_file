var mongoose = require('mongoose')
friends = require('../controllers/friends.js')

console.log("*******ROUTES*********")

module.exports = function(app){
  app.get('/friends', friends.index);
  app.get('/friends/:id', friends.show);
  app.post('/friends', friends.create);
  app.put('/friends/:id', friends.update);
  app.delete('/friends/:id', friends.delete);

}
