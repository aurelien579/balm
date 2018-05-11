$(function() {

  $("#searchbar").keyup(function(e) {
    $.getJSON({
      url: '/autocomplete?query=' + $("#searchbar").val(),
      success: function(result) {
        //console.log(result, $(".typeahead").val());
        var data = [];
        for (var k=0; k<result.length; k++) {
          data[k]=result[k].name;
        }
        console.log(data);
        autocomplete(data);
      }
    });

  });


  /*$.get({
    url: '/autocomplete?query=Ly',
    success: function(result) {
      console.log(result);
      $("#searchbar").typeahead({
        source: result
      });
    }
  })*/

});
