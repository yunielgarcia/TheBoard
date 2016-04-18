(function(auth){
    
    var data = require("../data");
    var hasher = require("./hasher");
    var passport = require("passport");
    var localStrategy = require("passport-local").Strategy;
    
    // function to handel verifycation 
    function userVerify(username, password, next) {
        data.getUser(username, function(err, user) {
            if(!err && user){
                var testHash = hasher.computeHash(passport, user.salt);
                if(testHash === user.passwordHash){
                    next(null, user);
                    return;
                }
            }
            next(null, false, {message: "Invalid Credentials"});
        });
    }
    
    auth.init = function(app) {  
        
    //set up passport authentication
    passport.use(new localStrategy(userVerify));
    passport.serializeUser(function(user, next){
        next(null, user.username);
    });
    passport.deserializeUser(function(key, next){
        data.getUser(key, function(err, user) {
            if(err){
                next(null, false, {message: "failed to retrieve user"});
            }else{
                next(null, user);
            }            
        })
    });
    app.use(passport.initialize());
    app.use(passport.session());
    // end of the set up    
        
        app.get("/register", function(req, res){
            res.render("register", {title: "Register for The Board"});
        });
        
        app.post("/register", function(req, res){
            
            //this creates a random caracter string
            var salt = hasher.createSalt();
            
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };
            
         data.addUser(user, function(err){
             if(err){
                 console.log("registrationError, could not save user to database");
                 res.redirect("/register");
             }else{
                 res.redirect("/login");
             }
             
         });  
        });
        
        app.get("/login", function(req, res){
            res.render("login", {title: "login to the board"})
        });
        app.post("/login", function(req, res, next){
            var authFunction = passport.authenticate("local", function(err, user, info){   
                if(err){
                    next(err)
                }else{
                    req.logIn(user, function(err){
                        if(err){
                            next(err);
                        }else{
                            res.redirect("/");
                        }
                    });
                }  
            });
        authFunction(req, res, next);
        });
        
    };
    
})(module.exports);