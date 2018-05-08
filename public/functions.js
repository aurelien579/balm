document.getElementById("form").reset(); /*reset page if relaod */

/* set date du jour en minimum */
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

/*------------------------------*/

function setminvalue() { /* set min value to second calendar */
  if (document.getElementById("date").value=="") {
    document.getElementById("date2").setAttribute("min", today);
  } else {
    document.getElementById("date2").setAttribute("min", document.getElementById("date").value);
  }
}
