var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
User = require('../models/User.js').User,
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW);

exports.passportCreateUser = {
  pass: passport.use(new FacebookStrategy({
      clientID: process.env.phratasticDevClientID,
      clientSecret: process.env.phratasticDevSecretID,
      callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function (){
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
  ))
};

exports.serialize = {
  pass: passport.serializeUser(function(user, done){
    done(null, user);
  })
};

exports.deserialize = {
  type: passport.deserializeUser(function(obj, done){
    done(null, obj);
  })
};