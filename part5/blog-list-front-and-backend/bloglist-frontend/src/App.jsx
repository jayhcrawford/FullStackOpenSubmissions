import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import BlogPoster from './components/BlogPoster'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogDisplayer from './components/BlogDisplayer'

//Login state and API calls handled in LoginForm.jsx


const App = () => {
  const [listOfAllBlogs, setListOfAllBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: null, text: '' });
  const [tokenFetches, setTokenFetches] = useState(0);

  //get the blogs from Mongo and set state
  const fetchBlogs = () => {
    blogService.getAll().then((response) => {
      setListOfAllBlogs(response)
    }).catch((error) => {
      console.log("There is an error in fetchBlogs")
    })
  }

  //posts notifications at the top of the page
  const postNotification = (content) => {
    setNotification(content)
    setTimeout(() => { setNotification({ type: null, text: '' }) }, 3000)
  }

  //takes valid token and returns user information
  const fetchIsUserValid = async (token) => {
    const result = await loginService.fetchIsUserValid(token)
    return result
  }

  //use token to return userID
  const fetchIDfromToken = async (token) => {
    const result = await loginService.getIDFromToken(token)
    return result
  }

  //token gathering, important in following useEffect clauses
  const localToken = window.localStorage.getItem('userLoggedIn')
  const localTokenToJSON = JSON.parse(localToken)


  //if the user is logged in, and their token is stored in local storage, this fetches their ID 
  useEffect(() => {
    fetchBlogs();
    if (localToken) {
      //parse the token and set user state
      fetchIsUserValid(localTokenToJSON.token).then((response) => {
        setUser({ username: response.username, name: response.name, token: localTokenToJSON.token, id: response.id })
        blogService.setToken(localTokenToJSON.token)
      }).catch((error => {
        console.log("There was an error fetching a valid user with the local token")
      }))
    }
  }, [listOfAllBlogs])


  //the response to logging in include username, name, and token. This call decodes the token and puts ID in state as well
  useEffect(() => {
    if (user && user != null && !Object.hasOwn(user, "id")) {
      //then get the userID
      fetchIDfromToken(localTokenToJSON.token).then((response) => {
        let userWithoutID = user;
        userWithoutID.id = response
        setUser(userWithoutID)
        return response
      }).catch((error) => {
          console.log("There was an error fetching the ID using the local token")
      })
    }
  }, [user])


  const handleLogOut = (event) => {
    window.localStorage.removeItem('userLoggedIn')
    setUser('')
    location.reload(true);
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?")
    const deletedBlog = listOfAllBlogs.filter(blog => blog.id === id)
    if (confirmed) {

      //update the list of blogs in state
      const updatedList = listOfAllBlogs.filter(blog => blog.id != id)
      setListOfAllBlogs(updatedList)

      try {
        //make a call to the API
        const deleted = await blogService.deletePost(id)

        //send a notification
        postNotification({ type: 'red', text: `The blog was deleted` })
      } catch (error) {
        console.log("There was an error deleting the blog", deletedBlog)
        console.log(error)
      }
    }
    else {
      null
    }
  }


  return (
    <>

      <Notification notification={notification} />
      {user && <p>{user.name} is logged in</p>}
      {user && <button onClick={handleLogOut}>Log Out</button>}
      {!user && <LoginForm setUser={setUser} postNotification={postNotification} />}
      {user && <h2>Blogs</h2>}
      {user && <BlogPoster postNotification={postNotification} user={user} listOfAllBlogs={listOfAllBlogs} setListOfAllBlogs={setListOfAllBlogs} />}
      {user && <BlogDisplayer user={user} handleDelete={handleDelete} setListOfAllBlogs={setListOfAllBlogs} listOfAllBlogs={listOfAllBlogs} />}


    </>
  )
}

export default App