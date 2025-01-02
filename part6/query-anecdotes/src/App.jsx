import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, createVote } from './requests'


import NotifierContext from './NotifierContext'
import { useContext } from 'react'


const App = () => {
  const [notifier, notifierDispatch] = useContext(NotifierContext)

  const queryClient = useQueryClient()


  const updateNotification = (type, message, timeInSec) => {
    notifierDispatch({type: type, message: message})
    setTimeout(() => {
      notifierDispatch({type: 'RESET'})
    }, timeInSec*1000)
  }


  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      updateNotification('NOTIFY', `\'${data.content}\' was posted`, 5)
    },
    onError: (data) => {
      updateNotification('NOTIFY', 'The post you tried to make was not 5 characters or longer.', 5)
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const newVoteMutation = useMutation({
    mutationFn: createVote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      updateNotification('NOTIFY', `A vote for \'${data.content}\' was cast!`, 5)
    },
  })

  const addVote = async (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.status != 'success') {
    return <div>There was an error retrieving data from the server</div>
  }

  if (result.isError) {
    console.log(result)
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    addVote(anecdote)
  }

  return (

    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
