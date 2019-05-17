
const getPuzzle = async (wordCount) => {
    const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

const getPuzzleOld = (wordCount) => {
    return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then( (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('An error has taken place')
        }
    }).then( data => data.puzzle)
}


const getLocation = async () => {
    const response = await fetch ('http://ipinfo.io/json?token=048ec3ec73fd36')
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error ('An error has taken place in geteLocation() function')
    }
}
const getCountryDetail = async (countryCode) => {
    const response = await fetch ('http://restcountries.eu/rest/v2/all')
    if (response.status === 200) {
        const data = await response.json()
        return data.find( (country) => country.alpha2Code === countryCode) 
    } else {
        throw new Error('An error has taken place')
    }
}

const getLocationOld = () => {
    return fetch ('http://ipinfo.io/json?token=048ec3ec73fd36').then( (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('An error has taken place')
        }
    })
}
    
const getCurrentCountry = async () => {
    const currentCountryCode = await getLocation()
    return getCountryDetail(currentCountryCode.country)
}