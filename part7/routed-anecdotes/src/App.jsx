import { useState, useEffect } from 'react'

import React from 'react'
import { getAnecdotes, postAnecdote } from './services/anecdoteService'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'



const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const findAnecdote = anecdotes.filter(anecdote => anecdote.id == id ? anecdote : null)
  const anecdote = findAnecdote[0]

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>see more info at <Link to={anecdote.info} target="_blank" >{anecdote.info}</Link></p>
    </div>
  )
}
//


const AnecdoteList = ({ anecdotes }) => {
  const anecdoteList = [...anecdotes]
  return (
    (
      <div>
        <h2>Anecdotes</h2>
        <ul>
          {anecdoteList.map(anecdote =>
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href=''>Add your link here, Jay</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  if (notification) {
    return (
      <div>{notification}</div>
    )
  } else {
    return (
      null
    )
  }
}

let previousTimout;
const sendNotification = (setterFunction, message, durationInSeconds) => {
  if (previousTimout) {
    clearTimeout(previousTimout)
  }
  setterFunction(message)
  previousTimout = setTimeout(()=> setterFunction(''), durationInSeconds * 1000)
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getAnecdotes().then((response) => {
      setAnecdotes(response)
    })
  }, [])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log(anecdote)
    postAnecdote(anecdote)
    navigate('/')
    sendNotification(setNotification, `${anecdote.content} was posted!`, 5)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Notification notification={notification} />
      <h1>Software anecdotes</h1>

      <Menu />
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
