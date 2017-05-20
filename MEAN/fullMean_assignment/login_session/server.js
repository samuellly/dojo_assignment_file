var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');

require('./server/config/mongoose.js')
app.use(bodyParser.json())
require('./server/config/routes.js')(app)


app.use(express.static(path.join(__dirname, './client/static')));
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.listen(8000, function(){
	console.log("Port 8000")
})
