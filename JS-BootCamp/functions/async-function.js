const getDataPromise = (data) => new Promise( (resolve, reject) => {
    setTimeout( () => {
        typeof data === 'number' ? resolve(data * 2) : reject('Number must be provided')
        // reject('An error has taken place')
    }, 2000)
})

const processData = async () => {
    let data = await getDataPromise(21)
    data = await getDataPromise(data)
    return data
}

processData().then( (data) => {
    console.log(`Data: ${data}`)
}).catch( (err) => {
    console.log(`Error: ${err}`)
})