export function getWeatherBackground (weatherCode)  {
    // Define background colors or themes for different weather conditions
    switch (weatherCode) {
      case '01d':
        return 'clear-sky-day';
      case '01n':
        return 'clear-sky-night';
      case '02d':
      case '03d':
      case '04d':
        return 'cloudy-day';
      case '02n':
      case '03n':
      case '04n':
        return 'cloudy-night';
      case '09d':
      case '10d':
      case '11d':
      case '13d':
        return 'rainy-day';
      case '09n':
      case '10n':
      case '11n':
      case '13n':
        return 'rainy-night';
      default:
        return 'default-theme';
    }
  };
