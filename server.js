var express = require('express');
var app = express();

const mtakey = process.env.mtakey;
const mtaURL = 'https://bustime.mta.info/api/siri/vehicle-monitoring.json?key=' + mtakey;


// var config = {
//   mtakey: process.env.mtakey,
//   mapkey: process.env.mapkey
// };

// var config = {
//   mtakey: '578bd03c-8479-40b9-9634-e1908ad83c94',
//   mapkey: 'pk.eyJ1IjoidG1pbGxlciIsImEiOiJ6dGRpN3ZvIn0.ndthw82iivvOXpvybGob4A'
// }

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'), function(request, response) {
  req.pipe(request(mtaURL)).pipe(response);
});
// app.use(express.static(__dirname + '/css'));

app.get('/', function(request, response) {
  response.send(config);
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
