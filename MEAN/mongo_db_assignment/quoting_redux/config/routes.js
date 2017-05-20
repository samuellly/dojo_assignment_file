var quote = require('./../server/controller/controller.js');

module.exports = function(app){

  //get all quotes
  app.get('/', function(req, res){
    quote.get_quotes(req, res);
  });
  app.get('/main', function(req, res){
    quote.get_quotes_main(req, res);
  });
  //add quote
  app.post('/main', function(req, res){
    quote.add_quote(req, res);
  });
  //get particular quote to delete
  app.get('/delete/:id', function(req, res){
    quote.delete_quote(req.params, res);
  });
  //get particular quote to edit
  // app.get('/edit_quote/:id', function(req, res){
  //   quote.edit_quote(req.params, res);
  // });
  app.get('/like/:id', function(req, res){
    // console.log(req.params)
    quote.add_like(req.params,res);
  })
}