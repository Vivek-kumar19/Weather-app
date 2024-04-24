import React, { useState, useEffect } from 'react';

const API_KEY = 'a735b441ac514ffc6856f862f6a71294';
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

function WeatherApi() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city !== '') {
      setLoading(true);
      fetch(`${API_URL}?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
    } else {
      setWeatherData(null);
    }
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleClear = () => {
    setCity('');
    setWeatherData(null);
  };

  const temperatureBackgrounds = [
    { min: -30, max: 0, image: 'https://img.freepik.com/free-vector/hand-drawn-winter-background_52683-49998.jpg?w=740&t=st=1713967715~exp=1713968315~hmac=40971d09f9062287af191fe26195d2ce9eff6eb74e031da27907beb5941cc38b' },
    { min: 1, max: 15, image: 'https://img.freepik.com/premium-vector/cool-ice-background-with-green-leaves-sunbeams-3d-illustration_317442-824.jpg?w=740' },
    { min: 16, max: 25, image: 'https://img.freepik.com/premium-vector/planet-earth-melting-with-factories-buildings_24908-69189.jpg?w=740' },
    { min: 26, max: 40, image: 'https://img.freepik.com/free-vector/flat-summer-heat-illustration-with-man-sweating-sun_23-2149433187.jpg?t=st=1713967847~exp=1713971447~hmac=279a2bf7c750fe56e4667153ef7fba29e8eea32ed9d7b2107165934e5eed05a2&w=740' },
  ];

  const defaultBackgroundImage = 'https://img.freepik.com/free-vector/weather-concept-illustration_114360-1189.jpg?w=740&t=st=1713968794~exp=1713969394~hmac=20da9016dde8243fa70cc2d8b7f91e9ec65f0777f9ea9b6b454a64369fcd26bb';


  const getBackgroundImage = (temperature) => {
    for (const item of temperatureBackgrounds) {
      if (temperature >= item.min && temperature <= item.max) {
        return item.image;
      }
    }

    return 'https://img.freepik.com/free-vector/weather-concept-illustration_114360-1189.jpg?w=740&t=st=1713968794~exp=1713969394~hmac=20da9016dde8243fa70cc2d8b7f91e9ec65f0777f9ea9b6b454a64369fcd26bb';
  };

  return (
    <div className='background-container'  style={{ backgroundImage: `url(${weatherData && weatherData.main ? getBackgroundImage(Math.round(weatherData.main.temp - 273.15)) : defaultBackgroundImage})` }}>
        <div className="container">
     <div className='container-inner'>
     <h1 className="title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          className="input"
        />
        <button onClick={handleClear} className="clear-button">Clear</button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="city">{weatherData.name}, {weatherData.sys && weatherData.sys.country}</h2>
          <p className="temperature">Temperature: {weatherData.main && Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p className="humidity">Humidity: {weatherData.main && weatherData.main.humidity}%</p>
          <p className="wind-speed">Wind Speed: {weatherData.wind && weatherData.wind.speed} m/s</p>
          <p className="weather">Weather: {weatherData.weather && weatherData.weather[0].main}</p>
        </div>
      )}
     </div>
    </div>
    </div>
  );
}

export default WeatherApi;
