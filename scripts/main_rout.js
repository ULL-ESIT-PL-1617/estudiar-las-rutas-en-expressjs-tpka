var express = require('express')
var app = express()
var path = require('path');

var port = process.env.PORT || 5000;

var router = require('./router');


//mount router in /

app.use('/', router);  //the router will act from the path /

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
