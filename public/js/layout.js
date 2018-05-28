var path = window.location.pathname;
var page = path.split("/").pop();
var p = document.getElementById("form-layout");
if (page == "") {
  p.style.display = "none";
} else {
  p.style.display = "";
}
