//generating table
function populate(){
  console.log("inside populate");
  var divCal = document.getElementById('calendar');
  
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
  
  var req = new XMLHttpRequest();
  
  req.onreadystatechange = function() {
    
        if( req.readyState !== XMLHttpRequest.DONE )
          return;

        if(req.status === 200) {
          //buildList(JSON.parse(req.responseText));
          //el.value = "";
          //mydiv.innerHTML = JSON.parse(req.responseText);
        }
      
    }
    
    req.open('POST', '/calendar', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send('date1='+date1.value, 'date2='+date2.value);

}