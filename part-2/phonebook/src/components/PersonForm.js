import axios from 'axios'
const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const isNameExists = persons.some(
      (person) => person.name === newName.trim()
    )

    if (isNameExists) {
      return alert(`${newName.trim()} is already added to phonebook`)
    }

    axios
      .post('http://localhost:3001/persons', {
        name: newName.trim(),
        number: newNumber,
      })
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={handleFormSubmit}>
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
  )
}

export default PersonForm
