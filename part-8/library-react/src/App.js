import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import UpdateAuthor from './components/UpdateAuthor'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [page, setPage] = useState('authors')

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id)

    const bookDataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(bookDataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: bookDataInStore.allBooks.concat(addedBook) },
      })
    }

    const authorkDataInStore = client.readQuery({ query: ALL_AUTHORS })

    if (!includedIn(authorkDataInStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: [...authorkDataInStore.allAuthors, addedBook.author],
        },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`A new book has been added: ${addedBook.title}`)
      updateCacheWith(addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <LoginForm setToken={setToken} show={page === 'login'} />
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <UpdateAuthor show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
