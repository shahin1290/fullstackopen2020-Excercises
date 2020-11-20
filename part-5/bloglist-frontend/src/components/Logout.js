import React from 'react'

const Logout = ({ setUser }) => {
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <span>
      <button onClick={handleClick}>logout</button>
    </span>
  )
}

export default Logout
