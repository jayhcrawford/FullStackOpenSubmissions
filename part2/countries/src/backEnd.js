import axios from 'axios'

const getAll = () => {
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
}


const getCountry = (country) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
}

const weatherData = (lat, lon, APIkey) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`)
}

export default {
  getAll: getAll,
  getCountry: getCountry,
  weatherData: weatherData
}
