var lp = require('../lib/').profile;
var url = 'https://www.linkedin.com/in/nelsonic';
lp(url, function(err, data){
  console.log(JSON.stringify(data,null,2));
})
