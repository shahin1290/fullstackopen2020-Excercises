import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchText={searchText} setSearchText={setSearchText} />

      <h3>add a New</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        searchText={searchText}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
