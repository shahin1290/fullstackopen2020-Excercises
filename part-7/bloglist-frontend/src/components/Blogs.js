import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogs = ({ blogs }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {sortedBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className='default-render'>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = ({ blogs }) => ({
  blogs,
})

const ConnectedBlogs = connect(mapStateToProps)(Blogs)

export default ConnectedBlogs
