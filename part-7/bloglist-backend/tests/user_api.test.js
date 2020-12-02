const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username is not given', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      name: 'shahin',
      password: 'shahin',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password is not given', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'shahin',
      name: 'shahin',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password is required')

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username is not consisted of permitted characters', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'sh',
      name: 'Superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username')

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password is not consisted of permitted characters', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'shahin',
      name: 'Superuser',
      password: 'pa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'Password must at least 3 characters'
    )

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
