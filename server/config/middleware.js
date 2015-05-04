var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorHandler');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
// var helpers = require('./helpers.js');

module.exports = function(app, express){
  app.use(cookieParser('add a secret here'));
  app.use(session({ secret: 'xyz-qwrty' }));

  var userRouter = express.Router();
  var portfolioRouter = express.Router();
  var twitterRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname,'/../../client')));


  app.use('/api/users', userRouter);
  app.use('/api/portfolio', portfolioRouter);
  app.use('/api/twitter', twitterRouter);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);


  app.use('/api/twitter', twitterRouter);

  // require('../users/userRoutes.js')(userRouter);
  require('../portfolio/portfolioRoutes.js')(portfolioRouter);

  require('../auth/authPassport')(passport);
  // passport initialization
  app.use(passport.initialize());
  app.use(passport.session());
  // Passport Routes 
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  app.get('/auth/twitter', passport.authenticate('twitter'));
  // app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter',
    { successRedirect: '/', failureRedirect: '/login' }
  ));
  app.get('/test', function(req, res){
    console.log('at /test, session: ', req.session);
    res.send('get /test OK');
  })
  // app.get('/auth/facebook/callback', passport.authenticate('facebook',
  //   { successRedirect: '/', failureRedirect: '/login' }
  // ));
  require("../external/twitterRoutes.js")(twitterRouter);   //injects twitterRouter into twitterRoutes.js
}
