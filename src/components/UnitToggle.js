export function handleUnitToggle (unit,setUnit,weatherData,setWeatherData)  {
    // Toggle between 'metric' (Celsius) and 'imperial' (Fahrenheit) units
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
  
    // Recalculate the temperature and wind speed in the new unit without making a new request
    if (weatherData) {
      const convertedTemp = newUnit === 'metric' ? convertToCelsius(weatherData.main.temp) : convertToFahrenheit(weatherData.main.temp);
      const convertedWindSpeed = newUnit === 'imperial' ? convertToMph(weatherData.wind.speed) : convertToMetersPerSecond(weatherData.wind.speed);
      setWeatherData({
        ...weatherData,
        main: {
          ...weatherData.main,
          temp: Math.round(convertedTemp*100)/100,
        },
        wind: {
          ...weatherData.wind,
          speed: Math.round(convertedWindSpeed*100)/100,
        },
      });
    }
  };
  
  // Helper function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;
  
  // Helper function to convert Fahrenheit to Celsius
  const convertToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;
  
  // Helper function to convert m/s to mph
  const convertToMph = (metersPerSecond) => metersPerSecond * 2.237;
  
  // Helper function to convert mph to m/s
  const convertToMetersPerSecond = (mph) => mph / 2.237;
  