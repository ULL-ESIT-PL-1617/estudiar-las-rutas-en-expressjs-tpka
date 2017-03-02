var express = require('express')
var app = express()
var path = require('path');

var port = process.env.PORT || 5000;



// visit / with POST, GET, PUT, DELETE HTTP request

//simple ejemplo de trackear distintas peticiones http
app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/', function (req, res) {
  res.send('Got a POST request')
});

app.put('/', function (req, res) {
  res.send('Got a PUT request at /')
});

app.delete('/', function (req, res) {
  res.send('Got a DELETE request at /')
});

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
