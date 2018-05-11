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


/*-----------------------------------------------------------------------*/

//autocomplete(document.getElementById("searchbar"));

function autocomplete(result, test) {
var inp = document.getElementById("searchbar");

var currentFocus;
inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    //close any already open lists of autocompleted values
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    //create a DIV element that will contain the items (values):
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    //append the DIV element as a child of the autocomplete container:
    this.parentNode.appendChild(a);




    //for each item in the array...
    for (i = 0; i < result.length; i++) {
      //check if the item starts with the same letters as the text field value:

      //create a DIV element for each matching element:
      b = document.createElement("DIV");
      //make the matching letters bold:
      b.innerHTML = "<strong>" + val + "</strong>";
      b.innerHTML += result[i].substring(val.length);
      b.innerHTML += "<input type='hidden' value='" + result[i] + "'>";
      b.addEventListener("click", function(e) {
      //insert the value for the autocomplete text field:
      inp.value = this.getElementsByTagName("input")[0].value;
      //close the list of autocompleted values,(or any other open lists of autocompleted values:
      closeAllLists();
      });
      a.appendChild(b);
    }
});
  //execute a function presses a key on the keyboard:
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        //If the arrow DOWN key is pressed,increase the currentFocus variable:
        currentFocus++;
        //and and make the current item more visible:
        addActive(x);
      } else if (e.keyCode == 38) { //up
        //If the arrow UP key is pressed,decrease the currentFocus variable:
        currentFocus--;
        //and and make the current item more visible:
        addActive(x);
      } else if (e.keyCode == 13) {
        //If the ENTER key is pressed, prevent the form from being submitted,
        e.preventDefault();
        if (currentFocus > -1) {
          //and simulate a click on the "active" item:
          if (x) x[currentFocus].click();
        }
      }
});

function addActive(x) {
  //a function to classify an item as "active":
  if (!x) return false;
  //start by removing the "active" class on all items:
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  //add class "autocomplete-active":
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  //a function to remove the "active" class from all autocomplete items:
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt) {
  //close all autocomplete lists in the document,except the one passed as an argument:
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
//execute a function when someone clicks in the document:
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});
}
var countries = ["Lyon", "Paris", "Toulouse", "Marseille", "Bordeaux", "Nime", "Clermont-Ferrant", "Angers"];
