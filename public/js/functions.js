

/*--  reset page if relaod  --*/
document.getElementById("form").reset();

/*$(function() {
  $("#date").datepicker({
    format: "yyyy-mm-dd",
    startDate: '+d1',
    autoclose: true,
    orientation: "bottom"
  }).on('changeDate', function(e){
    $('#date2').datepicker('setStartDate', e.date);
  });

  $("#date2").datepicker({
    format: "yyyy-mm-dd",
    startDate: '+d1',
    autoclose: true,
    orientation: "bottom"
  })
});

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("date").setAttribute("min", today);
*/

/*function setminvalue() {
  console.log("test");
  console.log(document.getElementById("date").value);
  console.log(document.getElementById("date2").datepicker);
  if (document.getElementById("date").value != "") {
    console.log(document.getElementById("date2").datepicker);
    document.getElementById("date2").setAttribute("startDate", document.getElementById("date").value);
  }
}*/
