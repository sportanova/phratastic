var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , base64url = require('b64url')
  , crypto = require('crypto')
  , app = express()

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/register', function(req, res){
  res.render('register', { title: 'Express' });
});

app.get('/login', function(req, res){
  res.render('login', { title: 'Express' });
});

app.get('/channel', function(req, res){
  res.render('channel', { title: 'Express' });
});

app.post('/hey', function(req, res){
  function parse_signed_request(signed_request, secret) {
    encoded_data = signed_request.split('.',2);
    // decode the data
    sig = encoded_data[0];
    json = base64url.decode(encoded_data[1]);
    data = JSON.parse(json); // ERROR Occurs Here!
    // check algorithm - not relevant to error
    if (!data.algorithm || data.algorithm.toUpperCase() != 'HMAC-SHA256') {
        console.error('Unknown algorithm. Expected HMAC-SHA256');
        return null;
    }
    // check sig - not relevant to error
    expected_sig = crypto.createHmac('sha256',secret).update(encoded_data[1]).digest('base64').replace(/\+/g,'-').replace(/\//g,'_').replace('=','');
    if (sig !== expected_sig) {
        console.error('Bad signed JSON Signature!');
        return null;
    }
    return data;
  }
  var fbInfo = parse_signed_request(req.body.signed_request, 'b5c82944f3f4dee207900526d32fa45c');
  console.log('signed request', fbInfo);
  res.render('just_registered', { title: 'Express' });

  var Sequelize = require('sequelize');
  var sequelize = new Sequelize('test', 'root');

  var User = sequelize.define('User', {
    username: Sequelize.STRING,
    birthday: Sequelize.STRING,
    message: Sequelize.STRING
  });

  User.sync().success(function() {
    var newUser = User.build({username: fbInfo.registration.name, birthday: fbInfo.registration.birthday});
    newUser.save().success(function() {
    });
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
