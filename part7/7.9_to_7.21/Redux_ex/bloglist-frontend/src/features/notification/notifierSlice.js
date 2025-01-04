import { createSlice } from '@reduxjs/toolkit'

export const notifierSlice = createSlice({
  name: 'notifier',
  initialState: {
    notification: '',
  },
  reducers: {
    notify: (state, action) => {
      console.log(action.payload)
      state.notification = action.payload
    },
    reset: (state) => {
      state.notification = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { notify, reset } = notifierSlice.actions

export default notifierSlice.reducer
