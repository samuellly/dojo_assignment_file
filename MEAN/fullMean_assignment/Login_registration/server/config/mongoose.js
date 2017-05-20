var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs');
mongoose.connect('mongodb://localhost/login');
var model_path = path.join(__dirname, './../models');
fs.readdirSync(model_path).forEach(function(file) {
    if (file.indexOf('.js') >= 0) {
        require(path.join(model_path, file));
    }
});
