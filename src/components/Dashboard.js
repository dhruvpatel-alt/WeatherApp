import React, { useState, useEffect } from 'react';
import { fetchPlace } from './fetchPlace';
import './Dashboard.css'
import {getWeatherBackground} from './WeatherBackground'
import {handleUnitToggle} from './UnitToggle'
function Dashboard() {
  const [city, setCity] = useState('Amsterdam');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [error, setError] = useState(null);
  const weatherBackground = getWeatherBackground(weatherData ? weatherData.weather[0].icon : '');
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState('');

  const handleCitySearch = async (selectedCity) => {
    try {
        if (selectedCity===""){
            setError('Pls Enter a valid City!');
            return
        }
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=${unit}&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        if (response.status===404){
            let cityName=(selectedCity.split(',')[0])
            if (cityName===selectedCity){
                setError('City not found , Pls try with Valid City!');
            }
            else{
                handleCitySearch(cityName)
            }
        }else if(response.status===400){
                setError('Pls Enter a valid City!');
        }
         else{
            setError('Something Went Wrong, Pls try Again!');
        }

      }
    } catch (error) {
      setError('An error occurred while fetching data.');
      setWeatherData(null);
    }
  }

  const handleCityInputChange = async (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    if (!inputValue) {
      setAutocompleteCities([]); // Clear suggestions when the input is empty
      return;
    }

    const res = await fetchPlace(inputValue);
    !autocompleteCities.includes(inputValue) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr('');
  };

  const handleSearchClick = () => {
    handleCitySearch(city);
  };

  const handleSuggestionSelect = (selectedCity) => {
    if (autocompleteCities.includes(selectedCity)) {
        setCity(selectedCity);
        setAutocompleteCities([]); // Clear suggestions when a city is selected
        handleCitySearch(selectedCity);
    }
  };

 

  useEffect(()=>{
    handleCitySearch(city)
  },[])

  return (
    <div className={`dashboard-container`}>
      <h1>Weather Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityInputChange}
          list="city-suggestions"
          onInput={(e)=>handleSuggestionSelect(e.target.value)}
        />
        <datalist id="city-suggestions">
          {autocompleteCities.map((city, i) => (
            <option
              key={i}
            >
              {city}
            </option>
          ))}
        </datalist>
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={()=>handleUnitToggle(unit,setUnit,weatherData,setWeatherData)}>Toggle Unit</button>
      </div>
      {weatherData && (
        <div className={`weather-info ${weatherBackground}`}>
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="temperature">
            Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Dashboard;
