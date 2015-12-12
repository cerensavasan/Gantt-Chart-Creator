var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', function (req, res) {
    console.log('sendfile get is working');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/', function (req, res) {
    console.log('sendfile get is working');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/calendar', function (req, res) {
    var datesReceived = req.body.dates;
    console.log("Dates received is: " + datesReceived);
    var datesArray = datesReceived.split(',');
    console.log("The datesArray contains: " + datesArray);
});


app.listen(port, function () {
    console.log('App is listening on port ' + port);
});