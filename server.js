var express = require('express');
var app = express();

var config = {
  mtakey: process.env.mtakey,
  mapkey: process.env.mapkey
};

console.log(config);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/css'));

app.get('/', function(request, response) {
  response.render('index.html', config);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
