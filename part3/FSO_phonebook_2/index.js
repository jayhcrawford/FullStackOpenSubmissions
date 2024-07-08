require('dotenv').config()
const Contact = require('./models/contact')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

//errors to move into errorHandler:
/*
400 malformatted id
(delete) not found
already exists
500 unexpected server condition

*/

//Express, morgan, cors stuff
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))
app.use(express.json())
var morgan = require('morgan')
morgan.token('body', function (request, result) { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))




app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})




//compatibility updated for Mongoose
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contact => {
    response.json(contact)
  })
})

//compatibility updated for Mongoose
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findById(id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(
    request.params.id,
    contact,
    { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body.name)

  if (body === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))


  //everything below is before exercise 3.14 where functionality is not yet switched to mongoose and MongoDB
  /*
  const person = {
    ...request.body,
    id: generateId()
  };


  if (!person.name) {
    return response.status(400).json({
      error: 'The body of this POST request does not contain a contact name'
    })
  } else if (!person.number) {
    return response.status(400).json({
      error: 'The body of this POST request does not contain a contact number'
    })
  } else if (phonebook.find(entry => entry.name === person.name)) {
    return response.status(400).json({
      error: `${person.name} is already in the phonebook`
    })
  } else {
    return response.json(person);
  }
    */
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.use(errorHandler)
