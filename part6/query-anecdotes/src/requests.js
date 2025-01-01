import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const createVote = anecdote => 
  axios.patch(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)