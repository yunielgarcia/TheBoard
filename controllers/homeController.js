(function(homeController){
    
    var data = require("../data");
    
    homeController.init = function(app){
        app.get("/", function(req, res){
          data.getNoteCategories(function(err, results){
                res.render("index", {title: "The board", error: err, categories: results, user: req.user});
             });
    
        });
        
        app.get("/notes/:categoryName", function(req, res){
            var categoryName = req.params.categoryName;
            res.render("notes", { title: categoryName});            
        });
        
        app.post("/newCategory", function(req, res){
            console.log(req.body)
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function(err){
                if(err){
                    //handle error
                    console.log(err);
                }else{
                    res.redirect("/notes/" + categoryName);
                }
            });            
        });
    };
    
})(module.exports);