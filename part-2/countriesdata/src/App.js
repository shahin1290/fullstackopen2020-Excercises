import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])
  return (
    <div>
      <Filter searchText={searchText} setSearchText={setSearchText} />
      <Countries countries={countries} searchText={searchText} />
    </div>
  )
}

export default App
