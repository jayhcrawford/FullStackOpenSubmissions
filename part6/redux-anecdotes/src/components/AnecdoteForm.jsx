import React from "react"

const AnecdoteForm = (props) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={props.addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
