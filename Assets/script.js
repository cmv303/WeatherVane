const rootURL = "https://api.openweathermap.org";
const apiKey = "appid=1dbbe04e7eaff33cabdcdc99e3464ff7&units=imperial";
const search = document.getElementById("searchForWeather");
const inputs = document.getElementById("cityState");
const currentOutputs = document.getElementsByClassName(
  "currentWeather-outputs"
);
const searchHistory = document.getElementsByClassName("searchHistory")[0];
const searchHistoryClearBtn =
  document.getElementsByClassName("clearHistoryBtn")[0];
const searchHistoryBtn = document.getElementsByClassName("searchHistoryBtn")[0];

const fiveDayForecast = document.getElementsByClassName("fiveDay");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let weatherIcon = document.getElementById("weatherIcon");
let cityName = document.createElement("h4");

//Add event listener to search button
search.addEventListener("click", (event) => {
  console.log("button clicked!");
  event.preventDefault();
  let city = inputs.value;
  console.log("CITY!", city);
  console.log("inputs", inputs[0]); //! inputs come back as undefined
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
        console.log(data.message);
      }
    });
  //use fetch to get 5-day forecast
  console.log("Data data");
  fetch(fiveDayData)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        displayFiveDays(data);
        console.log("data5", data);
      } else {
        console.log(data.message);
      }
    })
    .catch((err) => {
      console.log("here is error", err);
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
    cityName.textContent = "Current weather for " + data.name;
    currentOutputs[0].appendChild(cityName);
    humidity.innerHTML = data.main.humidity + " % humidity";
    windSpeed.innerHTML = data.wind.speed + "mph";
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    const listItem = document.createElement("li");
    listItem.textContent = date;
  }
}

//Define the saveSearchHistory function to save the search history
function saveSearchHistory(data) {
  //Get and parse the search results from local storage as a js object using json, , or an empty array if they don't exist
  let searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");
  //Add new data to existing data by using push(data)
  searchResults.push(data);
  //store updated data back into local storage
  localStorage.setItem("searchResults", JSON.stringify(searchResults));
  console.log("local storage", searchResults);
}

function displayFiveDays(data) {
  console.log("5 day data", data);
  if (data.message) {
    console.log(data.message);
  } else {
    let forecastDays = data.list.filter((listItem) =>
      listItem.dt_txt.includes("12:00:00")
    );

    console.log("5 day forecast: ", forecastDays);

    cityName.textContent = "5-day forecast for " + cityName;
    fiveDayForecast[0].appendChild(cityName);

    let fiveDaySection = document.querySelector(".fiveDay");
    for (let i = 0; i < forecastDays.length; i++) {
      let forecastDay = forecastDays[i];
      let d = new Date(forecastDay.dt * 1000);
      let date = d.toDateString();

      let temp = document.createElement("div");
      let humidity = document.createElement("div");
      let windSpeed = document.createElement("div");
      let weatherIcon = document.createElement("div");

      temp.innerHTML = Math.round(parseFloat(forecastDay.main.temp)) + " °F";
      humidity.innerHTML = forecastDay.main.humidity + " % humidity";
      windSpeed.innerHTML = forecastDay.wind.speed + "mph";
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">`;

      // Add the new elements to the DOM
      const listItem = document.createElement("li");
      listItem.textContent = date;

      fiveDaySection.appendChild(listItem);
      fiveDaySection.appendChild(temp);
      fiveDaySection.appendChild(humidity);
      fiveDaySection.appendChild(windSpeed);
      fiveDaySection.appendChild(weatherIcon);
    }
  }
}

//display previous search results

function displayPrevious() {
  //Get and parse the search results from local storage, or an empty array if they don't exist
}
//add event listener to clear search history button

searchHistoryClearBtn.addEventListener("click", function () {
  localStorage.removeItem("searchResults");
  searchResults = [];
  //clear serach history display
  for (let i = 0; i < searchHistory.length; i++) {
    searchHistory[i].innerHTML = "";
  }
});

// for (let i = 0; i < searchHistoryBtn.length; i++) {

searchHistoryBtn.addEventListener("click", function () {
  console.log("Are you firing?");
  // const searchTerm = searchHistory.value;
  searchHistoryClearBtn.innerHTML = "Clear Search History";
  let searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");
  for (let j = 0; j < searchResults.length; j++) {
    // if (searchResults[j].name.includes(searchTerm)) {
    const listItem = document.createElement("li");
    listItem.textContent = searchResults[j].name;
    searchHistory.appendChild(listItem);
    // }
  }
  displayPrevious();
});
