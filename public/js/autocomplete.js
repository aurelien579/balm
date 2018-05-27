  $("#searchbar, #searchbar1, #searchbar2, #searchbar3").keyup(function(e) {
    var id = this.id;
    var name = this.name;
    let count = 0;
    let exeptions = [9, 13, 16, 17, 18, 20, 37, 38, 39, 40, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 192, 225];
    exeptions.forEach((ex) => {
      if (e.keyCode == ex) {
        console.log("ignored : ", e.keyCode);
        count += 1;
        return;
      }
    });
    if (count == 0) {
      $.getJSON({
        url: '/autocomplete?query=' + $("#" + id).val() + '&name=' + name,
        success: function(result) {
          var data = [];
          for (var k = 0; k < result.length; k++) {
            data[k] = result[k].name;
          }
          /*console.log(data);*/
          autocomplete(data, id);
        }
      });
    }
  });

var currentFocus;

function autocomplete(result, id) {
  var inp = document.getElementById(id);
  var a, b, i, val = $("#" + id).val();
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
}
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
