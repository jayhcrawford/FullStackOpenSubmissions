import { useState, useEffect, useRef } from 'react'

import { useField } from './hooks'

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

    See <a href='https://github.com/jayhcrawford/FullStackOpenSubmissions/tree/main/part7/routed-anecdotes'>https://github.com/jayhcrawford/FullStackOpenSubmissions/tree/main/part7/routed-anecdotes</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleReset = (event) => {
    event.preventDefault();
    content.onReset();
    author.onReset();
    info.onReset();
  };


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
      <form onSubmit={handleSubmit} >
        <div>
          content
          <input {...content} /> {/*content*/}
        </div>
        <div>
          author
          <input {...author} /> {/*author*/}
        </div>
        <div>
          url for more info
          <input {...info} /> {/*info*/}
        </div>
        <button>create</button> <button onClick={handleReset}>reset</button>
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
  previousTimout = setTimeout(() => setterFunction(''), durationInSeconds * 1000)
}

function ensureHttps(url) {
  if (!url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getAnecdotes().then((response) => {
      setAnecdotes(response)
    })
  }, [notification])

  const addNew = async (anecdote) => {
    let newPost = {};
    newPost.id = Math.round(Math.random() * 10000)
    const formattedURL = ensureHttps(anecdote.info.value)
    newPost = {
      ...newPost,
      author: anecdote.author.value,
      content: anecdote.content.value,
      info: formattedURL,
      votes: anecdote.votes
    }

    const result = await postAnecdote(newPost)

    if (result.status != 201) {
      sendNotification(setNotification, `A ${result.status} error occurred. This is likely due to unfilled inputs, or input values of fewer than 5 characters`, 5)
    } else {
      navigate('/')
      sendNotification(setNotification, `${newPost.content} was posted!`, 5)
    }
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
