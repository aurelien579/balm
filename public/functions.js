function fixclick() {
  var x = document.getElementById("barre");
  x.style.display = "none";
}
function myFunction() {
    var x = document.getElementById("barre");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

$(function() {
  fixclick();
});
