var express = require('express'),
http = require('http'),
path = require('path'),
app = express(),
routes = require('./routes/routes.js').routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
