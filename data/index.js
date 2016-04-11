(function(data) {

    var seedData = require("./seedData");
    var database = require("./database");

    data.getNoteCategories = function(next) {
        // initial static data
        // next(null, seedData.initialNotes);
        database.getDb(function(err, db) {
            if (err) {
                next(err, null)
            } else {
                // db.notes.find().toArray(function(err, results) {
                //     if (err) {
                //         next(err, null);
                //     } else {
                //         next(null, results);
                //     }
                db.notes.find().toArray(function(err, results) {
                    if (err) {
                        next(err, null);
                    } else {

                        next(null, results);
                    }
                });
            }
        })
    };


    data.createNewCategory = function(category, next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                var cat = {
                    name: category,
                    notes: []
                }
                db.notes.insert(cat, function(err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

    data.getNotes = function(categoryName, next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.notes.findOne({name: categoryName}, function(err, notes) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, notes);
                    }
                })
            }
        });
    };

    function seedDatabase() {
        database.getDb(function(err, db) {
            if (err) {
                console.log("failed to seed database" + err);
            } else {
                //test if data exits
                db.notes.count(function(err, count) {
                    if (err) {
                        console.log("failed to retrieve database count");
                    } else {
                        if (count == 0) {
                            console.log("seeding the database");
                            seedData.initialNotes.forEach(function(item) {
                                db.notes.insert(item, function(err) {
                                    if (err) console.log("failed to insert note into database")
                                });
                            });
                        } else {
                            console.log("database already seeded");
                        }
                    }
                });
            }
        })
    }

    seedDatabase();
})(module.exports);