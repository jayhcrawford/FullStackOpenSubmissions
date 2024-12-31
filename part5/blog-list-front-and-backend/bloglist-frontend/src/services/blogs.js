import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const create = async newObject => {
  const tokenSetter = JSON.parse(window.localStorage.getItem('userLoggedIn'))
  token = `Bearer ${tokenSetter.token}`
  const config = {
    headers: { Authorization: token },
  }
  const newBlogPost = await axios.post(baseUrl, newObject, config)
  return newBlogPost.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const putLike = async newObject => {
  try {
    const likesURL = baseUrl + '/like'
    const request = await axios.patch(likesURL, newObject)
  } catch (error) {
    console.log('Front end error for like posting')
  }
}

const deletePost = async (blogID) => {
  const deleteURL = baseUrl + '/' + blogID
  const deleted = await axios.delete(deleteURL)
  return blogID
}

export default { getAll, setToken, create, putLike, deletePost }