import React, { useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const NewBlog = ({
  setTitle,
  setUrl,
  setAuthor,
  author,
  title,
  url,
  setBlogs,
  blogs,
  setNotification,
  notification,
}) => {
  const blogFormRef = useRef()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setNotification({
        ...notification,
        message: `a new blog ${title} by ${author} added`,
        type: 'success',
      })
    } catch (error) {
      setNotification({
        ...notification,
        message: `${error}`,
        type: 'danger',
      })
    }
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          title: <input onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </Togglable>
  )
}

export default NewBlog
