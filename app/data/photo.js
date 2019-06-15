// this is going to create a get request to a random photo api for submitting a photo if you don't have one...

var photo = {
    getPhoto: function(gender, cb) {
        $.ajax({
            url: `https://randomuser.me/api/?gender=${gender}`,
            dataType: 'json',
            success: function(data) {
              cb(data);
            }
          });
    }
};

module.exports = photo;