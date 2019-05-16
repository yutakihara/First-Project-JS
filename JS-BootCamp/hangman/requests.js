
const getPuzzle = (wordCount) => new Promise ( (resolve, reject) => {
        //HTTP Request & CallBuck function
        const request = new XMLHttpRequest()
        request.addEventListener('readystatechange', (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                const data = JSON.parse(e.target.responseText)
                resolve(data.puzzle) // callback function without an error
            } else if (e.target.readyState === 4) {
                callback('An error has taken place', undefined) // callback function with an error 
                reject('An error has taken place')
            } 
        })
        request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
        request.send();
})

// Bad Experience for user
// const getPuzzleSync = () => {
//     //HTTP Request & CallBuck function
//     const request = new XMLHttpRequest()
//     // 3rd arg for open() if async -> true or sync -> false
//     request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=3`, false)
//     request.send();

//     if (request.readyState === 4 && request.status === 200) {
//         const data = JSON.parse(request.responseText)
//         return data
//     } else if (request.readyState === 4) {
//         throw new Error('An error has taken place')
//     } 
// }


const getCountryDetail = (countryCode) => new Promise ( (resolve, reject) => {
    const conuntryRequest = new XMLHttpRequest();

    conuntryRequest.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4 && e.target.status == 200) {
            const countryData = JSON.parse(e.target.responseText)
            const target = countryData.find( (el) => el.alpha2Code === countryCode)
            resolve(target)
        } else if (e.target.readyState === 4) {
            reject(new Error('An error has taken place'))
        }
    })
    conuntryRequest.open('GET', 'http://restcountries.eu/rest/v2/all')
    conuntryRequest.send()
})