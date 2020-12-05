import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import {
  createBlog,
  initializeBlogs,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'

import { getCurrentUser, setCurrentUser, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

const App = ({
  initializeBlogs,
  createBlog,
  setNotification,
  loginUser,
  getCurrentUser,
  setCurrentUser,
  logout,
  getUsers,
  users,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    initializeBlogs()
    getUsers()
    getCurrentUser()
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

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

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
          <h1>Users</h1>
          <Users />
          <Route exact path='/users/:id'>
            <User user={user} />
          </Route>
          {blogForm()}
          <Blogs />
          <Route exact path='/blogs/:id'>
            <Blog />
          </Route>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ blogs, loginUser, users }) => ({
  blogs,
  createBlog,
  loginUser,
  users,
})

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  getCurrentUser,
  setCurrentUser,
  logout,
  getUsers,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
