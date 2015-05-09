/**
 * This file defines the routing when a request to '/api/twitter' is made. This router was 
 * instantiated in middleware.js and is bound to 'api/twitter', so any URLs below are added
 * as a suffix to 'api/twitter'. For example, when we define the route for '/' below,
 * it's actually the route for www.socialstock.com/api/twitter.
 *
 * There is currently only one path, because we are currently only doing one thing with the Twitter API:
 * requesting a specific Twitter users' information. Any new types of queries/API calls would be defined
 * as new functions that live in twitter.js, and an additional routes for those calls would be listed here.
 */

//The actual API requests will live in twitter.js.
var twitter = require('./twitter.js');

//app is the twitterRouter injected from middleware.js
//POST requests expect an object with a "twitterHandle" key and corresponding value.
module.exports = function(app){

	app.post('/', twitter.getUserInfo);


}