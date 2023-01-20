$(document).ready(function () {
  $("#search-btn").on("click", function () {
    console.log("Search button clicked!");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetchCurrentWeather(position.coords);
      }, function(error) {
        console.log("Geolocation failed: " + error.message);
      });
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
    });

    function fetchCurrentWeather(coords) {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const apiKey = "1dbbe04e7eaff33cabdcdc99e3464ff7";
      const apiAddress = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`;
      fetch(apiAddress)
        .then(function (response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function (data) {
          displayCurrentWeather(data);
        }) //!see note about this in notes js files
        .catch(function(error) {
          console.error("Error fetching weather data: " + error);
        });
    }
    function displayCurrentWeather(data) {
      const city = document.getElementById("city");
      city.innerHTML = data.name; //!only shows using location in console
      const climateDescription = document.getElementById("climateDescription"); //!Not showing up
      climateDescription.innerHTML - data.weather[0].main;
      const tempValue = document.getElementById("tempValue");
      tempValue.innerHTML = Math.round(data.main.feels_like - 273.15) + " °C"
      // const humidity = document.getElementById("humidity");
      // humidity.innerHTML = data.humidity
      // const windSpeed = document.getElementById("windSpeed");
      // windSpeed.innerHTML = 
    }
  });

