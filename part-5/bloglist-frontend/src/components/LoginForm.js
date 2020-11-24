import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  
  return (
    <div>
    <h2>Log in to application</h2>

    <form onSubmit={handleSubmit}>
      <div>
        username <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password <input value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <button type='submit'>login</button>
      </div>
    </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string.isRequired
}

export default LoginForm
