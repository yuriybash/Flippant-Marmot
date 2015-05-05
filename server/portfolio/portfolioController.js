/*
// var Portfolio    = require('./PortfolioModel.js'),
//     Q       = require('q'),
//     util    = require('../config/utils.js');


module.exports = {
  findPortfolio: function (req, res, next) {
    console.log("i am still present @ findPortfolio, session: ", req.session);
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
        date_of_purchase: "2015-05-04T19:53:22.373Z",
        shares: 12
      }, {
        screen_name: 'BarackObama',
        name: 'Barack Obama',
        follower_count_at_purchase: 58797293,
        price_at_purchase: 974.00,
        date_of_purchase: "2015-05-04T19:53:22.373Z",
        shares: 12
      }]
    };
    res.json(portfolio);
  },

  updatePortfolio: function (req, res, next) {
    console.log('update Portfolio: ', req.body);
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
  }
};
*/
// handles functions for dashboard display, stock purchases, and stock sales from the portfolio db

var Portfolio = require('./PortfolioModel.js');
var Q = require('q');

module.exports = {
  displayAllStocks: function(req, res, next){
    var userObj = req.session.user; // to be changed
    
    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({user_id: userObj._id})
    // if user is new, create new model in collection, and return back empty collection
    // with 10,000 cash balance
      .then(function(portfolio){
        console.log(portfolio);
        portfolio[user_twitter_handle] = req.session.user.screen_name;
        portfolio[name] = req.session.user.displayname;
        console.log(portfolio);
        // by not saving it, these are temporary attributes
        res.send(portfolio); // callback with stocks and cash balance info
      })
      .fail(function(error){
        console.log(error);
      });
    // add logic for new portfolios
  },

  buy: function(req, res, next){
    // buy: give me user info and stock info and this will insert it in stocks property
    var userObj = req.session.user;

    console.log(req.body);
    // req.body should have:
    // var stockPurchase = {
    //   screen_name: req.body.screen_name, // pass in stock purchase data (replace req.body later)
    //   name: req.body.name, 
    //   follower_count_at_purchase: req.body.follower_count_at_purchase,
    //   price_at_purchase: req.body.price_at_purchase,
    //   date_of_purchase: req.body.date_of_purchase,
    //   shares: req.body.shares
    // };

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({user_id: userObj._id})
      .then(function(portfolio){
        portfolio.cash_balance - (req.body.shares * req.body.price_at_purchase)
        // save/ update new portfolio in mongoose;
        portfolio.stocks.push(req.body);
        // To do: add logic for additional purchases vs new purchases
        // res.send(portfolio);
        next();
      })
      .fail(function(error){
        console.log(error);
      });
  },
  sell: function(req, res, next){
    var username = req.body.username;
    var stockSale = {
      screen_name: req.body, // pass in stock purchase screen name (replace req.body later)
      name: req.body, 
      follower_count_at_sale: req.body, // need to find follower count at sale
      price_at_sale: req.body, // need to find price at sale at sale
      date_of_sale: req.body, // need date of sale
      shares: req.body
    };

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({username: username})
      .then(function(portfolio){
        console.log(portfolio);

        var index;
        for(var i = 0; i < portfolio.stocks.length; i++){
          if(portfolio.stocks[i].username === username){
            index = i;
          }
        }
        portfolio.stocks.splice(index, 1);
        // To do: add logic for selling all stocks vs partial amount
        // To do: add a way to optimize for loop?
      })
      .fail(function(error){
        console.log(error);
      });
  }
};
