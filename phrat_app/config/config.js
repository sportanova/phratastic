var express = require('express'),
path = require('path'),
passport = require('passport'),
passport = require('passport'),
passportInitialization = require('../controllers/passport.js'),
passportSerialize = require('../controllers/passport.js').pass,
passportDeserialize = require('../controllers/passport.js').pass,
FacebookStrategy = require('passport-facebook').Strategy;

exports.config = function(app) {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/../views');
  console.log('view path', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'asfda4845sdfas0sadf2' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/../public')));
  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};