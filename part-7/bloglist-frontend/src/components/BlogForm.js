import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div >
      <h2>create new</h2>
      <form onSubmit={addBlog} className='formDiv'>
        <div >
          title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div >
          author: <input id='author'value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div >
          url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button id="create-button" type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm
