$(document).ready(function () {
  const fillForm = (address) => {
    $("#streetAddress").val(address.logradouro).attr("readonly", true);
    $("#neighborhood").val(address.bairro).attr("readonly", true);
    $("#city").val(address.localidade).attr("readonly", true);
    $("#state").val(address.uf).attr("readonly", true);
  };

  const zipCodeSize = 8;
  const isNumeric = (number) => /^[0-9]+$/.test(number);
  const isValidZipcode = (zipcode) => zipcode.length == zipCodeSize && isNumeric(zipcode);

  const showMessage = (text) => {
    $("#message").text(text);
  };

  const clearMessage = () => {
    $("#message").text("");
  };

  const searchZipcode = () => {
    const zipcode = $("#zipcode").val().replace("-", "");
    clearMessage();

    if (zipcode === "") {
      showMessage("The Zip Code field is required.");
      return;
    }

    const baseURL = `https://viacep.com.br/ws/${zipcode}/json/`;

    if (isValidZipcode(zipcode)) {
      $.ajax({
        url: baseURL,
        dataType: "json",
        success: function (address) {
          if (address.hasOwnProperty("erro")) {
            $("#streetAddress").val("Zip Code not found!");
          } else {
            fillForm(address);
          }
        },
        error: function () {
          $("#streetAddress").val("An error occurred during the search!");
        },
      });
    } else {
      $("#streetAddress").val("Invalid Zip Code!");
    }
  };

  const clearForm = () => {
    $("#zipcode").val("");
    $("#streetAddress").val("");
    $("#neighborhood").val("");
    $("#city").val("");
    $("#state").val("");
    clearMessage();
  };

  $("#search").on("click", searchZipcode);
  $("#clear").on("click", clearForm);
});
