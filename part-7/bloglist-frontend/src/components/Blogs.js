import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <div className='default-render'>
            <Link to={`/blogs/${blog.id}`}>
              {' '}
              {blog.title} {blog.author}{' '}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = ({ blogs }) => ({
  blogs,
})

const ConnectedBlogs = connect(mapStateToProps)(Blogs)

export default ConnectedBlogs
