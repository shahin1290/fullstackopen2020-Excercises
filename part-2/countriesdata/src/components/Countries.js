import React from 'react'
import CountryData from './CountryData'

const Countries = ({ countries, searchText }) => {
  if (searchText === '') return null

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText)
  )

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name}>{country.name}</div>
        ))}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return <CountryData country={filteredCountries[0]} />
  } else return null
}

export default Countries
