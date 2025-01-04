import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload
    },
    logOut: (state) => {
      state.user = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut } = loginSlice.actions

export default loginSlice.reducer
