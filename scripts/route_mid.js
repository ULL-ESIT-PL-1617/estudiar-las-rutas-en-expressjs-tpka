var express = require('express')
var app = express()
var router = express.Router()


var port = process.env.PORT || 5000



//vist /user/*

app.set('view engine', 'ejs');

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
  // render user page with given arguments
  res.render('user', {title: "ID not 0: normal page", user: req.params.id})
})

// handler for the /user/:id path, render same page with different arguments
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('user', {title: "ID 0: admin page", user: req.params.id})
})


//in case any error
//this would send a message error to the client and log us the error, and stop the app
app.use(function (err, req, res, next) {
  res.status(500).send('Something went wrong!')
  console.error(err.stack)

})

// mount the router on the app
app.use('/', router)


var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
