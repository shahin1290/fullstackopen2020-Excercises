import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { getCurrentUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRouteMatch } from 'react-router-dom'

const Blog = ({ setNotification, likeBlog, deleteBlog, blogs, loginUser }) => {
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (!blog) {
    return null
  }

  const addLike = () => {
    const { title, id } = blog
    try {
      const blogFound = blogs.find((n) => n.id === id)
      const changedBlog = { ...blogFound, likes: blog.likes + 1 }
      likeBlog(changedBlog)
    } catch (error) {
      setNotification(`${title} was already removed from server`, 'danger', 5)
    }
  }

  const removeBlog = async () => {
    const { id, title } = blog

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        deleteBlog(id)
        setNotification('the blog is removed successfully', 'success', 3)
      } catch (error) {
        setNotification(`${title} was already removed from server`, 'danger', 5)
      }
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={addLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <div>
        {' '}
        {loginUser && loginUser.username === blog.user.username && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ blogs, loginUser }) => ({
  blogs,
  loginUser,
})

const mapDispatchToProps = {
  setNotification,
  deleteBlog,
  likeBlog,
  getCurrentUser,
}

const ConnectedBlop = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlop
