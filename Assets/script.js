const rootURL = "https://api.openweathermap.org";
const apiKey = "appid=1dbbe04e7eaff33cabdcdc99e3464ff7&units=imperial";
const search = document.getElementById("searchForWeather");
const inputs = document.getElementById("cityState");
const currentOutputs = document.getElementsByClassName(
  "currentWeather-outputs"
);
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let weatherIcon = document.getElementById("weatherIcon");

//Add event listener to search button
search.addEventListener("click", (event) => {
  console.log("button clicked!");
  event.preventDefault();
  let city = inputs.value;
  console.log("CITY!", city); //! Durham is hardcoded, as City comes back as undefined
  console.log("inputs", inputs[0]);
  const currentData = `${rootURL}/data/2.5/weather?q=${city}&${apiKey}`;
  const fiveDayData = `${rootURL}/data/2.5/forecast?q=${city}&${apiKey}`;
  console.log("Button clicked!");
  //Use fetch to get the current weather data from the openweathermap api
  fetch(currentData)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayCurrent(data);
        saveSearchHistory(data);
        console.log("data", data);
      } else {
        console.log(data.message); //! console says this is a bad query
      }
    });
//use fetch to get 5-day forecast
    fetch(fiveDayData)
    .then((response) => response.json())
    .then((data) => {
      if(data.cod === 200) {
        displayFiveDays(data);
        console.log("data5", data);
      } else {
        console.log(data.message);
      }
    });
});

//Define the displayCurrent function to display the current weather data
function displayCurrent(data) {
  //Check if an error message was returned
  if (data.message) {
    //Log the error message to the console
    console.log(data.message);
  } else {
    //Update the data
    let d = new Date();
    let date = d.toDateString();
    temp.innerHTML = Math.round(parseFloat(data.main.temp)) + " °F";
    humidity.innerHTML = data.main.humidity + " % humidity";
    windSpeed.innerHTML = data.wind.speed + "mph";
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
  }
};

//Define the saveSearchHistory function to save the search history
function saveSearchHistory(data) {
  //Get and parse the search results from local storage as a js object using json, , or an empty array if they don't exist
  let searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");
  //Add new data to existing data by using push(data)
  searchResults.push(data);
  //store updated data back into local storage
  localStorage.setItem("searchResults", JSON.stringify(searchResults));
  console.log("local storage", searchResults);
};

function displayFiveDays(data) {
  if(data.message) {
    console.log(data.message);
  } else {
    let forecastDays = data.list.filter((listItem) =>
    listItem.dt_txt.includes("12:00:00"));
    console.log("5 day forecast: ", forecastDays);

    for (let i =0; i < forecastDays.length; i++) {
      let forecastDay = forecastDays[i]
      let d = new Date(forecastDay.dt * 1000);
      let date = d.toDateString();
    temp.innerHTML = Math.round(parseFloat(forecastDay.main.temp)) + " °F";
    humidity.innerHTML = forecastDay.main.humidity + " % humidity";
    windSpeed.innerHTML = forecastDay.wind.speed + "mph";
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">`;
    }
  }
};

//display previous search results
function displayPrevious() {
  const searchHistory = document.getElementsByClassName("searchHistory");
  const searchHistoryBtn = document.getElementsByClassName("searchHistoryBtn");
  const searchHistoryClearBtn =
    document.getElementsByClassName("clearHistoryBtn")[0];

     //Get and parse the search results from local storage, or an empty array if they don't exist
  let searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");

  //add event listener to clear search history button
  searchHistoryClearBtn.addEventListener("click", function () {
    localStorage.removeItem("searchResults");
    searchResults = [];
    //clear serach history display
    for (let i = 0; i < searchHistory.length; i++) {
      searchHistory[i].innerHTML = "";
    }
  });

  for (let i = 0; i < searchHistoryBtn.length; i++) {
    searchHistoryBtn[i].addEventListener("click", function () {
      const searchTerm = searchHistory[i].value;
      searchHistoryClearBtn.innerHTML = "Clear Search History";
      for (let j = 0; j < searchResults.length; j++) {
        if (searchResults[j].name.includes(searchTerm)) {
          const listItem = document.createElement("li");
          listItem.textContent = searchResults[j].name;
          searchHistory[i].appendChild(listItem);
        }
      }
      displayPrevious();
    });
  }
};
