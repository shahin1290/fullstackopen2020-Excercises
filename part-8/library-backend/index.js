const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    /* allBooks: (parent, args) => {
      if (!args.genre && !args.author) {
        return books
      }

      if (!args.author && args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      }

      if (args.author && !args.genre) {
        return books.filter((book) => book.author === args.author)
      }

      if (args.author && args.genre) {
        const filterByGenre = books.filter((book) =>
          book.genres.includes(args.genre)
        )
        return filterByGenre.filter((book) => book.author === args.author)
      }
    },
    allAuthors: () => authors, */
  },
  /* Author: {
    bookCount: (root) => {
      const booksByAuthor = books.filter((book) => book.author === root.name)
      return booksByAuthor.length
    },
  }, */
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
      }

      const newBook = new Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres,
      })
      await newBook.save()
      return newBook
    },
    /* editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }

      const editedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) =>
        a.id === editedAuthor.id ? editedAuthor : a
      )
      return editedAuthor
    }, */
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
