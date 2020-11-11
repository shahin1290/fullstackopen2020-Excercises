import React from 'react'
import personService from '../services/persons'

const Persons = ({
  persons,
  searchText,
  setPersons,
  notification,
  setNotification,
}) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText)
  )

  const deletePerson = (person) => {
    const { id, name } = person

    if (window.confirm(`Delete ${name} ?`))
      personService.destroy(person.id).then(() => {
        setPersons(persons.filter((item) => item.id !== id))
        setNotification({...notification, message: `Information of ${name} has been removed from server`, type: 'success'})
      }).catch((err) => {
        setNotification({...notification, message: `Information of ${name} has already been removed from server`, type: 'danger'})
        setPersons(persons.filter((item) => item.id !== id))
      })
  }

  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons
