var express = require('express')
var app = express()
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('gh-pages'));

app.get('/', function (req, res) {
  //res.send('Hello World!')
  res.render('index', { title: 'Express' });
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

})
