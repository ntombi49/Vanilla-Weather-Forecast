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

      let dayCard = document.createElement("div");
      dayCard.className = "weather-card";

      dayCard.innerHTML = `
        <h3>${date}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon"/>
        <p>🌡 Temp: ${temp}°C</p>
        <p>☁️ ${description}</p>
        <p>💨 Wind: ${wind} m/s</p>
      `;

      weatherResult.appendChild(dayCard);
    }
  });
}