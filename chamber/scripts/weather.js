// API Script to fetch current weather + 3-day forecast for New York, NY
// Coordinates: 40.71, -74.02 (using city query for simplicity)

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastList = document.querySelector('#forecast-list');

const API_KEY = 'baebc531ee0ebe191c04f9b9b8a4b6f1';
const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=New%20York&units=imperial&appid=${API_KEY}`;

async function fetchCurrentWeather() {
  try {
    const response = await fetch(CURRENT_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    displayCurrent(data);
  } catch (error) {
    console.error('Current weather fetch failed:', error);
  }
}

async function fetchForecast() {
  try {
    const response = await fetch(FORECAST_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error('Forecast fetch failed:', error);
  }
}

function displayCurrent(weatherData) {
  if (!weatherData || !weatherData.main || !weatherData.weather) return;
  currentTemp.textContent = `${weatherData.main.temp.toFixed(0)} °F`;
  const icon = weatherData.weather[0].icon;
  const desc = weatherData.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.alt = desc;
  captionDesc.textContent = desc;
}

function displayForecast(forecastData) {
  if (!forecastData || !forecastData.list) return;
  const dailyForecasts = extractThreeDays(forecastData.list);
  if (!forecastList) return;
  forecastList.innerHTML = '';
  dailyForecasts.forEach(day => {
    const article = document.createElement('article');
    article.className = 'forecast-day';
    const dateLabel = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const temp = Math.round(day.main.temp);
    const desc = day.weather[0].description;
    const icon = day.weather[0].icon;
    article.innerHTML = `
      <h3>${dateLabel}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="50" height="50">
      <p>${temp} °F</p>
      <p>${desc}</p>
    `;
    forecastList.appendChild(article);
  });
}

function extractThreeDays(list) {
  const byDate = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });
  const dates = Object.keys(byDate).sort();
  const today = new Date().toISOString().split('T')[0];
  const startIdx = dates.indexOf(today);
  const targetDates = dates.slice(startIdx >= 0 ? startIdx : 0, (startIdx >= 0 ? startIdx : 0) + 3);
  return targetDates.map(date => {
    const items = byDate[date];
    let best = items[0];
    let minDelta = 24;
    items.forEach(it => {
      const hour = parseInt(it.dt_txt.split(' ')[1].split(':')[0]);
      const delta = Math.abs(hour - 12);
      if (delta < minDelta) {
        best = it;
        minDelta = delta;
      }
    });
    return best;
  });
}

fetchCurrentWeather();
fetchForecast();