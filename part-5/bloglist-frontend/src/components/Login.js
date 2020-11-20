import React from 'react'
import loginService from '../services/login'

const Login = ({ setUsername, setPassword, username, password, setUser }) => {
  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleNumberChange = (e) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const user = await loginService.login({ username, password })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    ) 
    setUser(user)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        username <input onChange={handleNameChange} />
      </div>
      <div>
        password <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>login</button>
      </div>
    </form>
  )
}

export default Login
