import personService from '../services/persons'

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  notification,
  setNotification 
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
      const personFound = persons.find((person) => person.name === newName)
      const changedPerson = { ...personFound, number: newNumber }
      if (
        window.confirm(
          `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personFound.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            setNotification({...notification, message:`${newName} has been updated successfully`, type: 'success'})
          })
      }
    } else {
      personService
        .create({
          name: newName.trim(),
          number: newNumber,
        })
        .then((response) => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setNotification({...notification, message:`Added ${newName}`, type: 'success'})
          
        })
    }
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
