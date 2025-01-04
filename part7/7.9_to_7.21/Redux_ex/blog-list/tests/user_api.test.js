const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const testUser = {
  username: 'test-user',
  name: 'Jay Wellington Crawford',
  password: '123',
}

const shortPWTest = {
  username: 'test-user',
  name: 'Jay Wellington Crawford',
  password: '12',
}

const shortUserNameTest = {
  username: 'J',
  name: 'Jay Wellington Crawford',
  password: 'password123',
}

//Only one user is present
test('return a list of users of length 1', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 1)
})

//ID is converted from _id to id
test('the unique identifier is named id, not _id', async () => {
  const response = await api.get('/api/users')

  function checkIDkey(blogs) {
    blogs.forEach((blog) => {
      if (Object.prototype.hasOwnProperty.call(blog, 'id')) {
        return false
      }
    })
    return true
  }

  assert.strictEqual(checkIDkey(response.body), true)
})

describe('POST Requests', () => {
  test('making one a POST request creates one new user', async () => {
    const initResponse = api.get('/api/users/')
    const initLength = (await initResponse).body.length
    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondResponse = api.get('/api/users/')
    const secondLength = (await secondResponse).body.length

    //find the blog to delete
    let idToDelete
    ;(await secondResponse).body.forEach((user) => {
      if (user.username === 'test-user') {
        idToDelete = user.id
      }
    })

    await api.delete(`/api/users/${idToDelete}`).expect(204)

    const compare = secondLength - 1
    assert.strictEqual(compare, initLength)
  })

  test('POSTing a user with a password less than 3 characters results in 403: Forbidden error', async () => {
    await api.post('/api/users').send(shortPWTest).expect(403)
  })

  test('POSTing a user with a username less than 3 characters results in 403: Forbidden error', async () => {
    await api.post('/api/users').send(shortUserNameTest).expect(403)
  })
})

describe('DELETE Requests', () => {
  test('making one POST and then DELETEing it results in one POST and the correct DELETE', async () => {
    const initResponse = api.get('/api/users/')
    const initLength = (await initResponse).body.length
    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondResponse = api.get('/api/users/')
    const secondLength = (await secondResponse).body.length

    //find the blog to delete
    let idToDelete
    ;(await secondResponse).body.forEach((user) => {
      console.log(user)
      if (user.username === 'test-user') {
        idToDelete = user.id
      }
    })

    await api.delete(`/api/users/${idToDelete}`).expect(204)

    const compare = secondLength - 1
    assert.strictEqual(compare, initLength)
  })
})

describe('PUT Requests', () => {})

after(async () => {
  await mongoose.connection.close()
})
