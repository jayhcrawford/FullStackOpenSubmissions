require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//get blog by ID
blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//take a token and return user id if valid
blogsRouter.post('/validate', async (request, response) => {
  const decodedToken = jwt.verify(request.body.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  } else {
    return response.json({ id: decodedToken.id })
  }
})

//Post a new blog
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  //verify that the token in the request header is valid
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  let userToChange = ''

  try {
    //Find User whose blogs array need to be changed
    userToChange = await User.findById(request.body.user)

    //post the new blog
    const savedBlog = await blog.save()

    //update the User's list of blogs
    userToChange.blogs = userToChange.blogs.concat(savedBlog._id)
    await userToChange.save()

    response.status(201).json(blog)
  } catch (error) {
    console.log(error)
    //TODO: Throw error if the user/blog relationship isn't found
    //TODO: Throw error if the blog doesn't have a URL
    //TODO: Throw error if the blog doesn't have a Title/Author
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})



blogsRouter.put('/:id/comments', async (request, response) => {
  try {
    const { id } = request.params
    const updates = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(id, updates)

    if (!updatedBlog) {
      return response.status(404).json({ message: 'Blog not found' })
    }
    response.json(updatedBlog)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const updates = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates)

    if (!updatedBlog) {
      return response.status(404).json({ message: 'Blog not found' })
    }
    response.json(updatedBlog)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

blogsRouter.patch('/like', async (request, response) => {
  try {
    const blog = await Blog.findById(request.body.id)
    blog.likes = request.body.likes
    await blog.save()
    response.json(blog)
  } catch (error) {
    console.log(error)
  }
})

module.exports = blogsRouter
