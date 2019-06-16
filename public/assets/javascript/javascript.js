$(document).ready(function () {

    // ============================================================================
    // find and compare values functions 
    // ============================================================================

    function sumVals(object) {
        var sum = 0, x;
        for (x in object) {
            if (x.includes("question")) {
                sum += parseInt(object[x]);
            }
        }
        return sum;
    };

    // this function adds a key/value pair to the object returned, which is equal to the abs value of the difference
    function findDifference(object, sum) {
        var diff = Math.abs(object.total - sum);
        object.difference = diff;
    }

    // this function sorts the array of objects based on the value of object.difference
    function insertionSort(objectArray) {
        var len = objectArray.length;
        for (i = 1; i < len; i++) {
            var key = objectArray[i];
            var j = i - 1;
            while (j >= 0 && objectArray[j].difference > key.difference) {
                objectArray[j + 1] = objectArray[j];
                j = j - 1;
            }
            objectArray[j + 1] = key;
        }
        return objectArray;
    }

    function returnNames(sum, objectArray) {
        objectArray.forEach(object => {
            findDifference(object, sum)
        });
        var sortedArray = insertionSort(objectArray);
        var namesArray = [];
        namesArray.push({id: sortedArray[0].id, name: sortedArray[0].name});
        for (x = 1; x < sortedArray.length - 1; x++) {
            if (sortedArray[x].difference === sortedArray[0].difference) {
                namesArray.push({id: sortedArray[x].id, name: sortedArray[x].name});
            }
        }
        return namesArray;
    }

    // function returns the photo obtained from the randomuser api
    async function getPhoto(gender) {
        var photo = await $.ajax({url: `/photo/${gender}`});
        return photo;
    }

    async function postObject(object, photo) {
        var response = await $.ajax("/api/friends", {method: "POST", data: object});
        return response;
    }

    // put it together
    async function buildObject(object, photoPath, gender) {
        if (photoPath) {
            object.image = photoPath;
            data = await postObject(object);
            return data;
        } else {
            photoPath = await getPhoto(gender);
            object.image = photoPath.picture.large;
            data = await postObject(object);
            return data;
        }
    }
    // ============================================================================
    // page building functions
    // ============================================================================

    // build the modal content for a match
    function buildModal(array) {
        if (array.length > 1) {
            $(".modal-title").text("Here are your matches!");
        } else {
            $(".modal-title").text("Here is your match!");
        }
        // build a list of names w/ namesArray
        var ul = $("<ul class='list-group'>");
        array.forEach(element => {
            var li = $("<li class='list-group-item list-group-item-action'>");
            li.text(element.name);
            li.attr("data-id", element.id);
            ul.append(li);
        });
        $(".modal-body").append(ul);
    }

    async function getInfoOnMatch(id) {
        var data = await $.ajax(`/api/friend/${id}`, {method: "GET"});
        return data;
    }

    function buildMatchImage(imageUrl) {
        var img = $("<img class='card-img-top'>");
        img.attr("src", imageUrl);
        img.attr("alt", "profile image");
        return img;
    }

    function buildMatchList(dataObject) {
        var ul = $("<ul class='list-group'>");
        for (var x in dataObject) {
            if (x.includes("question")) {
                var li = $("<li class='list-group-item'>");
                var q = $(`label[for=${x.replace("_","")}]`).text();
                var question = q.replace(".","");
                var answer = dataObject[x];
                li.html(`${question}: <span style='font-weight: bold'>${answer}</span>`);
                ul.append(li);
            }
        }
        return ul;
    }

    function buildMatchCard(id) {
        // get information for your match
        getInfoOnMatch(id)
        .then(function(data) {
            $(".match-name").text(data[0].name);
            var img = buildMatchImage(data[0].image);
            $("#match-card").prepend(img);
            var ul = buildMatchList(data[0]);
            $("#match-card-body").append(ul);
        });
    }

    // ============================================================================
    // listeners
    // ============================================================================

    // if checkbox for random photo is checked, show the gender selector 
    $('input[name=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            // Checkbox is checked..
            $(".select").css("display", "block");
            $("#photo-group").css("display", "none");
        } else {
            // Checkbox is not checked..
            $(".select").css("display", "none");
            $("#photo-group").css("display", "block");
        }
    });

    // code for submitting the survey form 
    $(".survey").on("submit", function (e) {
        e.preventDefault();
        // posting the values to the database
        var postObject = {
            name: `${$("#firstName").val().trim()} ${$("#lastName").val().trim()}`,
            question_1: $("#question1").val(),
            question_2: $("#question2").val(),
            question_3: $("#question3").val(),
            question_4: $("#question4").val(),
            question_5: $("#question5").val(),
            question_6: $("#question6").val(),
            question_7: $("#question7").val(),
            question_8: $("#question8").val(),
            question_9: $("#question9").val(),
            question_10: $("#question10").val()
        };
        // get the photoPath variable either from the form, or from an ajax call
        var path = $("#photo").val();
        var gender = $("#gender").val();
        buildObject(postObject, path, gender)
        .then(function (data) {
            console.log(data);
            // now I will see if I can show a modal w/ the info.
            var newSubmission = data.new;
            var currFriends = data.old;
            var newSubSum = sumVals(newSubmission);
            // compare sums of each person in the DB and return an array of names with the closest sum
            var namesArray = returnNames(newSubSum, currFriends);

            // pop up modal with names and stuff
            buildModal(namesArray);
            $(".modal-one").css("display", "block");
        });
    });

    // on click for the person you want to see more information on
    $("body").on("click", ".list-group-item", function(e) {
        // build the match modal out
        var id = $(this).attr("data-id");
        buildMatchCard(id);
        // show that modal!
        $(".modal-one").css("display", "none");
        $(".modal-two").css({"display": "block", "overflow": "auto"});
    });

    // option to close the modals
    $(".close").on("click", function() {
        var dismiss = $(this).attr("data-dismiss");
        $(`.${dismiss}`).css("display", "none");
        // refresh the survey
        location.href = "/survey";
    });
});