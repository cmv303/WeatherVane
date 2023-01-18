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
        .then(function(data) {
          console.log(data);
        })
        .catch(function(error) {
          console.error("Error fetching weather data: " + error);
        });
    }
  });

