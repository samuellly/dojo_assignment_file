// Require path
var path = require("path");

// Require epxress and create express app
var express = require("express");
var app = express();

// Require body-parser to be able to send POST data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( {extended: true} ));

// Static content
app.use(express.static(path.join(__dirname + "/static")));

// Set up views directory & ejs
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

// Require mongoose
var mongoose = require("mongoose");

// Connect to "animals" DB
mongoose.connect("mongodb://localhost/animals");

// Create new schema for inserting an animal into the DB
var AnimalSchema = new mongoose.Schema({
    name: String,
    updated_at: {type: Date, default: Date.now}
});

// Create blueprint object and
// necessary database collection out of the model
var Animal = mongoose.model("Animal", AnimalSchema);

// Home page
app.get("/", function(req, res) {
    Animal.find({}).exec(function(err, animals) {
        if(err) {
            console.log("Error:", err);
        }
        else {
            res.render("index", {animals: animals});
        }

    });

});

app.get("/mongooses/new", function(req, res){
    res.render("new");
});

app.get("/mongooses/:id", function(req, res) {
    Animal.findOne({_id: req.params.id}, function(err, animal) {

        res.render("animal", {animal: animal});
    });
});

app.get("/mongooses/:id/edit", function(req, res) {
    Animal.findOne({_id: req.params.id}, function(err, animal) {

        console.log("Edit an animal");

        res.render("editanimal", {animal: animal});
    });
});

// Route to add an animal to DB
app.post("/mongooses", function(req, res) {
    // Show form data posted
    console.log("POST DATA", req.body);

    // Create a new animal with the
    // corresponding "name" form field
    // from req.body
    var animal = new Animal({
        name: req.body.name
    });

    // Save a single animal into MongoDB
    animal.save(function(err) {
        if(err) {
            console.log("Animal not saved in MongoDB 'animals' database.")
        }
        else {
            console.log("Successfully updated an animal.");
            res.redirect("/");
        }
    });

});

// Route to update a single
// animal document
app.post("/mongooses/:id", function(req, res) {
    // Create a new animal with the
    // corresponding "name" form field
    // from req.body
    var animal = new Animal({
        name: req.body.name
    });

    // Update a single animal document
    // and redirect to the home page
    Animal.update({_id: req.params.id}, {name: req.body.name}, function(err, animal) {
        res.redirect("/");
    });

});

// Route to delete a single
// animal document
app.get("/mongooses/:id/destroy", function(req, res) {

    // Delete a single animal document
    // and redirect to the home page
    Animal.remove({_id: req.params.id}, function(err, animal) {
        console.log("Animal deleted!");
        res.redirect("/");
    });

});

// Listen on port 8000
app.listen(8000, function() {
    console.log("Node.js is running on port 8000");
});