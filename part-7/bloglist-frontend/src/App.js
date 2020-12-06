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
import Menu from './components/Menu'
import Comments from './components/Comments'

import { createBlog, initializeBlogs } from './reducers/blogReducer'

import { getCurrentUser, setCurrentUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

const App = ({
  initializeBlogs,
  createBlog,
  setNotification,
  loginUser,
  getCurrentUser,
  setCurrentUser,
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
    <Togglable buttonLabel='create new' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  return (
    <div>
      <Notification />

      {!loginUser ? (
        loginForm()
      ) : (
        <div>
          <Menu />
          <h2>blog app</h2>
          <Route exact path='/'>
            {blogForm()}
            <Blogs />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route exact path='/users/:id'>
            <User user={user} />
          </Route>
          <Route exact path='/blogs/:id'>
            <Blog />
            <Comments />
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
  getCurrentUser,
  setCurrentUser,
  getUsers,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
