import React from 'react'
import blogService from '../services/blogs'

const newBlog = ({
  setTitle,
  setUrl,
  setAuthor,
  author,
  title,
  url,
  setBlogs,
  blogs,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
  }

  return (
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
  )
}

export default newBlog
