import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Menu = ({ loginUser, logout}) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <span style={padding}>{loginUser.name} logged in <button onClick={logout}>logout</button></span>
    </div>
  )
}

const mapStateToProps = ({ loginUser }) => ({
  loginUser,
})

const mapDispatchToProps = {
  logout,
}

const ConnectedMenu= connect(mapStateToProps, mapDispatchToProps)(Menu)

export default ConnectedMenu
