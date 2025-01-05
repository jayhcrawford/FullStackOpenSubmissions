import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

export const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const getUser = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}


export default { getAllUsers, getUser }
