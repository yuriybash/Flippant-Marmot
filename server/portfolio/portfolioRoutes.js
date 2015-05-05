var portfolioController = require('./portfolioController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  //app.param('userId', portfolioController.findPortfolio);
  
  console.log('portfolioRouter: ', app);

  app.route('/')
    .post(portfolioController.newPortfolio)
    .put(portfolioController.updatePortfolio);

  //app.get('/:userId', portfolioController.findPortfolio);

  // app.get('/', portfolioController.findPortfolio);
  app.get('/', function(req, res, next) {
    console.log('in get portfolio');
    res.send('in get portfolio');
  })


};