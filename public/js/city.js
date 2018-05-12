$(function() {
  $("#searchbar").keyup(function(e) {
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
        url: '/autocomplete?query=' + $("#searchbar").val(),
        success: function(result) {
          //console.log(result, $(".typeahead").val());
          var data = [];
          for (var k = 0; k < result.length; k++) {
            data[k] = result[k].name;
          }
          console.log(data);
          autocomplete(data);
        }
      });
    }
  });
});
