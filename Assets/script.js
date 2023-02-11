const rootURL = "https://api.openweathermap.org";
const apiKey = "1dbbe04e7eaff33cabdcdc99e3464ff7&units=imperial";
const search = document.getElementById("searchForWeather");
const inputs = document.getElementsByClassName("inputs");
const currentOutputs = document.getElementsByClassName(
  "currentWeather-outputs"
);
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let weatherIcon = document.getElementById("weatherIcon");

//Add event listener to search button
search.addEventListener("click", (event) => {
  console.log("button clicked!")
  event.preventDefault();
  let city = inputs[0].value;
  console.log("CITY!", city); //! City comes back as undefined
  const currentData = `${rootURL}/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}`;
  console.log("Button clicked!", currentData);
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
}

//Define the saveSearchHistory function to save the search history
function saveSearchHistory(data) {
  //Get the search results from local storage, or an empty array if they don't exist
  let searchResults = localStorage.getItem("searchResults") || "[]";
  //parse search result data as a JavaScript Object using JSON.parse()
  searchResults = JSON.parse(searchResults);
  //Add new data to existing data by using push(data)
  searchResults.push(data);
  //store updated data back into local storage
  localStorage.setItem("searchResults", JSON.stringify(searchResults));
  console.log("local storage", searchResults);
}

//display previous search results
function displayPrevious() {
  const searchHistory = document.getElementsByClassName("searchHistory");
  const searchHistoryBtn = document.getElementsByClassName("searchHistoryBtn");
  const searchHistoryClearBtn =
    document.getElementsByClassName("clearHistoryBtn");

  for (let i = 0; i < searchResults.length; i++) {
    searchHistoryBtn.addEventListener("click", function () {
      const searchTerm = searchHistory[i].value;
      searchHistoryClearBtn.innerHTML = "Clear Search History";
      for (let j = 0; j < searchResults.length; j++) {
        if (searchResults[j].includes(searchTerm)) {
          const listItem = document.createElement("li");
          listItem.textContent = searchResults[j];
          searchHistory[i].appendChild(listItem);
        }
      }
      displayPrevious();
    });
  }
}
