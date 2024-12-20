const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

    //validate username and password length >= 3
    if (username.length >= 3 && password.length >= 3) {
        try {
          const saltRounds = 10
          const passwordHash = await bcrypt.hash(password, saltRounds)
        
          const user = new User({
            username,
            name,
            passwordHash,
          })
        
          const savedUser = await user.save()
        
          response.status(201).json(savedUser)
        } catch (error) {
          response.status(404).json({ message: "An undefined error related to POSTing user occured" })
        }
    } else {
      response.status(403).json({ message: "Username or Password is of length less than 3" })
    }

})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

//change user Info / Add a blog to the user's blogs
usersRouter.put('/:id', async (request, response) => {
  const blogs = Blog.find({})


  try {

  } catch (error) {

  }
})

module.exports = usersRouter
