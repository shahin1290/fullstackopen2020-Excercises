import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Filter = ({ getBooks, setGenre }) => {
  const { loading, data } = useQuery(ALL_BOOKS)

  if (loading) return null

  const genres = () => {
    let genres = []

    data.allBooks.forEach((book) => {
      for (let genre in book.genres) {
        if (!genres.includes(book.genres[genre])) {
          genres.push(book.genres[genre])
        }
      }
    })
    return genres
  }

  const handleClick = (genre) => {
    getBooks({ variables: { genre } })
    setGenre(genre)
  }

  return (
    <div>
      {genres().map((genre) => (
        <button key={genre} onClick={() => handleClick(genre)}>
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          getBooks()
          setGenre('all genres')
        }}
      >
        all genres
      </button>
    </div>
  )
}

export default Filter
