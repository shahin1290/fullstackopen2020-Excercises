import React from 'react'
import WeatherData from './WeatherData'

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt='Flag' width='120' />

      <WeatherData country={country}/>
    </div>
  )
}

export default CountryData
