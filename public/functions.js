/*--  reset page if relaod  --*/
document.getElementById("form").reset();

/*--  set date du jour en minimum  --*/
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

/*--  set min value to second calendar  --*/
function setminvalue() {
  if (document.getElementById("date").value=="") {
    document.getElementById("date2").setAttribute("min", today);
  } else {
    document.getElementById("date2").setAttribute("min", document.getElementById("date").value);
  }
}


/*------------------------------  Autocomplete  ------------------------------------*/
var currentFocus;
var inp = document.getElementById("searchbar");

function autocomplete(result) {
  var a, b, i, val = $("#searchbar").val();
  closeAllLists();
  if (!val) { return false;}
  if (result.length == 0) {
    console.log("no result");
    return false;
  }
  currentFocus = -1;

  a = document.createElement("DIV");
  a.setAttribute("id","searchbar autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  inp.parentNode.appendChild(a);

  for (i = 0; i < result.length; i++) {
    b = document.createElement("DIV");
    b.innerHTML = "<strong>" + val + "</strong>";
    b.innerHTML += result[i].substring(val.length);
    b.innerHTML += "<input type='hidden' value='" + result[i] + "'>";
    b.addEventListener("click", function(e) {
      inp.value = this.getElementsByTagName("input")[0].value;
      closeAllLists();
    });
    a.appendChild(b);
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

inp.addEventListener("keydown", function(e) {
    var x = document.getElementById("searchbar autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) { //down
      currentFocus++;
       addActive(x);
    } else if (e.keyCode == 38) { //up
      currentFocus--;
       addActive(x);
    } else if (e.keyCode == 13) { //enter
      if (currentFocus > -1) {
        e.preventDefault();
        if (x) x[currentFocus].click();
        currentFocus=-1;
      }
    }
});

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  x[currentFocus].classList.add("autocomplete-active");
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
