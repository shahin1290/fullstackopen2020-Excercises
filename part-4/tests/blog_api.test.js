const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testHelper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(testHelper.initialBlogs[1])
  await blogObject.save()
})

describe('viewing saved blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
  })

  test('the first blog is about React Patterns', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('React patterns')
  })

  test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map((r) => r.id)
    expect(ids[0]).toBeDefined()
  })
})

describe('creating new blog ', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAfterPost = await testHelper.blogsInDB()

    const titles = blogsAfterPost.map((r) => r.title)

    expect(blogsAfterPost).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(titles).toContain('Canonical string reduction')
  })

  test('sets default value to 0 if the likes property is missing', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)

    const { likes } = response.body

    expect(likes).toBe(0)
  })

  test('responds bad request if the title or url property is missing,', async () => {
    const newBlog = {
      likes: 10,
      author: 'Edsger W. Dijkstra',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBeforeDelete = await testHelper.blogsInDB()
    const { id, title } = blogsBeforeDelete[0]

    await api.delete(`/api/blogs/${id}`).expect(204)

    const blogsAfterDelete = await testHelper.blogsInDB()
    expect(blogsAfterDelete.length).toBe(testHelper.initialBlogs.length - 1)

    const titles = blogsAfterDelete.map((r) => r.title)
    expect(titles).not.toContain(title)
  })
})

describe('update a blog', () => {
  test('successfully returns the blog with updated properties', async () => {
    const blogsBeforeUpdate = await testHelper.blogsInDB()
    const { id, likes } = blogsBeforeUpdate[0]

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: likes + 5 })
      .expect(200)

    const blogsAfterUpdate = await testHelper.blogsInDB()
    expect(blogsAfterUpdate[0].likes).toBe(likes + 5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
