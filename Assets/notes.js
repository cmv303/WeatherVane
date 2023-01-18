// Waits for DOM to fully load
//adds click event to search button
//gets the lat and lon from user's position//!see comment on line 16
 //uses the lat and lon info to make current weather fetch request to weather API
 //uses the data to call the 'displayCurrentForecast' function
  //handles errors
   //parses the response as JSON

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


// fetchCurrentWeather is passed as a callback function from the nav.geolocation() method (as stated in line 16)



//  fetchFiveDayWeather();

//TODO local storage
//search bar
//previously searched


//TODO convert from Kelvins to F

//TODO get console info to show up on display

//TODO api calls
//*5 day forecast
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//*current forecast
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}