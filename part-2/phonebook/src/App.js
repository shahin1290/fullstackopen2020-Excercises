import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const isNameExists = persons.some(
      (person) => person.name === newName.trim()
    )

    if (isNameExists) {
      return alert(`${newName.trim()} is already added to phonebook`)
    }
    setPersons(persons.concat({ name: newName.trim(), number: newNumber }))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const Numbers = () => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchText)
    )
    return filteredPersons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    ))
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with:
      <input value={searchText} onChange={handleSearchChange} />
      <h2>add a New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers />
    </div>
  )
}

export default App
