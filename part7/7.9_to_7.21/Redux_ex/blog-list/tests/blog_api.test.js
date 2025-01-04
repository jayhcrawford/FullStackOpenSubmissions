const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const testPost = {
  title: 'test-post',
  author: 'Jay Wellington Crawford',
  url: 'www.google.com',
  likes: 1000000,
}

const noLikesKeyTest = {
  title: 'test-post',
  author: 'Jay Wellington Crawford',
  url: 'www.google.com',
}

const noURLTest = {
  title: 'test-post',
  author: 'Jay Wellington Crawford',
  likes: 1000000,
}

const noTitleTest = {
  author: 'Jay Wellington Crawford',
  url: 'www.google.com',
  likes: 1000000,
}

const invalidIDTest = {
  title: 'test-post',
  author: 'Jay Wellington Crawford',
  url: 'www.google.com',
  likes: 1000000,
  id: '20',
}

const validIDChangeTest = {
  title: 'test-post',
  author: 'Jay Wellington Crawford',
  url: 'www.yahoo.com',
  likes: 27,
}
/*
const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
*/
//Only if blogs are of length 1
test('return a list of blogs of length 1', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 1)
})

test('the unique identifier is named id, not _id', async () => {
  const response = await api.get('/api/blogs')

  function checkIDkey(blogs) {
    blogs.forEach((blog) => {
      if (!Object.prototype.hasOwnProperty.call(blog, 'id')) {
        return false
      }
    })
    return true
  }

  assert.strictEqual(checkIDkey(response.body), true)
})

describe('POST Requests', () => {
  test('making one a POST request creates one new blog post', async () => {
    const initResponse = api.get('/api/blogs/')
    const initLength = (await initResponse).body.length
    await api
      .post('/api/blogs')
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondResponse = api.get('/api/blogs/')
    const secondLength = (await secondResponse).body.length

    //find the blog to delete
    let idToDelete
    ;(await secondResponse).body.forEach((blog) => {
      if (blog.title === 'test-post') {
        idToDelete = blog.id
      }
    })

    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    const compare = secondLength - 1
    assert.strictEqual(compare, initLength)
  })

  test('POSTing a blog without a likes property will default it to 0', async () => {
    let blogToCheck = {}

    await api
      .post('/api/blogs')
      .send(noLikesKeyTest)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondResponse = api.get('/api/blogs/')

    //find the blog to delete
    let idToDelete
    ;(await secondResponse).body.forEach((blog) => {
      if (blog.title === 'test-post') {
        idToDelete = blog.id
        blogToCheck = blog
      }
    })

    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    assert.strictEqual(blogToCheck.likes, 0)
  })

  test('POSTing a blog without a title results in a 400: Bad Request error', async () => {
    await api.post('/api/blogs').send(noTitleTest).expect(400)
  })

  test('POSTing a blog without a URL results in a 400: Bad Request error', async () => {
    await api.post('/api/blogs').send(noURLTest).expect(400)
  })
})

describe('DELETE Requests', () => {
  test('making a DELETE request deletes one blog', async () => {
    const initResponse = api.get('/api/blogs/')
    const initLength = (await initResponse).body.length
    await api
      .post('/api/blogs')
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondResponse = api.get('/api/blogs/')
    const secondLength = (await secondResponse).body.length

    //find the blog to delete
    let idToDelete
    ;(await secondResponse).body.forEach((blog) => {
      if (blog.title === 'test-post') {
        idToDelete = blog.id
      }
    })

    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    const compare = secondLength - 1
    assert.strictEqual(compare, initLength)
  })
})

describe('PUT Requests', () => {
  test('attempting to change a blog with an invalid ID results in a 404', async () => {
    await api.put('/api/blogs').send(invalidIDTest).expect(404)
  })

  test('attempting to PUT updates to a blog with a valid ID results in a change', async () => {
    //POST a basic testPost to then PUT, and ultimately DELETE
    await api
      .post('/api/blogs')
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //Now GET again to find the new blog post
    const secondResponse = await api.get('/api/blogs').expect(200)

    //find the blog ID to change/delete
    let idToChange
    let idToDelete
    ;(await secondResponse).body.forEach((blog) => {
      if (blog.title === 'test-post') {
        idToChange = blog.id
        idToDelete = blog.id
      }
    })

    //assign the ID from the secondResponse GET request to the test blog
    validIDChangeTest.id = idToChange

    //PUT the test blog updates
    await api
      .put(`/api/blogs/${idToDelete}`)
      .send(validIDChangeTest)
      .expect(200)

    //Find the updated blog
    const updatedBlogs = await api.get('/api/blogs')
    //updateChecker is used to validate if the PUT occured
    let updateChecker
    updatedBlogs.body.forEach((blog) => {
      if (blog.id === idToChange) {
        updateChecker = blog
      }
    })

    //DELETE the updated blog
    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    //updatedChecker comes from the most recent GET to the API, validIDChangeTest was posted prior
    assert.deepStrictEqual(updateChecker, validIDChangeTest)
  })
})

after(async () => {
  await mongoose.connection.close()
})
