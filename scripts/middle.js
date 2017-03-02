var express = require('express');
var app = express()
var router = express.Router()
var path = require('path');



app.use(express.static(path.join(__dirname, '/../gh-pages')));
var port = process.env.PORT || 5000;

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  res.send('You are a normal user');
})

// handler for the /user/:id path, which shows
router.get('/user/:id', function (req, res, next) {
  res.send('You are the admin');
})

// mount the router on the app
app.use('/', router)


var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
