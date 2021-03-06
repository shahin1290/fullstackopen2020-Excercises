import React, { useState } from 'react'

const Blog = ({ blog, user, addLike, removeBlog }) => {
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

  return (
    <div style={blogStyle}>
      <div className='default-render'>
        {blog.title} {blog.author}
      </div>
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'} </button>
      <div style={{ display: visible ? '' : 'none' }} className='toggle-render'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
