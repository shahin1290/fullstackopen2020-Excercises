import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {
  createBlog,
  initializeBlogs,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'

import { getCurrentUser, setCurrentUser, logout } from './reducers/loginReducer'

const App = ({
  blogs,
  initializeBlogs,
  createBlog,
  setNotification,
  deleteBlog,
  likeBlog,
  loginUser,
  getCurrentUser,
  setCurrentUser,
  logout
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchBlogs() {
      await initializeBlogs()
      await getCurrentUser()
    }

    fetchBlogs()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await setCurrentUser(username, password)
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
        user={loginUser}
        removeBlog={removeBlog}
      />
    ))
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification />

      {!loginUser ? (
        loginForm()
      ) : (
        <div>
          <p>
            {loginUser.name} logged in <button onClick={logout}>logout</button>
          </p>
          {blogForm()}

          {showBlogs()}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ blogs, loginUser }) => ({
  blogs,
  createBlog,
  loginUser,
})

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  getCurrentUser,
  setCurrentUser,
  logout
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
