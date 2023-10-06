# Weather Dashboard

The Weather Dashboard is a web application that allows users to search for the current weather conditions of a city. Users can view information such as temperature, weather description, humidity, wind speed, and an icon representing the weather.

**Live Demo:** [Weather Dashboard](https://weather-app1609.vercel.app/)

## Features

- City Search: Users can enter the name of a city and click a "Search" button to get weather information for that city.
- Weather Display: After a successful search, the dashboard displays the current weather conditions, including temperature, weather description, humidity, and wind speed.
- Error Handling: Gracefully handles errors, displaying a message if the city is not found or if there is an issue with the API request.
- Unit Conversion: Provides an option to switch between Celsius and Fahrenheit for temperature display.
- Responsive Design: Ensures the dashboard is responsive and looks good on both desktop and mobile devices.

## Technologies Used

- React: The front-end framework for building the user interface.
- OpenWeatherMap API: Used to fetch weather data for the entered city.
- HTML and CSS: For structuring and styling the dashboard.
- JavaScript: For handling user interactions and data processing.
- Git: Version control system to track changes to the codebase.

## Usage

1. Clone this repository to your local machine:

https://github.com/dhruvpatel-alt/WeatherApp


2. Install dependencies:

`npm install`


3. Configure API Key:
- Get an API key from [OpenWeatherMap](https://openweathermap.org/api) and replace `'your-api-key'` in the `Dashboard.js` file with your actual API key.

4. Add Mapbox API Key:
- The application also requires a `REACT_APP_MAPBOX_API_KEY`. You can obtain a Mapbox API key from [Mapbox](https://www.mapbox.com/) and set it as an environment variable.

5. Run the application:

`npm run start`

6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to use the Weather Dashboard.



