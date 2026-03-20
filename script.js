let apiKey = "ef83e0cac69de31f90e999e8143ea0e7";

let searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", function () {
  let city = document.querySelector("#city-input").value.trim();

  if (city === "") {
    alert("Please enter a city!");
    return;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => displayForecast(data))
    .catch(error => {
      alert(error.message);
    });
});

function displayForecast(data) {
  let weatherResult = document.querySelector("#weather-result");
  weatherResult.innerHTML = "";

  let cityName = data.city.name;

  let heading = document.createElement("h2");
  heading.textContent = cityName;
  heading.style.width = "100%";
  weatherResult.appendChild(heading);

  let daysShown = 0;
  let lastDate = "";

  data.list.forEach(item => {
    let date = item.dt_txt.split(" ")[0];

    if (date !== lastDate && daysShown < 5) {
      lastDate = date;
      daysShown++;

      let temp = item.main.temp;
      let description = item.weather[0].description;
      let wind = item.wind.speed;
      let icon = item.weather[0].icon;
      let mainWeather = item.weather[0].main;

      let dayCard = document.createElement("div");
      dayCard.className = "weather-card";

      if (mainWeather === "Clear") {
        dayCard.style.background = "#ffe082";
      } else if (mainWeather === "Clouds") {
        dayCard.style.background = "#e0e0e0";
      } else if (mainWeather === "Rain") {
        dayCard.style.background = "#81d4fa";
      } else if (mainWeather === "Snow") {
        dayCard.style.background = "#e1f5fe";
      } else {
        dayCard.style.background = "#f5f5f5";
      }

      if (temp > 30) {
        dayCard.style.border = "2px solid red";
      } else if (temp < 10) {
        dayCard.style.border = "2px solid blue";
      }

      dayCard.innerHTML = `
        <h3>${date}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
        <p>🌡 ${temp}°C</p>
        <p>☁️ ${description}</p>
        <p>💨 ${wind} m/s</p>
      `;

      weatherResult.appendChild(dayCard);
    }
  });
}