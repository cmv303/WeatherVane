let searchHistory = [];
let rootUrl = "https://api.openweathermap.org";
const apiKey = "1dbbe04e7eaff33cabdcdc99e3464ff7";
let searchForm = document.querySelector(".search");
let searchInput = document.querySelector("#searchBar");
let currentContainer = document.querySelector(".current-weather");
let forecastContainer = document.querySelector(".five-day-forecast");
let searchHistoryContainer = document.querySelector(".history");

//gets document ready
$(document).ready(function () {
  $("#search-btn").on("click", function () {
    //event listener for search button
    console.log("Search button clicked!");
    //grabs user's coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          fetchCurrentWeather(position.coords);
          fetchFiveDayForecast(location.name);
        },
        function (error) {
          console.log("Geolocation failed: " + error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
    //fetch api info for current weather (and Forecast??)
    function fetchCurrentWeather(location) {
      let {lat, lon} = location;
      let city = location.name;
      const apiAddress = `${rootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&?=${city}&appid=${apiKey}`;
      fetch(apiAddress)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          renderItems(city, data);
        })
        .catch(function (error) {
          console.error("Error fetching weather data: " + error);
        });
      displayCurrentWeather();
    }
    //display (render) current info for current weather
    function displayCurrentWeather(city, data) {
      const currentDate = new date();
      currentDate.toDateString();
      city.innerHTML = data.name;
      const climateDescription = document.getElementById("climateDescription");
      climateDescription.innerHTML - data.weather[0].main;
      const tempValue = document.getElementById("tempValue");
      tempValue.innerHTML =
        Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32) + " °F";
      addSearchToHistory(currentDate);
    }
    //be able to clear search

    //set displayed (rendered) info into local history
    function addSearchToHistory(search) {
      if (searchHistory.indexOf(search) !== -1) {
        return;
      }
      searchHistory.push(search);
      localStorage.setItem("search-history", JSON.stringify(searchHistory));
      renderSearchHistory();
      displayFiveDayForecast();
    }
    //fetch api info for 5day forecast
    function fetchFiveDayForecast(search) {
        const apiAddress = `${rootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
        fetch(apiAddress)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          if(!data[0]) {
            alert("location not found")
          }
          else {
            addToHistory(search);
            fetchCurrentWeather(data[0]);
          }
        })
        .catch(function(err)
        {console.error(err);
        })
        displayFiveDayForecast();
      }

    //display 5day forecast
    function displayFiveDayForecast(renderItems) {
      //event listener for 5day search button
      $(".history-btn").on("click");
      forecastContainer.innerHTML = "";
      for (let i = forecast.length - 1; i >= 0; i--) {
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "history-btn");
        btn.setAttribute("data-search", forecast[i]);
        btn.textContent = searchHistory[i];
        forecastContainer.append(btn);
        getSearchHistory();
      }
    }
    //function that runs the two previous functions
    function renderItems(city, data) {
      displayCurrentWeather(city, data.list[0], data.city.timezone);
      displayFiveDayForecast(data.list);
    }
    //connect displayed 5day to addSearchToHistory to set locally
    //get searchHistory from local storage
    function getSearchHistory() {
      let storageHistory = localStorage.getItem("search-history");
      if (storageHistory) {
        searchHistory = JSON.parse(storageHistory);
      }
    }
    //display searchHistoryList
    function renderSearchHistory() {
      searchHistoryContainer.innerHTML = "";
      for (let i = searchHistory.length - 1; i >= 0; i--) {
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "history-btn");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
      }
      fetchCurrentWeather();
    }
  });
});

//IF ABOVE DOESN'T WORK for displayCurrentWeather, BELOW IS ANOTHER WAY...
//variable for all data points (temp, humidity, icon, etc)
// let currentDataPoints;
//create html elements in JS that build the structure of how i want that to look
//set their attributes
//set their textcontent --this references variables for all data points

//follow above process but doing it for 5 cards instead of one let temp1, let temp2 .... let wind1, let wind2....
// function renderFiveDayForecast() {
// let temp1 = "";
// let temp2 = "";
// let temp3 = "";
// let temp4 = "";
// let temp5 = "";

// let wind1 = "";
// let wind2 = "";
// let wind3 = "";
// let wind4 = "";
// let wind5 = "";

// let humidity1 = "";
// let humidity2 = "";
// let humidity3 = "";
// let humidity4 = "";
// let humidity5 = "";

// let icon1 = "";
// let icon2 = "";
// let icon3 = "";
// let icon4 = "";
// let icon5 = "";

// let forecastDataPoints;

// }

//functions for event listeners
//search form submit
//search history button click

//function that calls the api and gives us the coordinants
//

// //

// Math.round(data.main.feels_like - 273.15) + " °C"

//     // const humidity = document.getElementById("humidity");
//     // humidity.innerHTML = data.humidity
//     // const windSpeed = document.getElementById("windSpeed");
//     // windSpeed.innerHTML =

// });
