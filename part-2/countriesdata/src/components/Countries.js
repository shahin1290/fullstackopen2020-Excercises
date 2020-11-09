import React from 'react'
import DisplayCountryData from './DisplayCountryData'
import DisplayCountryList from './DisplayCountryList'

const Countries = ({ countries, filterText, setFilterText }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filterText)
  )

  if (filterText === '' || filteredCountries.length === 0) return null

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length > 1) {
    return (
      <DisplayCountryList
        countries={filteredCountries}
        setFilterText={setFilterText}
        filterText={filterText}
      />
    )
  } else {
    return <DisplayCountryData country={filteredCountries[0]} />
  }
}

export default Countries
