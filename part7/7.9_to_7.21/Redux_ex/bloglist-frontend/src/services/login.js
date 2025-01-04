import axios from 'axios'
const baseUrl = '/api/login'
import blogService from '../services/blogs'

//user attempts to login
const login = async (credentials) => {
  try {
    //put the login info and recieve the token without ID
    const response = await axios.post(baseUrl, credentials)
    blogService.setToken(response.data.token)

    //get the ID and pair it with the token without ID
    const decodedToken = await axios.post('/api/blogs/validate', {
      token: response.data.token,
    })
    let returnedInfo = response.data
    returnedInfo.id = decodedToken.data.id

    return returnedInfo
  } catch (error) {
    return error.response.status
  }
}

//get user ID from API using username
const fetchUserID = async (username) => {
  const fetchedUser = await axios.get('/api/users')
  let idToReturn

  fetchedUsers.data.forEach((user) => {
    if (user.username === username) {
      idToReturn = user.id
    }
  })
  return idToReturn
}

//Check to see if the user is a valid user
const fetchIsUserValid = async (token) => {
  try {
    const decodedToken = await axios.post('/api/blogs/validate', {
      token: token,
    })
    const validUser = await axios.get(`/api/users/${decodedToken.data.id}`)
    return validUser.data
  } catch (error) {
    console.log('This is not a valid token, or the user was deleted')
  }
}

//get userID from token
const getIDFromToken = async (token) => {
  try {
    const decodedToken = await axios.post('/api/blogs/validate', {
      token: token,
    })
    return decodedToken.data.id
  } catch (error) {
    console.log('This is not a valid token, or the user was deleted')
  }
}

export default { login, fetchUserID, fetchIsUserValid, getIDFromToken }
