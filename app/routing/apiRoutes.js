// ===============================================================================
// DEPENDENCIES (orm)
// ===============================================================================

var orm = require("../data/data");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        // connecting with mySQL database to retrieve friends data
        // orm.select("*", "friends", function(data) {
        //     res.json(data);
        // });
        var questionArray = [];
        for (i = 0; i < 10; i++) {
            questionArray.push(`question_${i+1}`);
        }
        orm.getSum("name", questionArray, "friends", function(data) {
            res.json(data);
        });
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // post logic the data packet will include a sum that can be compared
        var questionObject = req.body;
        orm.getSumAndUpdate("name", questionObject, "friends", function(data) {
            res.json({old: data, new: questionObject});
        });
    });
};
