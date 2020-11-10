import React, { useState, useEffect } from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

const WeatherData = ({ country }) => {
  const [WeatherData, setWeatherData] = useState('')

  const { capital } = country

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: API_KEY,
          query: capital,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data.current)
      })
  }, [capital])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>
        <strong> temperature: </strong>
        {WeatherData.temperature} Celsius
      </div>

      <img src={WeatherData.weather_icons} alt='weather icons' />
      <div>
        <strong>wind: </strong>
        {WeatherData.wind_speed} kph direction {WeatherData.wind_dir}
      </div>
    </div>
  )
}

export default WeatherData
