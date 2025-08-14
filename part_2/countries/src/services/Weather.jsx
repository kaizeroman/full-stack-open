import axios from 'axios'

const getWeather = ({country}) => {
    const api = import.meta.env.VITE_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default getWeather