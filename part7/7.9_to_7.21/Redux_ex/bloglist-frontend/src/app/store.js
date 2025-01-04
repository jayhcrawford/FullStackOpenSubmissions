import { configureStore } from '@reduxjs/toolkit'
import notifierReducer from '../features/notification/notifierSlice'
import loginReducer from '../features/login/loginSlice'
import blogReducer from '../features/blog/blogSlice'

export default configureStore({
  reducer: {
    notifier: notifierReducer,
    login: loginReducer,
    blogs: blogReducer
  },
})
