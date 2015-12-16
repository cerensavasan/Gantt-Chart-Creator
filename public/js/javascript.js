//generating table  
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
            alert ("Only 21 days allowed. Please try again");
          } else {
            var divCal = document.getElementById('calendar');
            divCal.innerHTML = req.responseText;
            divCal.innerHTML += "";
          }
        }
      
    }
    
    req.open('POST', '/calendar', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send("dates=" + dates);
}

//submitted form to create task
function createTask() {
  
  console.log("Someone clicked the +");
  var nameTask = document.getElementById('taskNameInp');
  var startTask = document.getElementById('taskStartInp');
  var endTask = document.getElementById('taskEndInp');
  var detailsTask = document.getElementById('taskDetailsInp');
  var membersTask = document.getElementById('taskMembersInp');
  
  console.log("Task Name received: " + nameTask.value);
  console.log("Task Start Date received: " + startTask.value);
  console.log("Task End Date received: " + endTask.value);
  console.log("Task Start Date received: " + detailsTask.value);
  console.log("Task End Date received: " + membersTask.value);

  var myTable = document.getElementById("generatedCalendar");
  // add new row at the bottom-1 position
  var row = myTable.insertRow(myTable.rows.length);
  var newCells = [];
  var numColumns = myTable.rows[0].cells.length;
  console.log("We have this many columns: " + numColumns);
  // Insert new cells
  for(var j = 0; j < numColumns; j++) {
    newCells[j] = row.insertCell(0);
    console.log("created cell");
  }

  //first cell is name of task
  newCells[numColumns-1].innerHTML = nameTask.value;
  
  //finding the dates of task and coloring those cells
  var receivedIdentifiers = "";
  var taskDates = startTask.value + "," + endTask.value;
  console.log("Task dates I'm sending: " + taskDates);
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if( req.readyState !== XMLHttpRequest.DONE )
     return;

    if(req.status === 200) {
      receivedIdentifiers = req.responseText;
      console.log("Inside createTask I received: ", receivedIdentifiers);
      var dateIdentifiers = receivedIdentifiers.split(',');
      changeCellColors(dateIdentifiers);
    }
  }
 
  req.open('POST', '/getIdentifiers', true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.send("taskdates=" + taskDates);
}

function changeCellColors(identifiers){
  var myTable = document.getElementById("generatedCalendar");
  var firstRowCells = myTable.rows[0].cells;
  var firstRowContains = [];
  console.log("testing cell text acquire: " , firstRowCells[1].innerhtml);
  
  for(var k=0; k < firstRowCells.length; k++ ){
    firstRowContains[k] = firstRowCells[k].innerhtml; 
    console.log("First row contains following dates: " + firstRowContains[k]);
  }
  
  for(var l=0; l < firstRowContains.length; l++ ){
    for(var p=0; p < identifiers.length; p++){
      console.log("Comparing following strings now: " + firstRowContains[l] + " and " + identifiers[p]);
      var n = firstRowContains.indexOf(identifiers[p]);
      if(n>-1){
        console.log("omg found a date match, switching to red");
        firstRowCells[l].style.backgroundColor = "red";
      }
    }
  }
}

//reveal task form when + is clicked
function createTaskInp(){
  console.log("About to reveal hidden task form");
  document.getElementById("addTaskForm").hidden = false;
  console.log("APPEARED");
}