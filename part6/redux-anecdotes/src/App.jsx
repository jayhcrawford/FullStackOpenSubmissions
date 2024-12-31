import React from 'react'
import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import anecdoteReducer, { initializeAnecdotes, createAnecdote, castVote } from './reducers/anecdoteReducer'
import filterReducer, { addFilter } from './reducers/filterReducer'
import notificationReducer, { setNotification } from './reducers/notificationReducer'


import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import anecdoteService from './services/anecdotes'
import { current } from '@reduxjs/toolkit'



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

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const addVote = (anecdote) => {
    dispatch(castVote(anecdote))
    sendNotification('A vote was cast!')
  }

  const addAnecdote = async (event) => {
    event.preventDefault();
    let anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    sendNotification(`\'${anecdote}\' anecdote was added!`)
  
  }

  const filterAnecdotes = (filterText) => {
    dispatch(addFilter(filterText))
  }

  const sendNotification = (message) => {
    console.log(message)
    dispatch(setNotification(message, 3))
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