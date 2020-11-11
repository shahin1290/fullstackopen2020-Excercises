import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        notification={notification}
        setNotification={setNotification}
      />

      <Filter searchText={searchText} setSearchText={setSearchText} />

      <h3>add a New</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        notification={notification}
        setNotification={setNotification}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        searchText={searchText}
        setPersons={setPersons}
        notification={notification}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App
