import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({name, capital, population, languages, flag}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <p>languages</p>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={flag} style={{height: 50}}/>
    </div>
  )
}

const Countries = ({search, result}) => {
  const [show, setShow] = useState(false)

  if (search === '') {
    return (
      <div></div>
    )
  } else if (result.length === 1) {
    console.log(result[0])
    return (
      <Country name={result[0].name} capital={result[0].capital} population={result[0].population} languages={result[0].languages} flag={result[0].flag}/>
    )
  } else if (result.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <div>
        {result.map(country => <div><p>{country.name}</p><button onClick={() => setShow(!show)}>show</button>{show ? <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag}/> : null}</div>)}
      </div>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

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

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
      <Countries search={search} result={result}/>
    </div>
  )
}

export default App;
