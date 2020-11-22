import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
        notification={notification}
        setNotification={setNotification}
      />
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
          notification={notification}
          setNotification={setNotification}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <p>
        {user.name} logged in <Logout setUser={setUser} />
      </p>
      
      <NewBlog
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        title={title}
        author={author}
        url={url}
        blogs={blogs}
        setBlogs={setBlogs}
        notification={notification}
        setNotification={setNotification}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
