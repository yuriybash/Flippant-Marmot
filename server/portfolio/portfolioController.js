// var Portfolio    = require('./PortfolioModel.js'),
//     Q       = require('q'),
//     util    = require('../config/utils.js');


module.exports = {
  findPortfolio: function (req, res, next, userId) {
    console.log("i am still present @ findPortfolio, userId", userId)
      // var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
      // findPortfolio({userId: userId})
      //   .then(function (portfolio) {
      //     if (portfolio) {
      //       req.navLink = portfolio;
      //       next();
      //     } else {
      //       next(new Error('Portfolio not added yet'));
      //     }
      //   })
      //   .fail(function (error) {
      //     next(error);
      //   });
    var portfolio = {
      user_twitter_handle: 'obscyuriy',
      name: 'yuriy bash',
      cash_balance: 8000.00,
      stocks: [{
        screen_name: 'KatyPerry',
        name: 'Katy Perry',
        follower_count_at_purchase: 69000000,
        price_at_purchase: 1374.00,
        date_of_purchase: timestamp,
        shares: 12
      }, {
        screen_name: 'BarackObama',
        name: 'Barack Obama',
        follower_count_at_purchase: 58797293,
        price_at_purchase: 974.00,
        date_of_purchase: timestamp,
        shares: 12
      }]
    };
    res.json(portfolio);
  },

  updatePortfolio: function (req, res, next) {
    console.log('New Portfolio: ', req.body);
    res.send('updatePortfolio called');

  },

  // allPortfolios: function (req, res, next) {
  // var findAll = Q.nbind(Portfolio.find, Portfolio);

  // findAll({})
  //   .then(function (portfolios) {
  //     res.json(portfolios);
  //   })
  //   .fail(function (error) {
  //     next(error);
  //   });
  // },

  newPortfolio: function (req, res, next) {
    console.log('New Portfolio: ', req.body);
    res.send('newPortfolio called');


    // var createPortfolio = Q.nbind(Portfolio.create, Portfolio);
    // var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);


  }



};