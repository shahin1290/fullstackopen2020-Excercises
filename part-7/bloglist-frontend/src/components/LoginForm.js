import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label='username'
            type='text'
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          <TextField
            label='password'
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            id='login-button'
          >
            login
          </Button>
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
  password: PropTypes.string.isRequired,
}

export default LoginForm
