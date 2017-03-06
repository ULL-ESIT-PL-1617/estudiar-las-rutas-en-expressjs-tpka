var ghpages = require('gh-pages');
var path = require('path');
var repogitbook = require('../package.json').repogitbook;

ghpages.publish(path.join(__dirname, '/../public'), {
  branch: 'master',
  repo: repogitbook.pedro
}, function(err){
     console.log(err);
});
