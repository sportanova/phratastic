var User = require('../models/User.js').User,
Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW);

exports.home = function(req, res) {
  res.redirect('/back#home');
};

exports.back = function(req, res){
  res.render('back');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
  });
  res.render('loggedOut');
};

exports.memberConfirmGet = function(req, res){
  User.find({ where: {id: req.session.userId}}).success(function(user) {
    res.json(user);
  });
};

exports.memberConfirmPost = function(req, res){
  console.log('this is the user', User);
  User.find({ where: {id: req.session.userId}}).success(function(user) {
    if(res.req.body.confirm === 'nerd') {
      user.role = 'member';
      user.save().success(function() {});
        res.redirect('/back#recruits');
    } else {
      res.redirect('/back#recruitHome');
    }
  });
};

exports.populateRecruitsList = function(req, res){
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
            id: recruit.recruitID,
            upVotes: 0,
            downVotes: 0
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
        var location = users[i].location.split(', ');
        var jsonUser = {
          id: users[i].id,
          firstName: users[i].f_name,
          lastName: users[i].l_name,
          bio: users[i].bio,
          city: location[0] || '',
          state: location[1] || '',
          birthday: new Date().getFullYear() - parseInt(users[i].birthday.substr(6,4)),
          upVote: userVotes[users[i].id].upVotes,
          downVote: userVotes[users[i].id].downVotes
        };
        usersArray.push(jsonUser);
      }
      res.json(usersArray);
    });
  });
}