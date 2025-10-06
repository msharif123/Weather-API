import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import styles from "./Weather.module.css";  // <-- import styles properly

import Favorite from "../Favorite/Favorite";
import { getWeatherData, getWeatherForecast } from "../../service/WeatherService";

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
    <div className={styles.container}>
      <Search onSearchCity={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}

      {weather && (
        <div className={styles.details}>
          <h2>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather-icon"
          />
          <p>Temp: {weather.main.temp}°C</p>
          <p>Cloud: {weather.clouds.all}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>

          <button
            className={styles.favoriteButton}
            onClick={() => myFavorite(weather.name)}
          >
            {favorites.includes(weather.name)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      )}

      {forecast && (
        <div className={styles.forecast}>
          {forecast.slice(0, 5).map((item, index) => (
            <div className={styles.forecastItem} key={index}>
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
