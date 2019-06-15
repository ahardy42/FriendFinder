// this is going to create a get request to a random photo api for submitting a photo if you don't have one...
var axios = require("axios");

var photo = {
    getPhoto: function(gender, cb) {
        // use axios to get data here
        var url = `https://randomuser.me/api/?gender=${gender}`;
        axios.get(url)
        .then(response => {
            data = response.data.results[0];
            console.log(data);
            cb(data);
        })

    }
};

module.exports = photo;