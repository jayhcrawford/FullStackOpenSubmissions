import { useState, useEffect, useReducer, useContext } from 'react'

import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogDisplayer from './components/BlogDisplayer'
import PendingMessage from './components/PendingMessage'

import NotifierContext from './NotifierContext'
import LoggedInContext from './LoggedInContext'

import { create, deletePost, putLike } from './services/blogs'

import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { getAll } from './services/blogs'

const App = () => {
  const [listOfAllBlogs, setListOfAllBlogs] = useState([])
  const [user, userDispatch] = useContext(LoggedInContext)
  const [notifier, notifierDispatch] = useContext(NotifierContext)
  const [blogFormIsVisible, setBlogFormIsVisible] = useState(false)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const queryClient = useQueryClient()
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
      loggedIn.type = 'LOGIN'
      userDispatch(loggedIn)
    } catch (error) {
      console.log(error)
    }
    //401: invalid user
    if (loggedIn == 401) {
      updateNotification('NOTIFY', 'Username or password is invalid', 5, 'red')
    } else {
      //store the token in local storage
      window.localStorage.setItem('userLoggedIn', JSON.stringify(loggedIn))
    }
  }

  const handleLogOut = (event) => {
    window.localStorage.removeItem('userLoggedIn')
    userDispatch({ type: 'LOGOUT' })
    setUsername('')
    setPassword('')
  }

  //token in local storage? Dispatch user info to context
  const localToken = window.localStorage.getItem('userLoggedIn')
  const localTokenToJSON = JSON.parse(localToken)
  useEffect(() => {
    if (localTokenToJSON) {
      const postToken = localTokenToJSON
      postToken.type = 'LOGIN'
      userDispatch(postToken)
    }
  }, [])

  //query all blogs
  const allblogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
  })
  const allBlogsFetched = allblogs.data

  //dispatch notifications
  const updateNotification = (type, message, timeInSec, color) => {
    console.log({ type: type, message: message, color: color }, 'is the dispatch format')
    notifierDispatch({ type: type, message: message, color: color})
    setTimeout(() => {
      notifierDispatch({ type: 'RESET' })
    }, timeInSec * 1000)
  }


  //(start)::block - Mutations and their relevant functions 
  const newLikeMutation = useMutation({
    mutationFn: putLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
      updateNotification(
        'NOTIFY',
        `A like was submitted for \'${data.data.title}\'!`,
        5,
        'green'
      )
    },
    onError: (data) => {
      updateNotification(
        'NOTIFY',
        'There was a failure to cast a like for the selected post',
        5,
        'red'
      )
    },
  })

  const postLike = async (blog) => {
    const blogWithNewLikes = blog
    blogWithNewLikes.likes = blog.likes + 1
    newLikeMutation.mutate(blogWithNewLikes)
  }

  const newBlogPostMutation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.setQueryData(['blogs', data.id], data)
      updateNotification('NOTIFY', `\'${data.title}\' was posted`, 5, 'green')
    },
    onError: (data) => {
      updateNotification(
        'NOTIFY',
        'The post you tried to make was not 5 characters or longer.',
        5,
        'red'
      )
    },
  })

  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      user: user.id,
    }
    newBlogPostMutation.mutate({ ...content, votes: 0 })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
    setBlogFormIsVisible(false)
  }

  const deleteBlogPostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.setQueryData(['blogs', data.id], data)
      updateNotification('NOTIFY', `A blog was deleted`, 5, 'green')
    },
    onError: (data) => {
      updateNotification(
        'NOTIFY',
        'There was a failure to delete the selected blog post',
        5,
        'red'
      )
    },
  })
  const deleteBlog = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    )
    if (confirmed) {
      const deletedBlog = allBlogsFetched.filter((blog) => blog.id === id)
      deleteBlogPostMutation.mutate(deletedBlog[0].id)
    } else {
      null
    }
  }
  //(close)::block - Mutations and their functions

  return (
    <>
      <Notification />
      {user && <p>{user.name} is logged in</p>}
      {user && <button onClick={handleLogOut}>Log Out</button>}
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          setUser={userDispatch}
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
          addBlog={addBlog}
        />
      )}
      {user && <PendingMessage allblogs={allblogs} />}
      {user && listOfAllBlogs && (
        <BlogDisplayer
          user={user}
          listOfAllBlogs={allBlogsFetched}
          handleDelete={deleteBlog}
          likeHandler={postLike}
        />
      )}
    </>
  )
}

export default App
