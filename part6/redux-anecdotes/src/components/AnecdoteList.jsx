import React from 'react'

const AnecdoteList = (props) => {

  let anecdotesArray = [...props.anecdotes]

  return (
    <>
      {anecdotesArray
        .sort((a, b) =>
          b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => props.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList
