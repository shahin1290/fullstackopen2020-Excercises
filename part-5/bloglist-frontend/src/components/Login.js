import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({
  setUsername,
  setPassword,
  username,
  password,
  setUser,
  notification,
  setNotification,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setNotification({
        ...notification,
        message: 'wrong username or password',
        type: 'danger',
      })
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        username <input onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input onChange={({ target }) => setPassword(target.value)} />
      </div>
      <div>
        <button type='submit'>login</button>
      </div>
    </form>
  )
}

export default Login
