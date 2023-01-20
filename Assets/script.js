let searchHistory = [];
let rootUrl = "https://api.openweathermap.org";
const apiKey = "1dbbe04e7eaff33cabdcdc99e3464ff7";
let searchForm = document.querySelector(".search");
let searchInput = document.querySelector("#searchBar")
let currentContainer = document.querySelector(".current-weather");
let forecastContainer = document.querySelector(".five-day-forecast");
let searchHistoryContainer = document.querySelector(".history");
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)

//function to display searchHistoryList
function renderSearchHistory() {
  searchHistoryContainer.innerHTML = "";
  for (let i = searchHistory.length - 1; i >=0; i--){
    let btn = document.createElement("button")
    btn.setAttribute("type", "button")
    btn.setAttribute("class", "history-btn")
    btn.setAttribute("data-search", searchHistory[i])
    btn.textContent = searchHistory[i]
    searchHistoryContainer.append(btn)
  }
}

//function to update history in Local Storage and update displayed history
function addToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return
  } searchHistory.push(search);
  localStorage.setItem("search-history", JSON.stringify(searchHistory))
  renderSearchHistory();
}
//function to get search history from Local Storage
function getHistory() {
  let storageHistory = localStorage.getItem("search-history")
  if (storageHistory) {
    searchHistory = JSON.parse(storageHistory)
  }
  renderSearchHistory();
}
//function to display currentWeatherData fetched from api
function renderCurrentWeather(city,weather) {
  //variable for date
  //variable for all data points (temp, humidity, icon, etc)
  //create html elements in JS that build the structure of how i want that to look
  //set their attributes
  //set their textcontent --this references variables for all data points
}

//function to display fiveDayForecast
//follow above process but doing it for 5 cards instead of one let temp1, let temp2 .... let wind1, let wind2....

//function that runs the two previous functions
function renderItems(city,data) {
  renderCurrentWeather(city, data.list[0], data.city.timezone)
  fiveDayForecast(data.list);
}

//function that calls api and gives us all the data we need for the currentWeather and Forecast
function fetchCurrentWeather(location) {
  let {lat} = location
  let {lon} = location
  let city = location.name
  const apiAddress = `${rootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(apiAddress)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderItems (city, data);
    })
    .catch(function(error) {
      console.error("Error fetching weather data: " + error);
    });
}

//function that calls the api and gives us the coordinants
function fetchCoords(search) {
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
}
//functions for event listeners
  //search form submit
  //search history button click



// $(document).ready(function () {
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

