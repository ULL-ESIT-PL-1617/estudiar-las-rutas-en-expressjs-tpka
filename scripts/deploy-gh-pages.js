var ghpages = require('gh-pages');
var path = require('path');
ghpages.publish(path.join(__dirname, '/../gh-pages'),{
}, function(err){
     console.log(err);
});
