var express = require('express'),
http = require('http'),
path = require('path'),
app = express(),
requestHandler = require('./controllers/requestHandlers.js'),
passport = require('passport'),
passportInitialization = require('./controllers/passport.js'),
passportSerialize = require('./controllers/passport.js').pass,
passportDeserialize = require('./controllers/passport.js').pass,
loggedIn = require('./controllers/middleware.js').loggedIn,
FacebookStrategy = require('passport-facebook').Strategy,
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
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
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
