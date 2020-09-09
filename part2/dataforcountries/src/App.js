import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({name, capital, population, languages, flag}) => {
  const [show, setShow] = useState(false)
  
  return (
    <div>
      <p>{name}</p>
      <button onClick={() => setShow(!show)}>show</button>
      {show ? 
        <div>
          <h1>{name}</h1>
          <p>capital {capital}</p>
          <p>population {population}</p>
          <p>languages</p>
          <ul>
            {languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={flag} style={{height: 50}}/>
        </div> : 
        null}
    </div>
  )
}

const Weather = ({weather}) => {
  return (
    <>
      {weather.current && (
        <div>
          <h1>Weather in {weather.location.name}</h1>
          <div>
            <span>Temperature: </span>
            <span>{weather.current.temperature} &deg; Celsius</span>
          </div>
          <div>
            <img
              src={weather.current.weather_icons[0]}
              alt={weather.current.weather_descriptions[0]}
            />
          </div>
          <div>
            <span>Wind: </span>
            <span>{weather.current.wind_speed} mph </span>
            <span>direction {weather.current.wind_dir}</span>
          </div>
        </div>
      )}
    </>
  )
}

const Countries = ({search, result, weather}) => {
  if (search === '') {
    return (
      <div></div>
    )
  } else if (result.length === 1) {
    return (
      <div>
        <Country name={result[0].name} capital={result[0].capital} population={result[0].population} languages={result[0].languages} flag={result[0].flag}/>
        <Weather weather={weather} />
      </div>
    )
  } else if (result.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <div>
        {result.map(country => <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag}/>)}
      </div>
    )
  }
}

// https://weatherstack.com/quickstart
// example to use API: ($env:REACT_APP_API_KEY='t0p53cr3t4p1k3yv4lu3') -and (npm start)
const App = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if (search !== '') {
          const searchResult = response.data.filter(result => (result.name.toLowerCase().includes(search.toLowerCase())))
          setResult(searchResult)
        }
      })
  }, [search])

  useEffect(() => {
    const baseUrl = 'http://api.weatherstack.com/current'
    const api_key = process.env.REACT_APP_API_KEY 
    
    if (result.length === 1) {
      const capital = result[0].capital
      axios
        .get(`${baseUrl}?access_key=${api_key}&query=${capital}`)
        .then(response => {
          console.log('success')
          setWeather(response.data);
        })
    }
  }, [result])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
      <Countries search={search} result={result} weather={weather}/>
    </div>
  )
}

export default App;
