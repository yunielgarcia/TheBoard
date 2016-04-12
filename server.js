var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
// var ejsEngine = require("ejs-locals");

var controllers = require("./controllers");

//Opt inte services
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Map the routes
controllers.init(app);



//setup the view-engine
    // app.set("view engine", "jade");
    // app.engine("ejs", ejsEngine);
    // app.set("view engine", "ejs");
    app.set("view engine", "vash");
    
    //Opt inte services
// app.use(bodyParser.urlencoded());
// parse application/json



//set the public static resource folder
app.use(express.static("./public"));

app.get("/api/users", function(req, res){
    res.send({name: "ygg", isValid: true, group: 'admin'});
});

var server = http.createServer(app).listen(3000);