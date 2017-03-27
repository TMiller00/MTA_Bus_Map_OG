var express = require('express');
var request = require('request');
var app = express();

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/css'));

app.get('/', function(request, response) {
    response.send("var SITE='" + process.env.SITE + "'");
    response.render('index.html');
});

const mtakey = process.env.mtakey;
const mtaURL = 'https://bustime.mta.info/api/siri/vehicle-monitoring.json?key=' + mtakey;

app.use('/api/*', function(req, res) {
    var url = mtaURL;
    req.pipe(request(url)).pipe(res);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
