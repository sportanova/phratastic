var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
User = require('./User.js').User;

exports.pass = passport.use(new FacebookStrategy({
    clientID: '696227333737725',
    clientSecret: 'b5c82944f3f4dee207900526d32fa45c',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
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
              // location: profile._json.location.name,
              birthday: 'old'
            });
            newUser.save().success(function() {
            });
          });
        }
      });
    return done(null, profile);
    });
  }
));