import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  let [weatherData, setWeatherData] = useState(null);
  let [city, setCity] = useState("");
  let [error, setError] = useState(null);
  let [submittedCity, setSubmittedCity] = useState("");

  function changeForecast(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3a94f3778290bfeee61278505dbbe51d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse).catch(handleError);
    setSubmittedCity(city);
  }

  function handleResponse(response) {
    setWeatherData(response.data);
  }

  function handleError(error) {
    setError("Sorry, no forecast found");
  }

  function renderWeatherInfo() {
    if (error) {
      return <p>{error}</p>;
    } else if (weatherData) {
      return (
        <div>
          <h2>Weather in {submittedCity}</h2>
          <ul>
            <li>Temperature: {Math.round(weatherData.main.temp)}°C</li>
            <li>Wind Speed: {weatherData.wind.speed} m/s</li>
            <li>Humidity: {weatherData.main.humidity}%</li>
            <li>Weather: {weatherData.weather[0].description}</li>
            <li>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              />
            </li>
          </ul>
        </div>
      );
    }
  }

  return (
    <div className="Weather">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter your city..."
            onChange={changeForecast}
            value={city}
          />
          <input type="submit" value="Enter" />
        </form>
        {renderWeatherInfo()}
      </div>
    </div>
  );
}
