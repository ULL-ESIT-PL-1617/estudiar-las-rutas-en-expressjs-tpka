var express = require('express');
var router = express.Router();


//visit /, /about, /chapter1 for different response


// middleware that is specific to this router



//always executes
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});
// define the home page route
router.get('/', function (req, res) {
  res.send('You are in the root');
});
// define the about route
router.get('/about', function (req, res) {
  res.send('About us');
});
 //with this router we can get requests to the chapter1
router.get('/chapter1', function (req, res) {
  res.send('You are in chapter1');
});
//with this router we can get requests to the chapter2
router.get('/chapter2', function (req, res) {
  res.send('You are in chapter2');
});



module.exports = router
