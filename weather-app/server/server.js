const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Make sure this is at the top

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

console.log('API Key from environment:', API_KEY); // Add this line to debug

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    console.log(`Fetching weather for city: ${city}`);
    console.log(`Using API key: ${API_KEY}`);
    
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
