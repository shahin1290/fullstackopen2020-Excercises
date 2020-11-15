const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acu, item) => acu + item.likes, 0)

module.exports = {
  dummy,
  totalLikes,
}
