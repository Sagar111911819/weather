// --- TIME FUNCTION ---
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const timeString = `${hours}:${minutes.toString().padStart(2, '0')} <span class="fs-5">${ampm}</span>`;
  document.getElementById("time").innerHTML = timeString;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  const date = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  document.getElementById("date").textContent = `${day} - ${date}`;
}

setInterval(updateTime, 1000);
updateTime(); // initial call

// --- WEATHER FUNCTION ---
const apiKey = '80644b6da3af6e02394f15640f5b4f45';  // ✅ new working key

fetchWeather("Delhi"); // ✅ Change city if needed

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        throw new Error(data.message); // catch invalid city or key
      }

      // Update weather info
      document.getElementById("city-name").textContent = data.name;
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°`;
      document.getElementById("feels-like").textContent = `${Math.round(data.main.feels_like)}°`;
      document.getElementById("wind").textContent = `${data.wind.speed} m/h`;
      document.getElementById("weather-type").textContent = data.weather[0].main;

      // Set icon based on condition
      const condition = data.weather[0].main.toLowerCase();
      let iconPath = "assets/icons/cloudy.png"; // default

      if (condition.includes("thunder")) iconPath = "assets/icons/thunder.png";
      else if (condition.includes("rain")) iconPath = "assets/icons/rain.png";
      else if (condition.includes("clear")) iconPath = "assets/icons/sunny.png";
      else if (condition.includes("cloud")) iconPath = "assets/icons/cloudy.png";

      document.querySelector(".weather-icon").src = iconPath;
    })
    .catch(err => {
      console.error("Weather API error:", err);
      alert("ERROR: " + err.message); // Show actual API error
    });
}
function changeCity() {
  const userCity = document.getElementById("cityInput").value.trim();
  if (userCity) {
    fetchWeather(userCity);
  } else {
    alert("Please enter a valid city name.");
  }
}

fetchWeather(city); // initial call
