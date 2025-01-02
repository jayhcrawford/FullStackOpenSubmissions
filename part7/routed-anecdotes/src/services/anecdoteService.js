import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes/'

export const getAnecdotes = async () =>
    axios.get(baseURL).then(res => {
        return res.data
    })

export const postAnecdote = async (anecdote) => 
    axios.post(baseURL, anecdote).then(res => {
        return res.data
    })