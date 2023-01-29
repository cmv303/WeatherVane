const rootURL = "https://api.openweathermap.org";
const apiKey = "1dbbe04e7eaff33cabdcdc99e3464ff7&units=imperial";
const search = document.getElementById("searchForWeather");
const inputs = document.getElementsByClassName("inputs");
let d = new Date();
let date = d.toDateString();
const currentOutputs = document.getElementsByClassName(
  "currentWeather-outputs"
);
let city = inputs.value;
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let weatherIcon = document.getElementById("weatherIcon");

search.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Button clicked!");
  const currentData = `${rootURL}/data/2.5/weather?q=Durham&limit=5&appid=${apiKey}`; //!hardcoded city
  console.log("button clicked", currentData);
  fetch(currentData)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 200) {
        console.log("data", data);
      } else {
        console.log(data.message);
      }
      displayCurrent(data);
    }
    );

  function displayCurrent(data) {
    if (data.message) {
      console.log(data.message);
    } else {
        date;
      temp.innerHTML = Math.round((parseFloat(data.main.temp))) + " °C";
      humidity.innerHTML = data.main.humidity + " % humidity";
      windSpeed.inerHTML = data.wind.speed + "mph";
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    }

    let searchResults = localStorage.getItem("searchResults") || "[]";
    searchResults = JSON.parse(searchResults);
    searchResults.push(data);
    localStorage.setItem("searchResults", JSON.stringify(searchResults))
    console.log("local storage", searchResults)
    }
});
