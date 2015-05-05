var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorHandler');
var path = require('path');
// var helpers = require('./helpers.js');

module.exports = function(app, express){

  var userRouter = express.Router();
  var portfolioRouter = express.Router();
  var twitterRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname,'/../../client')));

  //app.use('/api/users', userRouter);

  app.use('/api/portfolio', portfolioRouter);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  //app.use('/api/twitter', twitterRouter);

  // require('../users/userRoutes.js')(userRouter);
  require('../portfolio/portfolioRoutes.js')(portfolioRouter);
}
