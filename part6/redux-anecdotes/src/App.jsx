import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { vote, addNew } from './reducers/anecdoteReducer'

import { addFilter } from './reducers/filterReducer'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'




const App = () => {
  const anecdotes = useSelector(state => {
    if (state.filter != '') {
      console.log(state)

      let filtered = state.anecdotes.filter((anecdote) => {
        if (anecdote.content.includes(state.filter)) {
          return anecdote
        } else {
          return ''
        }})
      console.log(filtered)
      return filtered

      //return state.anecdotes.map(anecdote => anecdote.includes(state.filter))
    } else {
      return state.anecdotes
    }
  })
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

  const filterAnecdotes = (filterText) => {
    dispatch(addFilter(filterText))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter filterAnecdotes={filterAnecdotes} />

      <AnecdoteList addVote={addVote} anecdotes={anecdotes} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App