import React from 'react'
import ReactDOM from 'react-dom/client'

import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'

import reducer from './reducers/anecdoteReducer'
import { vote, addNew } from './reducers/anecdoteReducer'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const store = createStore(reducer)


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addVote = (id) => {
    dispatch(vote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNew(anecdote))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList addVote={addVote} anecdotes={anecdotes} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App