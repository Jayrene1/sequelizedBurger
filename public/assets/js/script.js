$(document).ready(function() {
  getBurgers();
    
  $("#add-burger").on("click", function(event) {
    event.preventDefault();
    var burgerData = {
      burger_name: $("#burger_text").val().trim()
    };    
    $.post("api/burgers", burgerData)
      .then(getBurgers);
  });



  function getBurgers() {
    $.get("/api/burgers", function(data) {
      console.log(data);
      $("#burgers").empty();
      $("#burgers-devoured").empty();
      $("#burgers-button").empty();
      for (var i = 0; i < data.length; i++) {
        var $pre = $("<pre>").text(`${data[i].id}. ${data[i].burger_name}`);
        var $button = $("<button>")
        .attr("class", "btn btn-light")
        .attr("value", data[i].id)
        .text("Devour");

        if (data[i].devoured === false) {
          $("#burgers").append($pre);
          $("#burgers").append($button);
        } else {
          $("#burgers-devoured").append($pre);
        }
      }

      $(".btn-light").on("click", function(event) {
        event.preventDefault();
        updateDevoured(this.value);
      });
    });
  }

  function updateDevoured(idNum) {
    $.ajax({
      url: "/api/burgers", 
      type: "PUT",
      data: {id: idNum}
    }).then(getBurgers);
  }

});
