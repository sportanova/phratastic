var Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW);

exports.User = sequelize.define('User', {
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
