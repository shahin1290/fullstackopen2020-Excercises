import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = ({ show }) => {
  const [authorName, setAuthorName] = useState(null)
  const [bornYear, setBornYear] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))


  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: authorName.value,
        setBornTo: Number(bornYear),
      },
    })

    setAuthorName(null)
    setBornYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <Select
        value={authorName}
        options={options}
        onChange={setAuthorName}
      />

      <form onSubmit={submit}>
        <div>
          born
          <input
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
