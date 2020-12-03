import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import {
  createBlog,
  initializeBlogs,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'

const App = ({
  blogs,
  initializeBlogs,
  createBlog,
  setNotification,
  deleteBlog,
  likeBlog,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchBlogs() {
      initializeBlogs()
    }

    fetchBlogs()
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
      setNotification('wrong username or password', 'danger', 3)
    }
  }

  const addBlog = async (newObject) => {
    try {
      createBlog(newObject)
      blogFormRef.current.toggleVisibility()
      setNotification(
        `a new blog ${newObject.title} by ${newObject.author} added`,
        'success',
        5
      )
    } catch (error) {
      setNotification(`${error}`, 'danger', 5)
    }
  }

  const addLike = async (blog) => {
    const { id, title } = blog
    try {
      const blogFound = blogs.find((n) => n.id === id)
      const changedBlog = { ...blogFound, likes: blog.likes + 1 }

      await likeBlog(id, changedBlog)
    } catch (error) {
      setNotification(`${title} was already removed from server`, 'danger', 5)
    }
  }

  const removeBlog = async (blog) => {
    const { id, title } = blog

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        deleteBlog(id)
        setNotification('the blog is removed successfully', 'success', 3)
      } catch (error) {
        setNotification(`${title} was already removed from server`, 'danger', 5)
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
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const showBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog)}
        user={user}
        removeBlog={removeBlog}
      />
    ))
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification />

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

const mapStateToProps = ({ blogs }) => ({
  blogs,
  createBlog,
})

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
