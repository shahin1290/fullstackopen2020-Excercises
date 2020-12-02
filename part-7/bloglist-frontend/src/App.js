import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: '' })
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        ...notification,
        message: 'wrong username or password',
        type: 'danger',
      })
    }
  }

  const addBlog = async (newObject) => {
    try {
      const newBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setNotification({
        ...notification,
        message: `a new blog ${newObject.title} by ${newObject.author} added`,
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

  const addLike = async (blog) => {
    const { id, title } = blog
    try {
      const blogFound = blogs.find((n) => n.id === id)
      const changedBlog = { ...blogFound, likes: blog.likes + 1 }

      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (error) {
      setNotification({
        ...notification,
        message: `${title} was already removed from server`,
        type: 'danger',
      })
    }
  }

  const removeBlog = async (blog) => {
    const { id, title } = blog

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.destroy(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        setNotification({
          ...notification,
          message: 'the blog is removed successfully',
          type: 'success',
        })
      } catch (error) {
        setNotification({
          ...notification,
          message: `${title} was already removed from server`,
          type: 'danger',
        })
      }
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const showBlogs = () =>
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog)}
        user={user}
        removeBlog={removeBlog}
      />
    ))

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />

      {!user ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <Logout setUser={setUser} />
          </p>
          {blogForm()}

          {showBlogs()}
        </div>
      )}
    </div>
  )
}

export default App
