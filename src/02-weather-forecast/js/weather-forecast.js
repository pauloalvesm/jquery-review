$(document).ready(function () {
  $("#getWeather").on("click", function () {
    let city = $("#cityInput").val();
    if (validateInput(city)) {
      getWeather(city);
      clearInput();
    }
  });

  $("#cancel").on("click", function () {
    clearInput();
  });

  function getWeather(city) {
    let apiKey = "ca117d146232a1a1da47149a15db169a";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    $.ajax({
      url: apiUrl,
      type: "GET",
      data: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
      success: function (data) {
        displayWeather(data);
      },
      error: function (error) {
        showError();
      },
    });
  }

  function displayWeather(data) {
    let weatherInfo = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Condition: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity} %</p>
    `;

    $("#weatherInfo").html(weatherInfo);
  }

  function showError() {
    $("#weatherInfo").html(
      "<p>Error getting weather forecast. Please try again.</p>"
    );
  }

  function validateInput(city) {
    if (city.trim() === "") {
      $("#weatherInfo").html(
        "<p>Please enter a city name to get the weather forecast.</p>"
      );

      return false;
    }
    return true;
  }

  function clearInput() {
    $("#cityInput").val("");
    $("#weatherInfo").empty();
  }
});
