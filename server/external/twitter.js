var Twitter = require("twitter");
var fs = require("fs");

//API credentials for our app
var credentials = fs.readFileSync('twitterAPIcredentials.txt', 'utf8').split(" ");

var client = new Twitter({
    consumer_key: credentials[0],
    consumer_secret: credentials[1],
    access_token_key: credentials[2],
    access_token_secret: credentials[3]
});

module.exports = {

    /**
     * This function returns Twitter data for one given handle.
     * @constructor
     * @param req title - request data for this request
     * @param res author - response data for this response
     */
    getUserInfo: function(req, res) {
        var twitterHandle = req.body.twitterHandle;

        //response is JSON string of arrays. We will parse first result in it, create JSON from it, and send it back to client.
        client.get('users/lookup', {
            'screen_name': twitterHandle
        }, function(error, response) {

            var twitterUserData = {};

            if (error) {
                console.log("Error getting data from Twitter API");
                res.send(404, "Sorry, bad Twitter handle - try again");
            } else {
                console.log("Data successfully retrieved from Twitter API")
                var returnedUserData = JSON.parse(response)[0];
                twitterUserData["screen_name"] = returnedUserData["screen_name"];
                twitterUserData["name"] = returnedUserData["name"];
                twitterUserData["follower_count_at_purchase"] = returnedUserData["followers_count"];
                twitterUserData["price_at_purchase"] = parseInt(returnedUserData["followers_count"]) / 1000000;
                res.send(200, JSON.stringify(twitterUserData));
            }


        })

    }

};