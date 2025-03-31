


 import "./Weather.css"

import humidityIco from "../../assets/humidity.png"





 import React, { useState, useEffect } from 'react'; 
  import { getWeatherData, getWeatherForecast } from "../../service/WeatherService" 




 const Weather = () => {
    
   const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
   const [forecast, setForecast] = useState(null);
   const [error, setError] = useState('');
   const [favorites, setFavorites] = useState([]);

   useEffect(() => {
     setFavorites(JSON.parse(localStorage.getItem('')) || []);
   }, []);

   const searchCity = async () => {
     try {
       const [weatherData, forecastData] = await Promise.all([getWeatherData(city), getWeatherForecast(city)]);
       setWeather(weatherData);
       setForecast(forecastData);
     } catch { 
       setError (<p className="not-found">"City not found. Please Enter a valid City Name" </p> );
     }
   };
      
   const FavoriteCity = (city) => {
     const updatedFavorites = favorites.includes(city) 
       ? favorites.filter(FavoriteCitycity => FavoriteCitycity !== city)
       : [...favorites, city];
     setFavorites(updatedFavorites);
     localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));

     
   };


   


  
   return (
     <div>
       <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name" /> <br />
       <button onClick={searchCity}>Search</button> <br /> <br /> <br />
       <button onClick={() => FavoriteCity(city)}> 
         {favorites.includes(city) ? 'Remove from Favorites' : 'Add to Favorites'}
       </button>

       {error && <p>{error}</p>}
       {weather && (
         <div>
           <h2>{weather.name}</h2>
           {favorites.length > 0 && (




<div className="favorites">


  <h3>Favorites</h3>
  <ul>
    {favorites.map((city, idx) => <li key={idx}>{city}</li>)}
  </ul>
</div>
)}

           <div className="img"> 
           <p> <img src="src/assets/sun2.jpeg" alt="" />
          <h3> Temp: {weather.main.temp}°C </h3></p>
           
            <p> <img src="src/assets/cloud.jpg" alt="" />
            <h3> Cloud: {weather.clouds.all}% </h3></p>
            <p> <img src="src/assets/wind.jpg" alt="" />
            <h3>Wind Speed: {weather.wind?.speed}m/s </h3> </p>
            
                 
           </div>


          </div>
        
       )}

       {forecast && (
         <div className="days">
          
           {forecast.slice(0, 5).map((forecastItem, index) => (

             <div key={index}>
              <p>  {new Date (forecastItem.dt*1000).toDateString()} : <br />  Temp -{forecastItem.main.temp}°C - Cloud {forecastItem.clouds.all}% - "Speed" {forecastItem.wind.speed}m/s "Wind-Speed"  </p>
              

           
             </div>


           ))}
         </div>
       )}

       
      
     </div>
   );
 };

 export default Weather;
  


