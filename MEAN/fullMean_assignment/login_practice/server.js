
var express = require ( 'express');
var app = express();
var path = require ('path');
var bp = require ('body-parser');
var port = 8000;
app.use(bp.json());
app.use(express.static(path.join(__dirname + '/client')));

app.listen(port,function(){
  console.log('listening on ${port}')
})
