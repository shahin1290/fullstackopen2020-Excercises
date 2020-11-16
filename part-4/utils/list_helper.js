const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acu, item) => acu + item.likes, 0)

const favoriteBlog = (blogs) => {
  const blogFound = blogs.reduce((prev, curr) => {
    return (prev.likes > curr.likes) ? prev : curr
  })
  //console.log(_.pick(blogFound, ['author', 'title', 'likes']));
  return _.pick(blogFound, ['author', 'title', 'likes'])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog  
}
