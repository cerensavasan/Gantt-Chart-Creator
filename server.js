var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var xml2js = require('xml2js');

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
    
    //calculate how many days in between
    var parsedDate1 = parseDate(datesArray[0]);
    var parsedDate2 = parseDate(datesArray[1]);
    console.log("The parsed date 1 contains: " + parsedDate1);
    console.log("The parsed date 2 contains: " + parsedDate2);
    
    var numDays = daydiff(parsedDate1, parsedDate2);
    console.log(numDays);
    
    //create array of dates
    var array_dates = getDates(parsedDate1, parsedDate2);
    
    
    
    var stringToSave = ""; 
    
    stringToSave += "<table>"
    stringToSave += "<tr>"
    for(var j = 0; j < numDays; j++) {
       stringToSave += "<td id='topCell_" + j + "'>"+  +"</td>"  
    }
    stringToSave += "<tr>"
    
   
    //read table on xml file
    var parser = xml2js.Parser();
    var loadedXML = fs.readFileSync('table.xml').toString().trim();
    parser.parseString(loadedXML, function (err, data) {
    console.log(data);
    });
    
    
    var processedXML;
    
    //write the table to the xml file
    fs.writeFileSync('table.xml', processedXML);
    
    
    //send the created table to the client side
   
});

app.listen(port, function () {
    console.log('App is listening on port ' + port);
});


function parseDate(str) {
    var mdy = str.split('-');
    var year = mdy[0];
    var month = mdy[1];
    var day = mdy[2];
    
    return new Date(year, month, day);
}

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}


Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
