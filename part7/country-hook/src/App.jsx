import React, { useState, useEffect } from 'react'
import { getAll } from './services/countryService'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name, allCountries) => {
  const [country, setCountry] = useState(null)
  const result = allCountries.filter(country => (country.name.official.includes(name) || country.name.common.includes(name)) ? country : null)
  useEffect(() => {
    if (result.length === 250) {
      setCountry({ found: false, country: result })
    } else {
      setCountry({ found: true, country: result })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }


  if (country.found && country.country.length > 1 && country.country.length < 30) {
    console.log(country.country)
    return (
      <div>
        <p>More than one result was found. Try a more detailed search.</p>
        <p>Here are the results: </p>
        <ul>
          {country ? country.country.map(country => {
            return <li key={country.cca3}><b>Common Name: </b>{country.name.common}<br /> <b>Official Name:</b> {country.name.official}</li>
          }) : null}
        </ul>
      </div>
    )
  }


  if (country.found && country.country.length >= 30 && country.country.length != 250) {
    console.log(country.country)
    return (
      <div>
        <p>More than thirty results were found. Try a more detailed search.</p>
      </div>
    )
  }

  if (country.found && country.country.length === 1) {
    console.log()
    return (
      <div>
        <p> <b>Common Name:</b> {country.country[0].name.common}</p>
        <p> <b>Official Name:</b> {country.country[0].name.official}</p>
        <p><b>Capital: </b>{country.country[0].capital[0]}</p>
        <p><b>Population: </b>{country.country[0].population}</p>
        <p>Flag:</p><img src={country.country[0].flags.png} height='100' alt={`flag of ${country.country[0].name.official}`}></img>
      </div>
    )
  }



}


/*

        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div>
        <img src={country.data.flag} } /> 



*/

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const [allCountries, setAllCountries] = useState([])
  const country = useCountry(name, allCountries)

  useEffect(() => {
    getAll().then(result => setAllCountries(result)).then(console.log("Refresh"))
  }, [])

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App