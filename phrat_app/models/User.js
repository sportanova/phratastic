Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root');
exports.User = sequelize.define('User', {
    id: Sequelize.STRING,
    f_name: Sequelize.STRING,
    l_name: Sequelize.STRING,
    email: Sequelize.STRING,
    location: Sequelize.STRING,
    birthday: Sequelize.STRING
  });