import {openWetherAPI, weatherData} from "./API.mjs";
const openWether = new openWetherAPI();
let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weather_icon = document.querySelector(".weather-icon");

let cel; // Celsius value storage

async function checkWeather(city) {
  
  const data = await openWether.getWeatherInfo(city);

  document.querySelector(".city").innerHTML = data.city;
  const tempCelcius = Math.round(data.mainObj.temp);
  const dt = new Date(data.dt * 1000);
  document.querySelector(".temp").innerHTML = tempCelcius + "°C";
  document.querySelector(".humidity").innerHTML = data.mainObj.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind + " m/s";
  document.querySelector(".pressure").innerHTML = data.mainObj.pressure * 0.750 + " mm Hg";
  document.querySelector(".dt").innerHTML = dt;

  if (data.weather === "Clouds") {
    weather_icon.src = "../images/clouds.png";
  } else if (data.weather === "Clear") {
    weather_icon.src = "../images/clear.png";
  } else if (data.weather === "Rain") {
    weather_icon.src = "../images/rain.png";
  } else if (data.weather === "Drizzle") {
    weather_icon.src = "../images/drizzle.png";
  } else if (data.weather === "Mist") {
    weather_icon.src = "../images/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").innerHTML = "";
  
  // Store the Celsius value
  cel = tempCelcius;
}

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

// Convert Celsius to Fahrenheit
document.getElementById("farenheit").addEventListener("click", () => {
  if (cel !== undefined) {
    let fer = Math.floor(cel * 1.8 + 32);
    document.querySelector(".temp").innerHTML = fer + "°F";
  }
});

// Restore the Celsius value
document.getElementById("celcius").addEventListener("click", () => {
  if (cel !== undefined) {
    document.querySelector(".temp").innerHTML = cel + "°C";
  }
});
