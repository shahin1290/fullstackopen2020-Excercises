import React from 'react'

const Persons = ({persons, searchText}) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText)
  )

  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default Persons
