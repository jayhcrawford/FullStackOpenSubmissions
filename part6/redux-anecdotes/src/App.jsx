import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import anecdoteReducer, { vote, addNew } from './reducers/anecdoteReducer'
import filterReducer, { addFilter } from './reducers/filterReducer'
import notificationReducer, { addNotification, remNotification } from './reducers/notificationReducer'


import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'



const App = () => {
  const anecdotes = useSelector(state => {
    if (state.filter != '') {
      let filtered = state.anecdotes.filter((anecdote) => {
        if (anecdote.content.includes(state.filter)) {
          return anecdote
        } else {
          return ''
        }
      })
      return filtered
    } else {
      return state.anecdotes
    }
  })
  const dispatch = useDispatch()

  const addVote = (id) => {
    dispatch(vote(id))
    sendNotification('A vote was cast!')
  }

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNew(anecdote))
    sendNotification(`\'${anecdote}\' anecdote was added!`)
  }

  const filterAnecdotes = (filterText) => {
    dispatch(addFilter(filterText))
  }

  const sendNotification = (message) => {
    dispatch(addNotification(message))
    setTimeout(() => dispatch(remNotification()), 5000)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter filterAnecdotes={filterAnecdotes} />
      <AnecdoteList addVote={addVote} anecdotes={anecdotes} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App