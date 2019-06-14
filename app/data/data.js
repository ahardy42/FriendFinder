// this is the ORM to connect w/ mySQL database
var connection = require("./connection.js");

// we need to seed with an UPDATE and we need a SELECT to use the data to compare scores for all friends against the new friend.
var orm = {
    select: function(selector, table, callback) {
        var sqlString = "SELECT ?? FROM ??";
        connection.query(sqlString, [selector, table], function(err, data) {
            if (err) console.log(err);

            callback(data);
        });
    },
    update: function(table, columns, updatedColumns, callback) {
        var sqlString = "UPDATE ?? (?) VALUES (?)";
        connection.query(sqlString, [table, columns, updatedColumns], function(err, data) {
            if (err) console.log(err);

            callback(data);
        });
    },
    getSumAndUpdate: function(nameCol, questionObject, table, callback) {
        // gets the sum from all friends in the db and compares them to the new friend
        // then updates the db with the new friend
        var sqlString1 = "SELECT ??, (question_1+question_2+question_3+question_4+question_5+question_6+question_7+question_8+question_9+question_10) AS total FROM ??";
        connection.query(sqlString1, [nameCol, table], function(err, data) {
            if (err) console.log(err);

            callback(data);
        });
        var sqlString2 = "INSERT INTO ?? (??) VALUES (?)";
        var colsArray = [];
        var valuesArray = [];
        for (var key in questionObject) {
            if (key !== "name") {
                var num = parseInt(questionObject[key]);
                colsArray.push(key);
                valuesArray.push(num);
            } else {
                colsArray.push(key);
                valuesArray.push(questionObject[key]);
            }
        };
        console.log("second string is " + sqlString2);
        connection.query(sqlString2, [table, colsArray, valuesArray], function(err, data) {
            if (err) console.log(err);
            console.log("updated table", data);
        });
    }
};

module.exports = orm;