var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
 user_id     : Number,
 cash_balance: Number, // add default 10,000
 stocks: Array
});

var Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
