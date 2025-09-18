import React, { useState, useEffect } from "react";
import Search from "../Search/Search"
import "../../components/weather/Weather"


import Favorite from "../Favorite/Favorite";
import { getWeatherData, getWeatherForecast } from "../../service/WeatherService"



const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoriteCities')) || [];
    } catch (error) {
      return [];
    }
  });

  const handleSearch = async (city) => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(city),
        getWeatherForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setError('');
    } catch {
      setError('City not found. Please enter a valid city name.');
    }
  };

  const myFavorite = (city) => {
    const updatedFavorites = favorites.includes(city)
      ? favorites.filter(fav => fav !== city)
      : [...favorites, city];

    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="container">
      <Search onSearchCity={handleSearch} />
      {error && <p>{error}</p>}

      {weather && (
        <div className="details">
          <h2>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather-icon"
          />
          <p>Temp: {weather.main.temp}°C</p>
          <p>Cloud: {weather.clouds.all}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>

          <button onClick={() => myFavorite(weather.name)}>
            {favorites.includes(weather.name) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      )}

      {forecast && (
        <div className="forecast">
          {forecast.slice(0, 5).map((item, index) => (
            <div key={index}>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="weather-icon"
              />
              <p>{new Date(item.dt * 1000).toLocaleDateString()} - Temp: {item.main.temp}°C</p>
            </div>
          ))}
        </div>
      )}

      <Favorite favorites={favorites} myFavorite={myFavorite} />
    </div>
  );
};

export default Weather;
