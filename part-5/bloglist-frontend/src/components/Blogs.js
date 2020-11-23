import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, setNotification, notification }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          notification={notification}
          setNotification={setNotification}
        />
      ))}
    </div>
  )
}

export default Blogs
