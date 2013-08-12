var express = require('express'),
middleware = require('../controllers/middleware.js'),
passport = require('passport'),
passportInitialization = require('../controllers/passport.js'),
passportSerialize = require('../controllers/passport.js').pass,
passportDeserialize = require('../controllers/passport.js').pass,
FacebookStrategy = require('passport-facebook').Strategy,
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW),
requestHandler = require('../controllers/requestHandlers.js');

exports.routes = function(app) {
  config = require('../config/config.js').config(app);
  app.get('/index', requestHandler.back);
  app.get('/', requestHandler.home);
  app.get('/loggedOut', middleware.logout, requestHandler.logout);
  app.get('/memberConfirm', middleware.loggedIn, requestHandler.memberConfirmGet);
  app.post('/memberConfirm', middleware.loggedIn, requestHandler.memberConfirmPost);
  app.put('/recruits', middleware.loggedIn, requestHandler.vote);
  app.get('/recruits', middleware.loggedIn, requestHandler.populateRecruitsList);
  app.get('/auth/facebook', requestHandler.passportScope.pass);
  app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { failureRedirect: '/index#home' }), requestHandler.passportCallback);
};