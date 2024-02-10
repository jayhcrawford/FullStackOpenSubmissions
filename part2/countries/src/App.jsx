import { useState, useEffect } from 'react'
import backEnd from './backEnd';

const api_key = import.meta.env.VITE_SOME_KEY

function SearchBar(props) {
  return (
    <>
    <span>Find Countries <input onChange={props.onChange}></input></span>
    </>
  )
}

function DisplayResults(props) {
  if (props.country !== '') {
    let languages = [...Object.values(props.country.languages)]
    return (
      <div>
        <h1>{props.country.name.common}</h1>
        <p>The capital is: {props.country.capital}</p>
        <p>Area in {props.country.name.common}: {props.country.area}</p>
        <h4>Languages</h4>
        <ul>
        {languages.map(language => {
          return (
          <li key={language}>{language}</li>
          )
        })}
        </ul>
        <img src={props.country.flags.png}></img>
        <div>
          <h2>Weather in {props.country.capital}</h2>
          <p>Temperature: {props.weather ? props.weather.main.temp : null} Celcius</p>
          {props.weather ? <img src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}></img> : null}
          <p>Wind: {props.weather ? props.weather.wind.speed : null}</p>
          
          
          
        </div>

      </div>
    )
  } else {
      if (typeof props.display !== typeof 'array' && props.display.length > 10) {
        return (
          <p>Too many matches, specify another filter</p>
        )
      }
      if (props.display.length < 10 && props.display.length > 1) {
        let array = [];
        for (let i = 0; i < props.display.length; i++) {
          array.push(props.display[i]);
        }
        return (
          <ul>
            {array.map(country => {
              return (
                <li key={country}>{country} <button onClick={() => {props.getCountry(country)}}>Show</button></li>
              )
            })}
          </ul>
        )
      }
      if (props.newSearch === '') {
        return (
          <p></p>
        )
      }
  }
}

function App() {
  const [country, setCountry] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [encyclopedia, setEncyclopedia] = useState('');
  const [display, setDisplay] = useState('');
  const [previousThreeSearches, setPreviousThree] = useState([]);
  const [weather, setWeather] = useState(''); 
  console.log(weather)

  //get all countries from the API on page load
  useEffect(() => {
    backEnd
      .getAll()
      .then(response => {
        setEncyclopedia(response.data)
      })
  }, [])

  useEffect(() => {
    if (country) {
      if (weather) {
          if (country.capitalInfo.latlng[0] !== weather.coord.lat) {
        backEnd
          .weatherData(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1], api_key)
          .then(response => {
            setWeather(response.data)
          })
        } 
    } else {
      backEnd
      .weatherData(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1], api_key)
      .then(response => {
        setWeather(response.data)
      })
  } 
  }
  }, [country, weather])

  
  //called in onChange, searches API for nations which character match the search query; pushes matches into 'results' array;
  const searchEncyclopedia = (query) => {
    let results = [];
    if (encyclopedia.length === 0) {
      return 'Still getting API...';
    }
    encyclopedia.map(country => {
      if (country.name.common.toLowerCase().match(query.toLowerCase())) {
        results = results.concat(country.name.common);
      }
    })
    return results;
  }


  const onChange = (e) => {
    if (previousThreeSearches.concat(e.target.value).length <= 3) {
      setPreviousThree(previousThreeSearches.concat(e.target.value));
    } else {
      let newArray = previousThreeSearches.slice(1).concat(e.target.value);
      setPreviousThree(newArray)
    }

    if (e.target.value !== previousThreeSearches[2]) {
      setDisplay(searchEncyclopedia(e.target.value));
      setNewSearch(e.target.value);
      setCountry('')
    }

    if (e.target.value.length === 0) {
      setDisplay('');
      setCountry('');
      setNewSearch('');
    }

    if (e.target.value !== newSearch) {
      setNewSearch(e.target.value);
    }

    if (e.target.value.length > 0) {
      setDisplay(searchEncyclopedia(e.target.value));
      setNewSearch(e.target.value);
    } else {
      setDisplay('');
      setNewSearch('');
      setCountry('')
    }

    if (display.length === 1) {
      backEnd
      .getCountry(display[0])
      .then(response => {
        setCountry(response.data)
        setDisplay('')
      })
    }
  }

  function getCountry(nation) {
    backEnd
    .getCountry(nation)
    .then(response => {
      setCountry(response.data)
      setDisplay('')
    })
  }


  
  



  return (
    <>
    <SearchBar onChange={onChange}/>
    <DisplayResults display={display} newSearch={newSearch} country={country} getCountry={getCountry} weather={weather}/>

    </>
  )
}

export default App
