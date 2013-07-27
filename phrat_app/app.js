var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , base64url = require('b64url')
  , crypto = require('crypto')
  , app = express()
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , Sequelize = require('sequelize')
  , sequelize = new Sequelize('test', 'root');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/channel', function(req, res){
  res.render('channel', { title: 'Express' });
});

app.get('/login', function(req, res){
  res.render('login', { title: 'Express' });
});

app.get('/home', function(req, res){
  res.render('home', { title: 'Express' });
});

passport.use(new FacebookStrategy({
    clientID: '696227333737725',
    clientSecret: 'b5c82944f3f4dee207900526d32fa45c',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    console.log('anonymous function called');
    var User = sequelize.define('User', {
        username: Sequelize.STRING,
        birthday: Sequelize.STRING,
        message: Sequelize.STRING
      });

    User.sync().success(function() {
      var newUser = User.build({username: 'esteban', birthday: 'old'});
      newUser.save().success(function() {
      });
    });
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

  // var User = sequelize.define('User', {
  //   username: Sequelize.STRING,
  //   birthday: Sequelize.STRING,
  //   message: Sequelize.STRING
  // });

  // User.sync().success(function() {
  //   var newUser = User.build({username: fbInfo.registration.name, birthday: fbInfo.registration.birthday});
  //   newUser.save().success(function() {
  //   });
  // });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
