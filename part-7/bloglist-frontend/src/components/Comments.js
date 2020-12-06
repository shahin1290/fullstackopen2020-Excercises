import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'

const Comments = ({ blogs }) => {
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>Comments</h3>
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

const ConnectedComments = connect(mapStateToProps)(Comments)

export default ConnectedComments
