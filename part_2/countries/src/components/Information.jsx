const Information = ({country}) => {
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
        </>
    )
}

export default Information