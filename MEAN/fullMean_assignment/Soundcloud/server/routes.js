/* globals module */ 
module.exports = function(app){
  app.get('*',function(req, res){
    res.sendfile('../client/index.html');
  });
};