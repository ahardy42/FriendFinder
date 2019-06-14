$(document).ready(function() {
    $(".survey").on("submit", function(e) {
        e.preventDefault();
        var postObject = {
            name: `${$("#firstName").val().trim()} ${$("#lastName").val().trim()}`,
            question_1: parseInt($("#question1").val()),
            question_2: parseInt($("#question2").val()),
            question_3: parseInt($("#question3").val()),
            question_4: parseInt($("#question4").val()),
            question_5: parseInt($("#question5").val()),
            question_6: parseInt($("#question6").val()),
            question_7: parseInt($("#question7").val()),
            question_8: parseInt($("#question8").val()),
            question_9: parseInt($("#question9").val()),
            question_10: parseInt($("#question10").val())
        };

        $.ajax("/api/friends", {
            method: "POST",
            data: postObject
        }).then(function(data) {
            // location.reload();
            console.log(data);
        });
    });
});