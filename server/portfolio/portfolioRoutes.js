var portfolioController = require('./portfolioController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js
  
  app.route('/')
    .get(portfolioController.findPortfolio);

  app.route('/buy')
    .post(portfolioController.buy, portfolioController.displayAllStocks);
    // check if this is how express links functions

  app.route('/sell')
    .post(portfolioController.sell);
};
