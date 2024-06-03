import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Unable to fetch weather data');
            setWeather(null);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="weather-container">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={fetchWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>
            {error && <p>{error}</p>}
            {weather && !loading && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>{Math.round(weather.main.temp - 273.15)}°C</p>
                    <p>{Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
