// handles functions for dashboard display, stock purchases, and stock sales from the portfolio db
// MVP will have option to buy a stock once, but can sell on multiple dates

var Portfolio = require('./PortfolioModel.js');
var Q = require('q');

module.exports = {
  displayAllStocks: function(req, res, next){
    console.log("display all stocks being called!");

    req.session = {}; //REMOVE THIS LATER
    req.session.user = {};
    req.session.user._id = 3;
    req.session.user.screen_name = 'obscyuriy3';
    req.session.user.displayname = 'yuriy 3 bash';

    if(!req.session){
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
    } else {

    var userObj = req.session.user; // to be changed
    var create, newPortfolio;

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({user_id: userObj._id})
      .then(function(portfolio){
        if(!portfolio){
          create = Q.nbind(Portfolio.create, Portfolio);
          newPortfolio = {
            user_id     : req.session.user._id, // check passport authentication
            cash_balance: 10000,
            stocks: []
          }
          create(newPortfolio);

          newPortfolio['user_twitter_handle'] = req.session.user.screen_name;
          newPortfolio['name'] = req.session.user.displayname;

          console.log('newPortfolio is: ', newPortfolio)
          res.json(newPortfolio);

        } else {
          console.log("portfolio found: ", portfolio);
          console.log("req.session.user.screen_name is: ", req.session.user.screen_name)
          portfolio['user_twitter_handle'] = req.session.user.screen_name;
          portfolio['name'] = req.session.user.displayname;
          res.json(portfolio);
        }
      })
      .fail(function(error){
        console.log('error', error);
      });
    }
  },

  buy: function(req, res, next){
    req.session = {}; //REMOVE THIS LATER
    req.session.user = {};
    req.session.user._id = 3;
    req.session.user.screen_name = 'obscyuriy3';
    req.session.user.displayname = 'yuriy 3 bash';

    var userObj = req.session.user;

    console.log('req.body: ', req.body);
    // req.body should have:
    // {
    //     "screen_name": "@LadyGaga",
    //     "name": "Lady Gaga ga",
    //     "follower_count_at_purchase": 12000000,
    //     "price_at_purchase": 12,
    //     "date_of_purchase": "Tue May 05 2015 14:11:43 GMT-0700 (PDT)",
    //     "shares": 100
    // }

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);

    findPortfolio({user_id: userObj._id})
      .then(function(portfolio){
        portfolio.cash_balance = portfolio.cash_balance - (req.body.shares * req.body.price_at_purchase);
        portfolio.stocks.push(req.body);

        portfolio.save(function(err){
          if(err){
            console.log('Error!');
          }
        });

        console.log("new portfolio right after purchase: ", portfolio);
        portfolio['user_twitter_handle'] = req.session.user.screen_name;
        portfolio['name'] = req.session.user.displayname;

        res.json(portfolio);
      })
      .fail(function(error){
        console.log(error);
      });
  },
  sell: function(req, res, next){
    req.session = {}; //REMOVE THIS LATER
    req.session.user = {};
    req.session.user._id = 3;
    req.session.user.screen_name = 'obscyuriy3';
    req.session.user.displayname = 'yuriy 3 bash';

    var userObj = req.session.user;

    console.log('req.body: ', req.body);
    // at purchase:
    // {
    //     "screen_name": "@LadyGaga",
    //     "name": "Lady Gaga ga",
    //     "follower_count_at_purchase": 12000000,
    //     "price_at_purchase": 12,
    //     "date_of_purchase": "Tue May 05 2015 14:11:43 GMT-0700 (PDT)",
    //     "shares": 100
    //}
    //
    //     at sale:
    // {
    //     "screen_name": "@LadyGaga",
    //     "name": "Lady Gaga ga",
    //     "current_follower_count": 15000000, // front end user input
    //     "current_date": "Tue May 05 2015 14:11:43 GMT-0700 (PDT)",
    //     "current_price": 15,
    //     "shares": 100 // front user input
    // }

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);

    findPortfolio({user_id: userObj._id})
      .then(function(portfolio){
        portfolio.cash_balance = portfolio.cash_balance + (req.body.shares * req.body.current_price);

        for(var i = portfolio.stocks.length - 1; i >= 0; i--){
          if(portfolio.stocks[i].screen_name === req.body.screen_name){
            if(portfolio.stocks[i].shares >= req.body.shares){
                portfolio.stocks[i].shares -= req.body.shares;
            }
             else {
              portfolio.stocks.splice(i, 1);
            }
          }
        }

        portfolio.save(function(err){
          if(err){
            console.log('Error!');
          }
        });

        console.log("new portfolio right after purchase: ", portfolio);
        portfolio['user_twitter_handle'] = req.session.user.screen_name;
        portfolio['name'] = req.session.user.displayname;

        res.json(portfolio);
      })
      .fail(function(error){
        console.log(error);
      });
  }
}


