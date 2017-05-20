// require path, express and body-parser
//require path so that we can use path stuff like path.join
var express = require("express");
var path = require("path");

var bodyParser = require("body-parser");
//instantiate the app
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'ejs');

// connecting to database
require('./config/mongoose.js');
//connecting to routes
require('./config/routes.js')(app);



// Listen on port 8000
app.listen(8000, function() {
    console.log("Node.js running on port 8000");
});
