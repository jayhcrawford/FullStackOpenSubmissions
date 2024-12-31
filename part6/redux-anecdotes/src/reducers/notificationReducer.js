import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        remNotification(state, action) {
            return ''
        }
    }
})

export default notificationSlice.reducer
export const { addNotification, remNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        const currentTimeout = setTimeout(() => dispatch(remNotification()), time*1000)
        clearTimeout(currentTimeout - 1)
        dispatch(addNotification(message))
    }
}


export const castVote = (anecdote) => {
  return async dispatch => {
    const castVote = await anecdoteService.castVote(anecdote)
    dispatch(vote(anecdote))
  }
}