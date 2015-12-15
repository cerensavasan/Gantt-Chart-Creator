//generating table

function populate(){
  console.log("inside populate");
  
  divCal.innerHTML = "Test";
  
  // $('body').append('<div id="container" display="table">');
  // for(j = 0; j < 8; j++) {
  //     $('body').append('<div id="row' + j + '" display="table-row">');
  //     for(i = 0; i < 8; i++) {
  //       $('body').append('<div class="square"></div>');
  //     }
  // }
  console.log("populating done");
  }
  
  
function displayCalendar() {
  var date1 = document.getElementById('start');
  var date2 = document.getElementById('end');
  console.log("Date 1 received: " + date1);
  console.log("Date 2 received: " + date2);
  
  var dates = date1.value + "," + date2.value;
  console.log("Dates I'm sending: " + dates);
  
  var req = new XMLHttpRequest();
  
  req.onreadystatechange = function() {
    
        if( req.readyState !== XMLHttpRequest.DONE )
          return;

        if(req.status === 200) {
          
          if(req.responseText == "DayConstraint"){
            alert ("Only 14 days allowed. Please try agains");
          } else {
            var divCal = document.getElementById('calendar');
            divCal.innerHTML = req.responseText;
            divCal.innerHTML += "";
          }

         
          //populate html with the table sent from the server side
          
          //create this function below
          //buildCalendar(JSON.parse(req.responseText));
          //el.value = "";
          //mydiv.innerHTML = JSON.parse(req.responseText);
        }
      
    }
    
    req.open('POST', '/calendar', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send("dates=" + dates);
}