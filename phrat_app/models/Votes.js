var Sequelize = require('sequelize'),
sequelize = new Sequelize('test', 'root', process.env.mySQLPW);

sequelize.query("CREATE TABLE Votes (memberID VARCHAR(30), recruitID VARCHAR(30), \
  upVote INT DEFAULT 0, downVote INT DEFAULT 0, PRIMARY KEY (memberID, recruitID))")
    .success(function(users) {
    });