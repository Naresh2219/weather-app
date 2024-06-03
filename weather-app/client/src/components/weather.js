import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Unable to fetch weather data');
            setWeather(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h3>{weather.name}</h3>
                    <p>{weather.weather[0].description}</p>
                    <p>{Math.round(weather.main.temp - 273.15)}°C</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
