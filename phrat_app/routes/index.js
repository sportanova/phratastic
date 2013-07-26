var Sequelize = require('sequelize');
// // var postgres  = require('sequelize-postgres').postgres;
var sequelize = new Sequelize('test', 'root');

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  message: Sequelize.STRING
});

console.log(User)
User.sync().success(function() {
  // var newUser = User.build({username: 'stephen', message: 'holla'});
});

exports.index = function(req, res){
  console.log('test 1')
  res.render('index', { title: 'Express' });
};