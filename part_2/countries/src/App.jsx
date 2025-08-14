import { useEffect, useState } from 'react'
import getCountries from './services/Country'
import Information from './components/Information'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    console.log("geting all countries...")
    getCountries().then(response => setCountries(response))
  }, [])

  
  const handleChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry('')
  }

  let content = null

  const handleShow = (country) => {
    setSelectedCountry(country)
    console.log(country);
  }

  const filteredCountries = search ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())): countries

  if(filteredCountries.length > 10) {
    content = <p>Too many matches, specify another matches</p>
  } else if (filteredCountries.length === 1) {
    content = <Information country = {filteredCountries[0]} />
  } else {
    content = selectedCountry 
      ? <Information country = {selectedCountry} /> 
      : filteredCountries.map(country => 
        <p key = {country.name.common}>
          {country.name.common} <button onClick = {() => handleShow(country)}> Show </button>
          </p>)
  }

  return (
    <>
      find countries <input value = {search} onChange = {handleChange}/>
      <div>
        {content}
      </div>
    </>
  )
}

export default App
