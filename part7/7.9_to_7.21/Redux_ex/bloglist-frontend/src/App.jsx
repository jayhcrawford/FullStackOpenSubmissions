import {
  useState,
  useEffect,
  useReducer,
  useContext,
  userDispatch,
} from 'react'

import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogDisplayer from './components/BlogDisplayer'
import PendingMessage from './components/PendingMessage'

import { useSelector, useDispatch } from 'react-redux'

import { notify, reset } from './features/notification/notifierSlice'
import { logIn, logOut } from './features/login/loginSlice'
import {
  setAll,
  addBlog,
  addLike,
  removeBlog,
  removeAll,
} from './features/blog/blogSlice'

import { populateAll, create, deletePost, putLike } from './services/blogs'

//provide login reducer

const App = () => {
  const notification = useSelector((state) => state.notifier.notification)
  const user = useSelector((state) => state.login.user)
  const allBlogs = useSelector((state) => state.blogs.allBlogs)
  const dispatch = useDispatch()

  const [blogFormIsVisible, setBlogFormIsVisible] = useState(false)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    let loggedIn
    try {
      loggedIn = await loginService.login({
        username: username,
        password: password,
      })
      //401: invalid user
      if (loggedIn == 401) {
        postNotification(notify, 'Username or Password is incorrect', 'red', 5)
      } else {
        dispatch(logIn(loggedIn))
        //store the token in local storage
        window.localStorage.setItem('userLoggedIn', JSON.stringify(loggedIn))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('userLoggedIn')
    dispatch(logOut())
    dispatch(removeAll())
    setUsername('')
    setPassword('')
  }

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

  //post blogs
  const handleNewBlogPost = (event) => {
    event.preventDefault()
    const newPost = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
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

  const likeHandler = async (blog) => {
    try {
      let blogWithNewLikes = { ...blog }
      blogWithNewLikes.likes += 1
      dispatch(addLike(blogWithNewLikes))
      await putLike(blogWithNewLikes)
      postNotification(notify, `\'${blogWithNewLikes.title}\' was liked!`, 'green', 5)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteHandler = (blogID) => {
    deletePost(blogID).then(() => {
      dispatch(removeBlog(blogID))
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (user) {
      populateAll().then((response) => {
        dispatch(setAll(response))
      })
    } else {
      dispatch(removeAll())
    }
  }, [user])

  return (
    <>
      <Notification notification={notification} />
      {user && <p>{user.name} is logged in</p>}
      {user && <button onClick={handleLogOut}>Log Out</button>}
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user && <h2>Blogs</h2>}
      {user && (
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
      )}

      {user && allBlogs && (
        <BlogDisplayer
          likeHandler={likeHandler}
          deleteHandler={deleteHandler}
          user={user}
          allBlogs={allBlogs}
        />
      )}
    </>
  )
}

export default App

/*
 */
