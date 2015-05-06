var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
 user_id     : Number,
 cash_balance: Number,
 stocks: [
  {shares: Number,
  date_of_purchase: String,
  price_at_purchase: Number,
  follower_count_at_purchase: Number,
  name: String,
  screen_name: String}]
});

var Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
