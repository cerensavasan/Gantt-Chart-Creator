var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', function (req, res) {
    console.log('sendfile get is working');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', function (req, res) {
    console.log('sendfile get is working');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function () {
    console.log('App is listening on port ' + port);
});