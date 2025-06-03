import React, { useState } from "react";

const apiKey = "f1144a4c82aec237e07ef34b12a79d1b";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Indtast venligst et bynavn.");
      return;
    }
    setError("");

    try {
      // Fetch city coordinates
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        setError("Byen blev ikke fundet.");
        return;
      }

      const { lat, lon, name } = geoData[0];

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        name: name,
        temp: weatherData.main.temp,
        icon: weatherData.weather[0].icon,
      });
    } catch (err) {
      setError("Noget gik galt. Prøv igen.");
    }
  };

  return (
    <div>
      <h1>Søg efter vejr</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Indtast bynavn"
      />
      <button onClick={getWeather}>Hent Vejr</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>Vejret i {weather.name}</h2>
          <p>Temperatur: {weather.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            alt="Vejr ikon"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
