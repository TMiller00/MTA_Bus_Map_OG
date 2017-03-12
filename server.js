var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/css'));

app.get('/', function(request, response) {
  var mapkey = '';
  var times = process.env.mapkey;
  response.send(mapkey);
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
