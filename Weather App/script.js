// API key for OpenWeatherMap
const apiKey = '55e6c1243e51f076436cbf97d3519657';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

// Get elements
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherContainer = document.querySelector('.weather');
const errorContainer = document.querySelector('.error');
const weatherIcon = document.querySelector('.weather-icon');

// Show error messages
function displayError(message) {
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';
  weatherContainer.style.display = 'none';
}

// Fetch weather data
async function checkWeather(city) {
  if (!city.trim()) {
    displayError('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      displayError('Invalid city name. Please try again.');
      return;
    }

    const data = await response.json();
    errorContainer.style.display = 'none';

    weatherContainer.classList.remove('show');
    setTimeout(() => updateWeatherData(data), 150); // Faster transition
  } catch (error) {
    displayError('Something went wrong. Please try again later.');
  }
}

// Update weather details
function updateWeatherData(data) {
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

  // ✅ Restored Correct Weather Icons
  if (data.weather[0].main === 'Clouds') weatherIcon.src = 'images/clouds.png';
  else if (data.weather[0].main === 'Clear')
    weatherIcon.src = 'images/clear.png';
  else if (data.weather[0].main === 'Rain') weatherIcon.src = 'images/rain.png';
  else if (data.weather[0].main === 'Drizzle')
    weatherIcon.src = 'images/drizzle.png';
  else if (data.weather[0].main === 'Mist') weatherIcon.src = 'images/mist.png';

  weatherContainer.style.display = 'block';
  weatherContainer.classList.add('show');
}

// Event Listeners
searchBtn.addEventListener('click', () => checkWeather(searchBox.value));
searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') checkWeather(searchBox.value);
});
