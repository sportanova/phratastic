var express = require('express'),
routes = require('./routes'),
user = require('./routes/user'),
http = require('http'),
path = require('path'),
app = express(),
passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
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

app.get('/', function(req, res) {
  res.redirect('/back#home');
});
app.get('/users', user.list);

app.get('/login', function(req, res){
  res.render('login', { title: 'Express' });
});

var User;
passport.use(new FacebookStrategy({
    clientID: '696227333737725',
    clientSecret: 'b5c82944f3f4dee207900526d32fa45c',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function (){
      User = sequelize.define('User', {
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
        },
        bio: {
          type: Sequelize.STRING,
          defaultValue: 'N/A'
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
              location: typeof profile._json.location === 'object' ? profile._json.location.name : 'n/a',
              bio: profile._json.bio
            });
            newUser.save().success(function() {
            });
          });
        }
      });
      // used to recreate the table since User.find errors if no table present
      // User.sync().success(function() {
      //   newUser = User.build({
      //     id: profile.id,
      //     f_name: profile.name.givenName,
      //     l_name: profile.name.familyName,
      //     email: profile.emails[0].value,
      //     location: profile._json.location.name,
      //     birthday: 'old'
      //   });
      //   newUser.save().success(function() {
      //   });
      // });
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

// should be loggedIn
app.get('/memberConfirm', function(req, res){
  User.find({ where: {id: req.session.userId}}).success(function(user) {
    res.json(user);
  });
});

// should be loggedIn
app.post('/memberConfirm', function(req, res){
  User.find({ where: {id: req.session.userId}}).success(function(user) {
    if(res.req.body.confirm === 'nerd') {
      user.role = 'member';
      user.save().success(function() {});
        res.redirect('/back#recruits');
    } else {
      res.redirect('/back#recruitHome');
    }
  });
});

// should be loggedIn
app.put('/recruits', function(req, res){
  if(res.req.body.vote === 'addUpVote') {
    sequelize.query("INSERT INTO Votes (memberID, recruitID, upVote) VALUES (" + req.session.userId + "," + res.req.body.id + "," + 1 + ") ON DUPLICATE KEY UPDATE downVote=0, upVote=1").success(function(users) {
    });
  } else if(res.req.body.vote === 'addDownVote') {
    sequelize.query("INSERT INTO Votes (memberID, recruitID, downVote) VALUES (" + req.session.userId + "," + res.req.body.id + "," + 1 + ") ON DUPLICATE KEY UPDATE downVote=1, upVote=0").success(function(users) {
    });
  }
  res.json('');
});

// should be loggedIn
app.get('/recruits', function(req, res){
  var usersArray = [];
  sequelize.query("SELECT * FROM Users WHERE role='recruit'").success(function(users) {
    var userVotes = {};
    sequelize.query("SELECT * FROM Votes").success(function(votes) {
      for(var i = 0; i < votes.length; i++) {
        recruit = votes[i];
        if(userVotes[recruit.recruitID] && recruit.upVote){
          userVotes[recruit.recruitID]['upVotes']++;
        } else if(userVotes[recruit.recruitID] && recruit.downVote) {
          userVotes[recruit.recruitID]['downVotes']++;
        } else {
          userVotes[recruit.recruitID] = {
            id: recruit.recruitID
          };
          if(recruit.upVote) {
            userVotes[recruit.recruitID]['upVotes'] = 1;
            userVotes[recruit.recruitID]['downVotes'] = 0;
          } else if (recruit.downVote) {
            userVotes[recruit.recruitID]['upVotes'] = 0;
            userVotes[recruit.recruitID]['downVotes'] = 1;
          }
        }
      }
      for(var i = 0; i < users.length; i++) {
        var jsonUser = {
          id: users[i].id,
          firstName: users[i].f_name,
          lastName: users[i].l_name,
          bio: users[i].bio,
          upVote: userVotes[users[i].id].upVotes,
          downVote: userVotes[users[i].id].downVotes
        };
        usersArray.push(jsonUser);
      }
      res.json(usersArray);
    });
  });
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_location', 'user_about_me']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res){
    console.log(req.user);
    req.session.userId = req.user.id;
    User.find({ where: {id: req.session.userId}}).success(function(user) {
      if(user !== null) {
        var role = user.dataValues.role;
        if(role === 'recruit') {
          res.redirect('/back#recruitHome');
        } else if(role === 'member') {
          res.redirect('/back#recruits');
        }
      } else {
        res.redirect('/back#recruitHome');
      }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
