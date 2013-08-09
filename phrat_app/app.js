var express = require('express'),
http = require('http'),
path = require('path'),
app = express(),
requestHandler = require('./controllers/requestHandlers.js'),
passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW);

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

app.get('/', requestHandler.home);

var User;
passport.use(new FacebookStrategy({
    clientID: process.env.phratasticDevClientID,
    clientSecret: process.env.phratasticDevSecretID,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function (){
      User = sequelize.define('User', {
        id: Sequelize.STRING,
        f_name: {
          type: Sequelize.STRING,
          defaultValue: ''
        },
        l_name: {
          type: Sequelize.STRING,
          defaultValue: ''
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: ''
        },
        location: {
          type: Sequelize.STRING,
          defaultValue: ''
        },
        birthday: {
          type: Sequelize.STRING,
          defaultValue: 0
        },
        bio: {
          type: Sequelize.STRING,
          defaultValue: ''
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'recruit'
        }
      });

      User.find({ where: {id: profile.id}}).success(function(user){
        if(user){
        } else {
          User.sync().success(function() {
            newUser = User.build({
              id: profile.id,
              f_name: profile.name.givenName,
              l_name: profile.name.familyName,
              email: profile.emails[0].value,
              location: typeof profile._json.location === 'object' ? profile._json.location.name : '',
              birthday: profile._json.birthday,
              bio: profile._json.bio
            });
            newUser.save().success(function() {
            });
          });
          sequelize.query("INSERT INTO Votes (memberID, recruitID, upVote, downVote) VALUES (" + 1 + "," + profile.id + "," + 0 + "," + 0 + ") ON DUPLICATE KEY UPDATE downVote=0, upVote=0").success(function(users) {
          });
        }
      });
    return done(null, profile);
    });
  }
));

app.get('/back', requestHandler.back);
app.get('/loggedOut', requestHandler.logout);
app.get('/memberConfirm', requestHandler.memberConfirmGet);
app.post('/memberConfirm', requestHandler.memberConfirmPost);
app.put('/recruits', requestHandler.vote);
app.get('/recruits', requestHandler.populateRecruitsList);
app.get('/auth/facebook', requestHandler.passportScope.pass);
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { failureRedirect: '/back#home' }), requestHandler.passportCallback);

var loggedIn = function(req, res, next){
  if(req.session.userId){
    next();
  } else {
    res.redirect('/');
  }
};


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
