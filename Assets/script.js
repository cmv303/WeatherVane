// variables for form inputs
// const form = document.getElementById("weather-form");
// const input = document.getElementById("city-input");
// const searchHistory = document.getElementById("search-history");
// const searchButton = document.getElementById("search-btn");

const apiKey = "1dbbe04e7eaff33cabdcdc99e3464ff7";

// Wait for DOM to fully load
$(document).ready(function () {
  console.log("ready!");
  //adds click event to search button
  $("#search-btn").on("click", function () {
    //checks to see if browser supports geolocation
    if (navigator.geolocation) {
      //if supported, gets current position of user and passes it to the fetchCurrentWeather function.//! what's the diff between position and lat and lon (see lines 23-27)
      navigator.geolocation.getCurrentPosition(fetchCurrentWeather);
    } else {
      //if not supported, shows alert msg
      alert("Geolocation is not supported by your browser."); //!I don't think I get this alert..
    }
    //fetchCurrentWeather is passed as a callback function from the nav.geolocation() method (as stated in line 16)
    function fetchCurrentWeather(position) {
      //gets the lat and lon from user's position//!see comment on line 16
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      //uses the lat and lon info to make current weather fetch request to weather API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        //parses the response as JSON
        .then(function (response) {
          return response.json();
        })
        //uses the data to call the 'displayCurrentForecast' function
        .then(function (currentCity) {
          console.log(currentCity);
          displayCurrentForecast(currentCity);
          console.log("currentCity"); //! works, but is slow to load, and only works with a pop-up alert
        })
        //handles errors
        .catch(function (error) {
          console.error(error);
          console.error("something went wrong with your data input");
        });
    }
    //defines the 'displayCurrentForecast' function that was called by currentCity promise on line 35-40//! is this the right terminology?
    function displayCurrentForecast() {
    //TODO code for displaying weather on page goes here!
  }

    //TODO TO CONTINUE
    //!Does this 'fetchFiveDayWeather' function go before displayCurrentForecast? I think so....
//   function fetchFiveDayWeather() {
//       //fetches api for 5-day forecast
//       fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
//       )
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (forecastData) {
//           console.log(forecastData);
//           console.log("forecastData");
//         })
//         .catch(function (error) {
//           console.error("something went wrong with 5-day data");
//           console.error(error);
//         });

  });
});


//   }
//  fetchFiveDayWeather();

//TODO local storage
//search bar
//previously searched


//TODO functions
// function searchCity() {

// }

//TODO api calls
//*5 day forecast
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//*current forecast
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

