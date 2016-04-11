(function(notesController) {

    var data = require("../data");

    notesController.init = function(app) {
        app.get('/api/notes/:categoryName', function(req, res) {

            var categoryName = req.params.categoryName;

            data.getNotes(categoryName, function(err, notes) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(notes);
                }

            });
        });
    };

})(module.exports);