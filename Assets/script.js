//api key
// 1dbbe04e7eaff33cabdcdc99e3464ff7

// variables for form inputs
const form = document.getElementById("weather-form");
const input = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const searchButton = document.getElementById("search-btn");

// Search for City
$(document).ready(function () {
  console.log("ready!")
  function searchCity(currentCity) {
    $("#search-btn").on("click", function () {
      //fetches api for current weather
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=1dbbe04e7eaff33cabdcdc99e3464ff7`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //displays currentWeather
          console.log("data"); //!doesn't work
          displayCurrentWeather(data);
        });

      //fetches api for 5-day forecast
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1dbbe04e7eaff33cabdcdc99e3464ff7`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (forecastData) {
          displayForecast(forecastData);
        });
    });
  }
});

// TO CONTINUE

//TODO functions
// function searchCity() {

// }

//TODO api calls
//*5 day forecast
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//*current forecast
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//TODO local storage
//search bar
//previously searched
