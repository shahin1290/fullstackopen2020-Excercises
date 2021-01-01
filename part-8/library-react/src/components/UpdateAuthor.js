import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const UpdateAuthor = ({ show }) => {
  const [authorName, setAuthorName] = useState(null)
  const [bornYear, setBornYear] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

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

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <Select value={authorName} options={options} onChange={setAuthorName} />

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

export default UpdateAuthor
