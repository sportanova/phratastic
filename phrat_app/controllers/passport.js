var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
// User = require('./User.js').User,
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root');
