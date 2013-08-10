var express = require('express'),
loggedIn = require('../controllers/middleware.js').loggedIn,
passport = require('passport'),
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
  app.get('/back', requestHandler.back);
  app.get('/', requestHandler.home);
  app.get('/loggedOut', requestHandler.logout);
  app.get('/memberConfirm', loggedIn, requestHandler.memberConfirmGet);
  app.post('/memberConfirm', loggedIn, requestHandler.memberConfirmPost);
  app.put('/recruits', loggedIn, requestHandler.vote);
  app.get('/recruits', loggedIn, requestHandler.populateRecruitsList);
  app.get('/auth/facebook', requestHandler.passportScope.pass);
  app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { failureRedirect: '/back#home' }), requestHandler.passportCallback);
};