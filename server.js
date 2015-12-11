var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.post('/', function (req, res) {
    console.log('sendfile get is working');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/', function (req, res) {
    console.log('sendfile get is working');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/dates', function (req, res) {
    // date 1 is this
    // date 2 is this    
    console.log('dates received, thanks');
});


app.listen(port, function () {
    console.log('App is listening on port ' + port);
});