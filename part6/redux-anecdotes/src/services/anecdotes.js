import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const castVote = async (anecdote) => {
    let newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const putNewVote = await axios.patch(`${baseUrl}/${anecdote.id}`, newAnecdote)
}


export default { getAll, createNew, castVote } 
