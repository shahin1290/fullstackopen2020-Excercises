import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>

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
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ users }) => ({
  users,
})

const ConnectedUsers = connect(mapStateToProps)(Users)

export default ConnectedUsers
