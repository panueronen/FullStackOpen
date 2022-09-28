import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () =>{
  const [filter, filterChange] = useState('')
  const [countries, countriesUpdate] = useState([])
  const [singlechoice, setSingleChoice] = useState([])
  const apiKey = process.env.REACT_APP_NOT_SECRET_CODE

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        countriesUpdate(...countries, response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    filterChange(event.target.value)
    setSingleChoice(!singlechoice)
  }


  return (
    <div className="App">
      <header>Countries</header>
      <SearchForm  filter={filter} handleFilterChange={handleFilterChange}/>
      <SearchResults countries={countries} filter={filter} filterChange={filterChange} apiKey={apiKey}/>
    </div>
  );
}

const SearchForm = (props) => {
  const {handleFilterCountries, filter, handleFilterChange} = props

  return(
    <div>
    <form onSubmit={handleFilterCountries}>
        <div>
          name: <input value={filter} onChange={handleFilterChange}/>
          </div>
      </form>
      </div>
  )
}

const SearchResults = (props) => {
  const {countries, filter, filterChange, apiKey} = props
  const filtered = countries.filter( country => country.name.common.includes(filter))


  if(filtered.length ===1){
    return(
      <div>
        <SinglecountryData country={filtered} apiKey={apiKey}/>
      </div>
    )
  }else{
  return(
    <ul>
        {filtered.map(country =>
        <li key={country.name.common}>{country.name.common} <button onClick={() => filterChange(country.name.common)}>Open</button></li>)}
      </ul>
  )
}
}

const SinglecountryData = (props) => {
let {country, apiKey} = props
country = country[0]
const languages = Object.values(country.languages).map((language) =>
<li key={language}>{language}</li>
)

return(
  <div>
    <h1>{country.name.common}</h1>
    Capital: {country.capital} <hr />
    Area {country.area}m^2 <hr />
    Languages <ul>{languages}</ul>   
    <img src= {country.flags.png} alt="flag"/>
    <Weather country={country} apiKey={apiKey}/>
  </div>
)
}

const Weather = (props) => {
  let {country,apiKey} = props
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${apiKey}`

  const [weather, setWeather] = useState('')
  
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  
  if(weather ==''){
    return(
      <div>
        No weatherdata
      </div>
    )
  }else{
    return(
      <div>
        WeatherData <hr />
          {weather.main.temp} Celsius <hr />
          {weather.wind.speed} m/s
      </div>
    )
  }
  

}

export default App;
