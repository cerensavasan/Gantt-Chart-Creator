//generating table
function populate(){
  $('body').append('<div id="container" display="table">');
  for(j = 0; j < 8; j++) {
      $('body').append('<div id="row' + j + '" display="table-row">');
      for(i = 0; i < 8; i++) {
        $('body').append('<div class="square"></div>');
      }
  }
  console.log("populating done");
  }