import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Filter from './Filter'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres')
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks()
  }, [show, getBooks])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Filter getBooks={getBooks} setGenre={setGenre} />
    </div>
  )
}

export default Books
