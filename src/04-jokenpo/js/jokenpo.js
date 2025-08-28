$(document).ready(function () {
  $("#btnPlay").on("click", function () {
    if ($("input[name='group']:checked").length === 0) {
      alert("Please select an option");
    } else {
      let sorts = Math.floor(Math.random() * 3);

      switch (sorts) {
        case 0:
          $("#pc").attr("src", "../../assets/images/pcpedra.png");
          break;
        case 1:
          $("#pc").attr("src", "../../assets/images/pcpapel.png");
          break;
        case 2:
          $("#pc").attr("src", "../../assets/images/pctesoura.png");
          break;
      }
      result(sorts);
    }
  });

  $("#btnReset").on("click", function () {
    $("#pc").attr("src", "../../assets/images/pc.png");
    $("#score").html("");
  });

  function result(sorts) {
    if (
      ($("#rock").is(":checked") && sorts === 0) ||
      ($("#paper").is(":checked") && sorts === 1) ||
      ($("#scissors").is(":checked") && sorts === 2)
    ) {
      $("#score").html("It's a tie");
    } else if (
      ($("#rock").is(":checked") && sorts === 2) ||
      ($("#paper").is(":checked") && sorts === 0) ||
      ($("#scissors").is(":checked") && sorts === 1)
    ) {
      $("#score").html("Player wins");
    } else {
      $("#score").html("Computer wins");
    }
  }

});
