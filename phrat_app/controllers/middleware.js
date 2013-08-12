exports.loggedIn = function(req, res, next){
  if(req.session.userId){
    next();
  } else {
    res.redirect('/index#home');
  }
};

exports.logout = function(req, res, next){
  if(req.session.userId){
    req.session.destroy(function(){
    });
    next();
  } else {
    res.redirect('/index#logout');
  }
};