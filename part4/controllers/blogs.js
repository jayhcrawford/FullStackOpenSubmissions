const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const userToChange = await User.findById(blog.user)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
 
    try {
      //try to post the content
      const savedBlog = await blog.save()
      userToChange.blogs = userToChange.blogs.concat(savedBlog._id)
      await userToChange.save()
      response.status(201).json(blog)
    }
    catch (error) 
    {
      let errorMessage = "undefined error";

      if (!userToChange) {
        errorMessage = "The user was not found"
      }

      if (!blog.hasOwnProperty("title")) {
        errorMessage = "Bad Request (Blog doesn't have title)"
      }
      if (!blog.hasOwnProperty("url")) {
        errorMessage = "Bad Request (Blog doesn't have URL)"
      }
      response.status(400).json({ message: errorMessage })
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

blogsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updates = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates);

    if (!updatedBlog) {
      return response.status(404).json({ message: 'Blog not found' });
    }
    response.json(updatedBlog);

  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


module.exports = blogsRouter
