let apiKey = "ef83e0cac69de31f90e999e8143ea0e7";

let searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", function () {
  let city = document.querySelector("#city-input").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert("City not found!");
    });
});

function displayWeather(data) {
  let cityName = data.name;
  let temperature = data.main.temp;
  let description = data.weather[0].description;
  let wind = data.wind.speed;
  let icon = data.weather[0].icon;

  document.querySelector("#city-name").innerHTML = cityName;
  document.querySelector("#temperature").innerHTML = `🌡 ${temperature}°C`;
  document.querySelector("#description").innerHTML = `☁️ ${description}`;
  document.querySelector("#wind").innerHTML = `💨 Wind: ${wind} m/s`;

  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.querySelector("#icon").src = iconUrl;
}