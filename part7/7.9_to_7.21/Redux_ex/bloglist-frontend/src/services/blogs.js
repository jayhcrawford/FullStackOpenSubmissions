import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const create = async (newObject) => {
  const tokenSetter = JSON.parse(window.localStorage.getItem('userLoggedIn'))
  token = `Bearer ${tokenSetter.token}`
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject)
  const newBlogPost = await axios.post(baseUrl, newObject, config)
  return newBlogPost.data
}

export const populateAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const putLike = async (newObject) => {
  try {
    const likesURL = baseUrl + '/like'
    const request = await axios.patch(likesURL, newObject)
    return request
  } catch (error) {
    console.log('Front end error for like posting')
  }
}

export const deletePost = async (blogID) => {
  const deleteURL = baseUrl + '/' + blogID
  const deleted = await axios.delete(deleteURL)
  return blogID
}

export default {populateAll, setToken, create, deletePost}