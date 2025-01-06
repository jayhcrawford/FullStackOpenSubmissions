import { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useMatch,
} from 'react-router-dom'

import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';



import loginService from './services/login'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import User from './components/User'

import Home from './pages/Home'
import Users from './pages/Users'

import { useSelector, useDispatch } from 'react-redux'

import { notify, reset } from './features/notification/notifierSlice'
import { logIn, logOut } from './features/login/loginSlice'
import {
  setAll,
  addLike,
  removeBlog,
  removeAll,
  addComment,
} from './features/blog/blogSlice'

import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LogoutIcon from '@mui/icons-material/Logout';


import {
  populateAll,
  deletePost,
  putLike,
  getOne,
  putComment,
} from './services/blogs'

import { getUser } from './services/users'

//provide login reducer

const App = () => {
  const notification = useSelector((state) => state.notifier.notification)
  const user = useSelector((state) => state.login.user)
  const allBlogs = useSelector((state) => state.blogs.allBlogs)
  const dispatch = useDispatch()

  const [singleBlogID, setSingleBlogID] = useState(null)
  const [singleBlog, setSingleBlog] = useState(null)
  const [singleUserID, setSingleUserID] = useState(null)
  const [singleUser, setSingleUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [comment, setComment] = useState('')

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
    window.location.href = '../'
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

  const likeHandler = async (blog) => {
    try {
      let blogWithNewLikes = { ...blog }
      blogWithNewLikes.likes += 1
      dispatch(addLike(blogWithNewLikes))
      await putLike(blogWithNewLikes)
      setSingleBlog(blogWithNewLikes)
      postNotification(
        notify,
        `\'${blogWithNewLikes.title}\' was liked!`,
        'green',
        5
      )
    } catch (error) {
      console.log(error)
    }
  }

  const deleteHandler = (blogID) => {
    deletePost(blogID)
      .then(() => {
        dispatch(removeBlog(blogID))
        postNotification(notify, 'A blog was deleted', 'green', 5)
        setTimeout(() => {
          window.location.href = '../'
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const commentHandler = (comment, blog) => {
    let updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    }
    dispatch(addComment({ comment: comment, blog: updatedBlog }))
    putComment(blog, comment).then((response) => {
      postNotification(notify, `\'${comment}\' was commented!`, 'green', 5)
    })
    setComment('')
    setTimeout(() => {
      location.reload()
    }, 2000)
  }

  //if the user is newly logged in or out, store or reset the store with fetched blogposts
  useEffect(() => {
    if (user) {
      populateAll().then((response) => {
        dispatch(setAll(response))
        console.log('Refresh at useEffect 888')
      })
    } else {
      dispatch(removeAll())
    }
  }, [user])

  //check for matches
  const blogMatch = useMatch('/blogs/:id')
  if (blogMatch && blogMatch.params.id === singleBlogID) {
    //do nothing, because the singleBlog ID has already been set
  } else if (blogMatch) {
    setSingleBlogID(blogMatch.params.id)
    //if not looking for a match, reset relevant state
  } else if (!blogMatch && singleBlogID != null) {
    setSingleBlogID(null)
    setSingleBlog(null)
  }
  //If a match occurs, get the single blog information and put it in state
  useEffect(() => {
    if (singleBlogID) {
      getOne(singleBlogID).then((response) => {
        setSingleBlog(response)
        console.log('Refresh in useEffect 444')
      })
    }
  }, [singleBlogID])

  //check for matches
  const userMatch = useMatch('/users/:id')
  if (userMatch && userMatch.params.id === singleUserID) {
    //do nothing, singleUserID is already set
  } else if (userMatch) {
    setSingleUserID(userMatch.params.id)
    //if not looking for a match, reset relevant state
  } else if (!userMatch && singleUserID != null) {
    setSingleUserID(null)
    setSingleUser(null)
  }
  //If a match occurs, fetch it's information and store it in state
  useEffect(() => {
    if (singleUserID) {
      getUser(singleUserID).then((response) => {
        setSingleUser(response)
        console.log('Refresh in useEffect 333')
      })
    }
  }, [singleUserID])

  return (
    <>
      {user && (
        <header style={{ backgroundColor: 'lightGrey', padding: '1em' }}>
          <Link style={{ margin: '.5em' }} to="/">
            <Button startIcon={<TextSnippetIcon/>} variant="contained">blogs</Button>
          </Link>
          <Link style={{ margin: '.5em' }} to="/users">
            <Button startIcon={<GroupsIcon/>} variant="contained">users</Button>
          </Link>
          {user && <>{user.name} is logged in </>}
          {user && (
            <>
              <Button
                variant="outlined"
                style={{ float: 'right' }}
                onClick={handleLogOut}
                endIcon={<LogoutIcon/>}
              >
                Log Out
              </Button>
            </>
          )}
        </header>
      )}

      <Notification notification={notification} />

      <Routes>
        {singleBlog && (
          <Route
            path="/blogs/:id"
            element={
              <Blog
                passedBlog={singleBlog}
                user={user}
                likeHandler={likeHandler}
                deleteHandler={deleteHandler}
                addComment={commentHandler}
                comment={comment}
                setComment={setComment}
              />
            }
          />
        )}

        {!singleBlog && (
          <Route path="/blogs/:id" element={<div>blog not found</div>} />
        )}

        {singleUser && (
          <Route
            path="/users/:id"
            element={<User allBlogs={allBlogs} singleUser={singleUser} />}
          />
        )}

        {!singleUser && (
          <Route path="/users/:id" element={<div>user not found</div>} />
        )}

        {!user && (
          <Route
            path="/"
            element={
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
            }
          />
        )}
        {user && <Route path="/" element={<Home />} />}

        {user && <Route path="/users" element={<Users />} />}
        {!user && <Route path="/users" element={null} />}
      </Routes>
    </>
  )
}

export default App
