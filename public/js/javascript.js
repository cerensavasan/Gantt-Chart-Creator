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
            alert ("Only 14 days allowed. Please try again");
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
  
  var toSend = "";
  toSend += nameTask.value + "," + startTask.value + "," + endTask.value + "," + detailsTask.value + "," +  membersTask.value;
  console.log("Data about task I'm sending: " + toSend);
  
  var req = new XMLHttpRequest();
  
  req.onreadystatechange = function() { 
    if( req.readyState !== XMLHttpRequest.DONE){
      return;
        }
        
        if(req.status === 200) {
          console.log("is it already creating a task?");
          $("#generatedCalendar").find('tbody').append($('<tr>'));
          $("#generatedCalendar").find('tbody').append($('<td></td>'));
          $("#generatedCalendar").find('tbody').append($('</tr>'));         
        }
    }
    
    req.open('POST', '/tasking', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send("taskData=" + toSend);
}

//reveal task form when + is clicked
function createTaskInp(){
  console.log("About to reveal hidden task form");
  document.getElementById("addTaskForm").hidden = false;
  console.log("APPEARED");
}