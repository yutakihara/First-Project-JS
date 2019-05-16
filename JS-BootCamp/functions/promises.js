const getDataPromise = (data) => new Promise( (resolve, reject) => {
    setTimeout( () => {
        resolve(`Data succeesfully transferd, which is ${data}`)
        // reject('An error has taken place')
    }, 2000)
})

const myPromise = getDataPromise(`This is data (arg) from getDataPromise `)

myPromise.then( (data) => {
    console.log(data)
}, (err) => {
    console.log(err)
})