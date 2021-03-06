const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acu, item) => acu + item.likes, 0)

const favoriteBlog = (blogs) => {
  const blogFound = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr
  )

  return _.pick(blogFound, ['author', 'title', 'likes'])
}

const mostBlogs = (blogs) => {
  const groupByAuthor = _(blogs)
    .groupBy('author')
    .map((items, author) => ({ author: author, blogs: items.length }))

  return groupByAuthor.reduce((prev, curr) =>
    prev.blogs > curr.blogs ? prev : curr
  )
}

const mostLikes = (blogs) => {
  const groupByAuthorAndLikes = _(blogs)
    .groupBy('author')
    .map((items, author) => ({
      author: author,
      likes: items.reduce((acu, curr) => acu + curr.likes, 0),
    }))

  return groupByAuthorAndLikes.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
