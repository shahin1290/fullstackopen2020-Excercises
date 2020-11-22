import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, notification, setNotification }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = async (id) => {
    try {
      const blog = blogs.find((n) => n.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }

      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (error) {
      setNotification({
        ...notification,
        message: `${blog.title} was already removed from server`,
        type: 'danger',
      })
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => updateLikes(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
