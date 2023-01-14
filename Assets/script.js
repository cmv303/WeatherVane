//*api key
// 1dbbe04e7eaff33cabdcdc99e3464ff7

// variables for form inputs
const form = document.getElementById("weather-form");
const input = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");

// Search for City
$(document).ready(function () {
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
        `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1dbbe04e7eaff33cabdcdc99e3464ff7`
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

//     // AND that city is added to the search history
//   const citySearchedHistory = document.createElement("a");
//   citySearchedHistory.href = "#";
//   citySearchedHistory.innerText = currentCity;
//   citySearchedHistory.addEventListener("click", (e) => {
//     e.preventDefault();

//   });
//   searchHistory.appendChild(citySearchedHistory);
// });

// // WHEN I view current weather conditions for that city
// // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// function displayCurrentWeather(data) {
//     const cityName = document.getElementById("city-name");
//     cityName.innerText = data.name;
//     const date = document.getElementById("date");
//     date.innerText = new Date().toLocaleDateString();
//     const icon = document.getElementById("icon");
//     icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     const temperature = document.getElementById("temperature");
//     temperature.innerText = data.main.temp;
//     const humidity = document.getElementById("humidity");
//     humidity.innerText = data.main.humidity;
//     const windSpeed = document.getElementById("wind-speed");
//     windSpeed.innerText = data.wind.speed;

// // WHEN I view future weather conditions for that city
//   // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1dbbe04e7eaff33cabdcdc99e3464ff7`)
//   .then(response => response.json())
//   .then(forecastData => {
//     const forecast = forecastData.list;
//     for (let i = 0; i < forecast.length; i++) {
//       const forecastDay = forecast[i];
//       const forecastContainer = document.getElementById(`forecast-${i}`);
//     }}

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
