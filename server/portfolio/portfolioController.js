// handles functions for dashboard display, stock purchases, and stock sales from the portfolio db
// MVP will have option to buy a stock once, but can sell on multiple dates

var Portfolio = require('./PortfolioModel.js');
var Q = require('q');

module.exports = {
  displayAllStocks: function(req, res, next){
    console.log("display all stocks being called!");
    console.log("req.session.passport LOOKS LIKE: ", req.session.passport)

    // req.session.passport = {}; //REMOVE THIS LATER
    // req.session.passport.user = {};
    // req.session.passport.user._id = 3;
    // req.session.passport.user.screen_name = 'obscyuriy3';
    // req.session.passport.user.displayname = 'yuriy 3 bash';

    console.log("TEST1111111111111")

    if(!req.session.passport){
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

    var userObj = req.session.passport.user; // to be changed
    var create, newPortfolio;

        console.log("TEST2222222222")


    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({user_id: userObj._id})
      .then(function(portfolio){
        if(!portfolio){
          create = Q.nbind(Portfolio.create, Portfolio);
          newPortfolio = {
            user_id     : req.session.passport.user._id, // check passport authentication
            cash_balance: 10000,
            stocks: []
          }
          create(newPortfolio);

          newPortfolio['user_twitter_handle'] = req.session.passport.user.screen_name;
          newPortfolio['name'] = req.session.passport.user.displayname;

          res.json(newPortfolio);

        } else {
          portfolio['user_twitter_handle'] = req.session.passport.user.screen_name;
          portfolio['name'] = req.session.passport.user.displayname;
                  console.log("TEST3333333333")
          res.json(portfolio);
        }
      })
      .fail(function(error){
        console.log('error', error);
      });
    }
  },

  buy: function(req, res, next){
    // req.session.passport = {}; //REMOVE THIS LATER
    // req.session.passport.user = {};
    // req.session.passport.user._id = 3;
    // req.session.passport.user.screen_name = 'obscyuriy3';
    // req.session.passport.user.displayname = 'yuriy 3 bash';

    var userObj = req.session.passport.user;
    console.log("inside buy function");
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

        portfolio['user_twitter_handle'] = req.session.passport.user.screen_name;
        portfolio['name'] = req.session.passport.user.displayname;

        res.json(portfolio);
      })
      .fail(function(error){
        console.log(error);
      });
  },
  sell: function(req, res, next){
    // req.session.passport = {}; //REMOVE THIS LATER
    // req.session.passport.user = {};
    // req.session.passport.user._id = 3;
    // req.session.passport.user.screen_name = 'obscyuriy3';
    // req.session.passport.user.displayname = 'yuriy 3 bash';

    var userObj = req.session.passport.user;

    console.log('req.body: ', req.body);
    // at purchase:
    // {
    //     "screen_name": "@LadyGaga",
    //     "name": "Lady Gaga ga",
    //     "follower_count_at_purchase": 12000000,
    //     "price_at_purchase": 12,
    //     "date_of_purchase": "Tue May 05 2015 14:11:43 GMT-0700 (PDT)",
    //     "shares": 100
    // }
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
            if(portfolio.stocks[i].shares > req.body.shares){
              console.log("i:", i)
                portfolio.stocks[i].shares = portfolio.stocks[i].shares - req.body.shares;
            }
             else {
              portfolio.stocks.splice(i, 1);
            }
          }
        }

        console.log("portfolio.stocks[1].shares outside for loop: ", portfolio.stocks[1])
        console.log("new portfolio right before sale: ", portfolio);

        portfolio['user_twitter_handle'] = req.session.passport.user.screen_name;
        portfolio['name'] = req.session.passport.user.displayname;

        portfolio.save(function(err){
          if(err){
            console.log('Error!');
          }
        res.json(portfolio);
        });

        console.log("new portfolio right after sale: ", portfolio);


      })
      .fail(function(error){
        console.log(error);
      });
  }
}


