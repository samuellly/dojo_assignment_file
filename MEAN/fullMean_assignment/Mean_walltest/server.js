var mongoose = require('mongoose'),
    express = require('express'),
    bp = require('body-parser'),
    path = require('path'),
    root = __dirname,
    port = process.env.PORT || 8000,
    app = express();
var functions = require('./functions');
require('./server/config/mongoose.js');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({
        extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
mongoose.Promise = global.Promise;
app.use(bp.urlencoded({
    extended: true
}));
app.use(bp.json());

require('./server/config/routes.js')(app);

app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.json())
app.post('/searchDJ', functions.DJsearch);
app.post('/searchPlaylist', functions.searchPlaylist)

app.post('/textdownload',functions.textdownload)
app.post('/bugsartist',functions.bugsartist)
app.post('/bugstrack',functions.bugstrack)
app.post('/PlaylistAdd',functions.PlaylistAdd)
app.post('/PlaylistSearch',functions.PlaylistSearch)
app.post('/temp',functions.temp)
app.post('/PlaylistDelete',functions.PlaylistDelete)
app.post('/toMp3',functions.toMp3)
app.listen(port, function() {
    console.log(`server running on port ${ port }`);
});
