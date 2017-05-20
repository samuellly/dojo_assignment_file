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

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening On Port ${port}`);
    }
});
