exports.loggedIn = function(req, res, next){
  if(req.session.userId){
    next();
  } else {
    res.redirect('/index#home');
  }
};