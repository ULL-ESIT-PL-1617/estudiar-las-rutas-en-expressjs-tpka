var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var path = require('path');

var subapp = express()

app.locals.title = "API-app"

app.locals.email = "API@api.com"

app.locals.connected = true

var port = process.env.PORT || 5000


var options = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
//visit /app, /email
//visit /yourdata
//visit /response

app.get('/', function(req, res, next){
res.write("Use of variables and cookies     Visit /admin/app, /admin/email, /response")})
//subapp in /admin
subapp.use('/', express.static(path.join(__dirname, '/../public'), options))

//   /admin/app
subapp.use('/app', function(req, res){
  res.send('This app name is: ' + app.locals.title)
})


//   /admin/email
subapp.use('/email', function(req, res){
  res.send('This app email is: ' + app.locals.email)
})


//  param :user
app.param('user', function(req, res, next, admin){
  res.write('You specified a user')
  next()
})

/*app.get('/yourcookie', function(req, res, next){
  console.log('Cokies: ' + req.cookies)
})*/


//shows your data
app.get('/yourdata', function(req, res, next){
  res.write('Cookies: ' + req.cookies.name + '\n')
  res.write('Cookies: ' + req.cookies.name + '\n')
  res.write('IP: ' + req.ip + '\n')
  res.write('Method: ' + req.method + '\n')
  res.write('OriginalUrl: ' + req.originalUrl + '\n')
  res.write('Path: ' + req.path + '\n')
  res.write('Protocol: ' + req.protocol + '\n')
  next()
})

app.get('/response', function(req, res){
  res.cookie('name', 'alu', {expire : new Date() + 9999, domain: 'example.com', path: 'response', httpOnly: false}).send("Cookie was set. Now visit /yourdata");
//  res.send("Cookie was set. Now visit /yourdata")
//  res.end()
});

//    /user/:user
app.get('/user/:user', function(req, res, next){
  console.log("Someone got admin")
  next()
})

app.get('/users.*', function(req, res, next){
  res.write('You inserted a user')
  next()
})





app.use(function(req, res){
  res.end()
})
app.use('/admin', subapp)


var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  console.log('Subapp listening on: ' + subapp.path())

});
