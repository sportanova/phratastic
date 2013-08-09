var User = require('../models/User.js').User;

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