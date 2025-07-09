document.getElementById('getWeather').addEventListener('click', () => {
  const weatherResult = document.getElementById('weatherResult');
  const weatherIcon = document.getElementById('weatherIcon');

  if (!navigator.geolocation) {
    weatherResult.textContent = 'Geolocation is not supported.';
    return;
  }

  weatherResult.textContent = 'Fetching weather...';

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== 200) {
          weatherResult.textContent = 'Weather data unavailable.';
          return;
        }
        const city = data.name;
        const temp = data.main.temp;
        const condition = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        weatherResult.innerHTML = `
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Condition:</strong> ${condition}</p>
        `;

        // Show weather icon
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.style.display = 'block';
      })
      .catch(() => {
        weatherResult.textContent = 'Failed to fetch weather.';
      });
  }

  function error() {
    weatherResult.textContent = 'Unable to get your location.';
  }
});
