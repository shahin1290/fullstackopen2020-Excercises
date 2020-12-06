import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const Comments = ({ blogs, createComment }) => {
  const [comment, setComment] = useState('')
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (!blog) {
    return null
  }

  const addComment = (e) => {
    e.preventDefault()
    createComment(blog.id, comment)
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input type="text" value={comment} onChange={({ target }) => setComment(target.value)}/>
        <button type="submit">add comment</button>
      </form>
      {blog.comments.map((comment, key) => (
        <ul key={key}>
          <li>{comment}</li>
        </ul>
      ))}
    </div>
  )
}

const mapStateToProps = ({ blogs }) => ({
  blogs,
})

const mapDispatchToProps = {
 createComment
}

const ConnectedComments = connect(mapStateToProps, mapDispatchToProps)(Comments)

export default ConnectedComments
