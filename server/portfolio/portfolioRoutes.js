var portfolioController = require('./portfolioController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js
  
  app.route('/')
    .get(portfolioController.findPortfolio)
    .post(portfolioController.newPortfolio)
    .put(portfolioController.updatePortfolio);
};