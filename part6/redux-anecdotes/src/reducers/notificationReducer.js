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
