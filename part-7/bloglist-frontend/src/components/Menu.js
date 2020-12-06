import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const Menu = ({ loginUser, logout }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        <span>
          {loginUser.name} logged in{' '}
          <Button color='inherit' onClick={logout}>
            logout
          </Button>
        </span>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ loginUser }) => ({
  loginUser,
})

const mapDispatchToProps = {
  logout,
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default ConnectedMenu
