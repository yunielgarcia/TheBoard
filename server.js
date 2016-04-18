var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
// var ejsEngine = require("ejs-locals");

var controllers = require("./controllers");

//Opt inte services
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



//setup the view-engine
app.set("view engine", "vash");    

//set the public static resource folder
app.use(express.static("./public"));

//use authentication....(we want to handle auth first of all routes)
var auth = require("./auth");
auth.init(app);

//Map the routes
controllers.init(app);



app.get("/api/users", function(req, res){
    res.send({name: "ygg", isValid: true, group: 'admin'});
});

var server = http.createServer(app).listen(3000);