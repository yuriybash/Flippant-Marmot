// handles functions for dashboard display, stock purchases, and stock sales from the portfolio db
// MVP will have option to buy a stock once, but can sell on multiple dates

var Portfolio = require('./PortfolioModel.js');
var Q = require('q');
var twitter = require("../external/twitter.js")

module.exports = {
  displayAllStocks: function(req, res, next){
    console.log("display all stocks being called!");
    console.log("req.session.passport LOOKS LIKE: ", req.session.passport)

    // req.session.passport = {}; //REMOVE THIS LATER
    // req.session.passport.user = {};
    // req.session.passport.user._id = 3;
    // req.session.passport.user.screen_name = 'obscyuriy3';
    // req.session.passport.user.displayname = 'yuriy 3 bash';

    if(!req.session.passport){
      console.log("You are not signed in!");
    } else {

    var userObj = req.session.passport.user; // to be changed
    var create, newPortfolio;

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

          if(portfolio.stocks.length > 0){
            var twitterHandleArray = [];

            for(var i = 0; i < portfolio.stocks.length; i++){
              var twitterRequest = portfolio.stocks[i].screen_name.slice(1);
              twitterHandleArray.push(twitterRequest);
            }

            console.log("twitterHandleArray", twitterHandleArray);

            var twitterHandleString = twitterHandleArray.join(",")

            twitter.getUserInfoHelper(twitterHandleString, function(followersCount){
              //followersCount = [51255152, 2141241]

              for(var i = 0; i < followersCount.length; i++){
                console.log("ADDING NEW FOLLOWER COUNT FOR ONE CELEBRITY: ", portfolio.stocks[i].screen_name);

                portfolio.stocks[i]["current_follower_count"] = followersCount[i];


                var currentNumFollowers = followersCount[i];
                console.log("currentNumFollowers", currentNumFollowers)
                var originalNumFollowers = portfolio.stocks[i].follower_count_at_purchase;
                console.log("originmalNumFollowers is: ", originalNumFollowers)
                var currentDate = new Date();
                var numDays = Math.abs(Date.parse(currentDate) - Date.parse(portfolio.stocks[i].date_of_purchase))/(1000*60*60*24);
                if(numDays < 1){ numDays = 1 };
                console.log("numDays", numDays)
                var growthRate = Math.pow(Math.abs(currentNumFollowers-originalNumFollowers)/originalNumFollowers, 1/numDays);
                console.log("(currentNumFollowers-originalNumFollowers)/originalNumFollowers", (currentNumFollowers-originalNumFollowers)/originalNumFollowers)
                console.log("growth function: ", 1/numDays)
                var growthRateVsExpected = (growthRate - .0007)/.0007;
                console.log("growthrateVsExpected is: ", growthRateVsExpected)
                portfolio.stocks[i]["current_price"] = (1+growthRateVsExpected) * (portfolio.stocks[i].follower_count_at_purchase/1000000);
                console.log("CURRENT PRICE IS: " + portfolio.stocks[i].current_price);
              }
              res.json(portfolio);

            })
          } else {
            res.json(portfolio);
          }
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




