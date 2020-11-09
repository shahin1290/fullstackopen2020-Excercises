import React from 'react'

const DisplayCountryList = ({ countries, setFilterText }) => {
  const showCountryData = (e) => {
    setFilterText(e.target.value)
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}
          <button value={country.name.toLowerCase()} onClick={showCountryData}>
            show
          </button>
        </div>
      ))}
    </div>
  )
}

export default DisplayCountryList
