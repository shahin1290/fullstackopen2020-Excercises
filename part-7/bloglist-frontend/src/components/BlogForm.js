import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (e) => {
    e.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog} className='formDiv'>
        <div>
          <div>
            <TextField
              label='title'
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <TextField
              label='author'
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <TextField
              label='url'
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              id='create-button'
            >
              create
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}
export default BlogForm
