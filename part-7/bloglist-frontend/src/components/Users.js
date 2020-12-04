import React from 'react'
import { connect } from 'react-redux'

const Users = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const mapStateToProps = ({ users }) => ({
  users,
})

const ConnectedUsers = connect(mapStateToProps)(Users)

export default ConnectedUsers
