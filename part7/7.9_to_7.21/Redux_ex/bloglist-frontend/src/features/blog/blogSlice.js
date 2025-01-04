import { createSlice } from '@reduxjs/toolkit'

export const blogSlice = createSlice({
  name: 'user',
  initialState: {
    allBlogs: [],
  },
  reducers: {
    setAll: (state, action) => {
      state.allBlogs = action.payload
    },
    addLike: (state, action) => {
        state.allBlogs = state.allBlogs.map(blog => blog.id == action.payload.id ? action.payload : blog)
    },
    addBlog: (state, action) => {
        state.allBlogs = state.allBlogs.concat(action.payload)
    },
    removeBlog: (state, action) => {
        if (state.allBlogs.length > 1) {
            state.allBlogs = state.allBlogs.map(blog => blog.id == action.payload ? null : blog)
        } else {
            state.allBlogs = []
        }
    },
    removeAll: (state) => {
        state.allBlogs = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAll, addLike, addBlog, removeBlog, removeAll } = blogSlice.actions

export default blogSlice.reducer
