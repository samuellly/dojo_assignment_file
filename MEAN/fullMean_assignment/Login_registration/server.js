var express = require('express'),
    app = express(),
    bp = require('body-parser'),
    path = require('path'),
    port = 8000;


app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(bp.json());

require(path.join(__dirname, './server/config/mongoose.js'));
require(path.join(__dirname, './server/config/routes.js'))(app);
var port = 8000;

app.listen(port, function() {
    console.log("listening on port", port);
})
