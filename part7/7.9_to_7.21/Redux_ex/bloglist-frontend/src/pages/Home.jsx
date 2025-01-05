import { useState, useEffect } from 'react'

import BlogForm from '../components/BlogForm'
import BlogDisplayer from '../components/BlogDisplayer'

import { useSelector, useDispatch } from 'react-redux'

import { notify, reset } from '../features/notification/notifierSlice'
import { logIn } from '../features/login/loginSlice'
import { setAll, addBlog, removeAll } from '../features/blog/blogSlice'

import { populateAll, create } from '../services/blogs'

//provide login reducer

const Home = () => {
  const user = useSelector((state) => state.login.user)
  const allBlogs = useSelector((state) => state.blogs.allBlogs)
  const dispatch = useDispatch()

  const [blogFormIsVisible, setBlogFormIsVisible] = useState(false)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  //token in local storage? Dispatch user info to context
  const localToken = window.localStorage.getItem('userLoggedIn')
  const localTokenToJSON = JSON.parse(localToken)
  useEffect(() => {
    if (localTokenToJSON) {
      dispatch(logIn(localTokenToJSON))
    }
  }, [])

  //dispatch notifications
  const postNotification = (type, message, style, timeInSec) => {
    dispatch(type({ message: message, style: style }))
    setTimeout(() => {
      dispatch(reset())
    }, timeInSec * 1000)
  }

  const ensureHttpPrefix = (url) => {
    console.log(url)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'http://' + url
    }
    return url
  }

  //post blogs
  const handleNewBlogPost = (event) => {
    event.preventDefault()
    const newPost = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: ensureHttpPrefix(event.target.url.value),
      comments: [],
      user: user.id,
    }
    create(newPost)
      .then((response) => {
        dispatch(addBlog(response))
        setBlogFormIsVisible(false)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        postNotification(notify, `${newPost.title} was posted!`, 'green', 5)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <BlogForm
        isVisible={blogFormIsVisible}
        setVisible={setBlogFormIsVisible}
        setNewBlogTitle={setNewBlogTitle}
        setNewBlogAuthor={setNewBlogAuthor}
        setNewBlogUrl={setNewBlogUrl}
        newBlogAuthor={newBlogAuthor}
        newBlogTitle={newBlogTitle}
        newBlogUrl={newBlogUrl}
        handleNewBlogPost={handleNewBlogPost}
      />

      <h2>Blogs</h2>
      {allBlogs && <BlogDisplayer allBlogs={allBlogs} />}
    </>
  )
}

export default Home
