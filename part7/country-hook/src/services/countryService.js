import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

export const getAll = async () => {
    try {
        const result = await axios.get(`${baseURL}/api/all`)
        return result.data
    } catch (error) {
        return error
    }
}