const apiKey = "1932ba53c628a41013a6d5e0a645b415";

const weatherContainer = document.getElementById("weather");
const city = document.getElementById("city");
const error = document.getElementById("error");

const units = "metric"; //can be imperial or metric
let temperatureSymobol = units == "imperial" ? "°F" : "°C";

// Add event listener to trigger fetchWeather on Enter key press
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchWeather();
  }
});

let typingTimer;
const typingInterval = 2000; // 2 seconds

document.getElementById("cityInput").addEventListener("input", function () {
  clearTimeout(typingTimer);
  if (document.getElementById("cityInput").value.trim() !== "") {
    typingTimer = setTimeout(fetchWeather, typingInterval);
  }
});

// Add event listener to city element to show city input field again
city.addEventListener("click", function () {
  document.getElementById("cityInput").style.display = "block";
});

async function fetchWeather() {
  try {
    weatherContainer.innerHTML = "";
    error.innerHTML = "";
    city.innerHTML = "";

    const cnt = 8; // 8 data points per day
    const cityInputtedByUser = document.getElementById("cityInput").value;

    // Hide the input field after the user enters a city
    document.getElementById("cityInput").style.display = "none";

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputtedByUser}&appid=${apiKey}&units=${units}&cnt=${cnt}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod == "400" || data.cod == "404") {
      error.innerHTML = `Invalid city. Please enter a valid city name!`;
      // Show the input field again if the city is not valid
      document.getElementById("cityInput").style.display = "block";
      return;
    }
    // Display weather data for each 3 hour increment
    data.list.forEach((hourlyWeatherData) => {
      const hourlyWeatherDataDiv = createWeatherDescription(hourlyWeatherData);
      weatherContainer.appendChild(hourlyWeatherDataDiv);
    });

    // Display city name based on latitude and longitude
    city.innerHTML = `${data.city.name}`;
  } catch (error) {
    console.log(error);
    // Show the input field again if an error occurs
    document.getElementById("cityInput").style.display = "block";
  }
}

function convertToLocalTime(dt) {
  // Create a new Date object by multiplying the Unix timestamp by 1000 to convert it to milliseconds
  // Will produce a time in the local timezone of user's computer
  const date = new Date(dt * 1000);

  const hours = date.getHours(); // Use 24-hour format without leading zero

  return `${hours}:00`;
}

function createWeatherDescription(weatherData) {
  const { main, dt, weather } = weatherData;

  const description = document.createElement("div");
  const convertedDateAndTime = convertToLocalTime(dt);

  // Round the temperature
  const roundedTemp = Math.round(main.temp);

  let isRounded = true;

  // Get weather icon based on condition
  const weatherIcon = getWeatherIcon(weather[0].main);

  description.innerHTML = `
        <div class="weather_description">
          <div class="icon">${weatherIcon}</div>
          <div class="temp">${roundedTemp}${temperatureSymobol}</div>
          <div class="time">${convertedDateAndTime}</div>
        </div>
    `;

  // Add event listener to toggle temperature display on click
  description.addEventListener("click", () => {
    const tempElement = description.querySelector('.temp');
    if (isRounded) {
      tempElement.textContent = `${main.temp}${temperatureSymobol}`;
    } else {
      tempElement.textContent = `${roundedTemp}${temperatureSymobol}`;
    }
    isRounded = !isRounded;
  });

  return description;
}

function getWeatherIcon(weatherMain) {
  const icons = {
    'Clear': '<i class="fas fa-sun"></i>',
    'Clouds': '<i class="fas fa-cloud"></i>',
    'Rain': '<i class="fas fa-cloud-rain"></i>',
    'Drizzle': '<i class="fas fa-cloud-showers-heavy"></i>',
    'Thunderstorm': '<i class="fas fa-bolt"></i>',
    'Snow': '<i class="fas fa-snowflake"></i>',
    'Mist': '<i class="fas fa-smog"></i>',
    'Fog': '<i class="fas fa-smog"></i>',
    'Haze': '<i class="fas fa-smog"></i>',
    'Smoke': '<i class="fas fa-smog"></i>',
    'Dust': '<i class="fas fa-wind"></i>',
    'Sand': '<i class="fas fa-wind"></i>',
    'Ash': '<i class="fas fa-fire"></i>',
    'Squall': '<i class="fas fa-wind"></i>',
    'Tornado': '<i class="fas fa-tornado"></i>'
  };
  return icons[weatherMain] || '<i class="fas fa-temperature-high"></i>';
}
