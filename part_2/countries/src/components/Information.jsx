import { useEffect, useState } from "react"
import getWeather from "../services/Weather"

const Information = ({country}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        getWeather({location: country.name.common})
        .then(response => setWeather(response))
        }, [country]
    )
    let tempCel = 0;
    let image = ''
    let alt = ''
    let windSpeed = 0
    if(weather){
        tempCel = (Math.round(weather.main.temp - 273.15)*100)/100
        image = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        alt = weather.weather[0].description
        windSpeed = weather.wind.speed
    }
    
    return(
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.entries(country.languages).map(([code, name]) => <li key = {code}>{name}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common}/>
            <h1>Weather in {country.name.common}</h1>
            <p>Temperature {tempCel} Celsius</p>
            <img
                src={image}
                alt={alt}
            />
            <p>Wind {windSpeed} m/s</p>
        </>
    )
}

export default Information