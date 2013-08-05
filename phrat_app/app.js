var express = require('express'),
routes = require('./routes'),
user = require('./routes/user'),
http = require('http'),
path = require('path'),
base64url = require('b64url'),
crypto = require('crypto'),
app = express(),
passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
// User = require('./models/User.js').User,
// pass = require('./models/passport.js'),
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root');

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

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

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/login', function(req, res){
  res.render('login', { title: 'Express' });
});

passport.use(new FacebookStrategy({
    clientID: '696227333737725',
    clientSecret: 'b5c82944f3f4dee207900526d32fa45c',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function (){
      var User = sequelize.define('User', {
        id: Sequelize.STRING,
        f_name: {
          type: Sequelize.STRING,
          defaultValue: 'n/a'
        },
        l_name: {
          type: Sequelize.STRING,
          defaultValue: 'n/a'
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: 'n/a'
        },
        location: {
          type: Sequelize.STRING,
          defaultValue: 'n/a'
        },
        birthday: {
          type: Sequelize.STRING,
          defaultValue: 'n/a'
        }
      });

      User.sync().success(function() {
        newUser = User.build({
          id: profile.id,
          f_name: profile.name.givenName,
          l_name: profile.name.familyName,
          email: profile.emails[0].value,
          location: profile._json.location.name,
          birthday: 'old'
        });
        newUser.save().success(function() {
        });
      });
    return done(null, profile);
    });
  }
));



app.get('/back', function(req, res){
  res.render('back');
});

app.get('/loggedOut', function(req, res){
  req.session.destroy(function(){
  });
  res.render('loggedOut', { title: 'Express' });
});

var loggedIn = function(req, res, next){
  if(req.session.userId){
    next();
  } else {
    res.redirect('/');
  }
};

app.get('/home', loggedIn, function(req, res){
  res.render('home');
});

// app.get('/recruits', loggedIn, function(req, res){
app.get('/recruits', function(req, res){
  var usersArray = [];
  User.findAll().success(function(users){
    for(var i = 0; i < users.length; i++) {
      var jsonUser = {
        firstName: users[i]['dataValues']['f_name'],
        lastName: users[i]['dataValues']['l_name']
      }
      usersArray.push(jsonUser);
    }
    console.log(usersArray);
    res.json(usersArray);
  });
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_location']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res){
    console.log(req.user.id);
    req.session.userId = req.user.id;
    res.redirect('home');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
