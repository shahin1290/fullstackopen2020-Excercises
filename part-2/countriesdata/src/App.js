import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filterText={filterText} setFilterText={setFilterText} />
      <Countries
        countries={countries}
        filterText={filterText}
        setFilterText={setFilterText}
      />
    </div>
  )
}

export default App
