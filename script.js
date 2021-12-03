function formattedDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();

currentTime.innerHTML = formattedDate(now);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#exampleInputEmail1");
  let h1 = document.querySelector("#city");

  h1.innerHTML = searchInput.value;
}

let searchWeather = document.querySelector("#searchbar");
searchWeather.addEventListener("submit", search);

// city searched by user via geo and weather API

//Show weather
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector(
    "#currentWeatherDescription"
  ).innerHTML = `${response.data.weather[0].description}`;
}
//Get City
function searchCity(event) {
  event.preventDefault();
  let apiKey = "49e735c03709a6e5740d57ba7f72eb96";
  let city = document.querySelector("#exampleInputEmail1").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let submitCity = document.querySelector("#search");
submitCity.addEventListener("click", searchCity);

/////// Display the city and its info

function displayCurrentLocation(response) {
  console.log(response);
  let currentLocationTemperature = document.querySelector("#temperature");
  currentLocationTemperature.innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  let currentLocationCity = document.querySelector("#city");
  currentLocationCity.innerHTML = `${response.data.name}`;

  let currentWeatherDescription = document.querySelector(
    "#currentWeatherDescription"
  );
  currentWeatherDescription.innerHTML = `${response.data.weather[0].description}`;
}

// Get the position based on city searched

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "49e735c03709a6e5740d57ba7f72eb96";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPosition = document.querySelector("#button");
currentPosition.addEventListener("click", getCurrentLocation);
