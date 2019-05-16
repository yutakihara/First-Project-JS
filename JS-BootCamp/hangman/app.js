const puzzleEl = document.getElementById('puzzle')
const guessesEl = document.getElementById('guesses')
const game1 = new Hangman('I am ironman', 2)

puzzleEl.textContent = game1.puzzle
guessesEl.textContent = game1.statusMessage

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    puzzleEl.textContent = game1.puzzle
    guessesEl.textContent = game1.statusMessage
})
//callback (asynchronous)
getPuzzle(9).then( (puzzle) => {
    console.log(puzzle)
}, (err) => {
    console.log(err)
})

const countryCode = 'JP'
getCountryDetail(countryCode).then( (country) => {
    console.log(`The capital of ${country.name} is ${country.capital} in ${country.region} region`)
}, (error) => {
    console.log(`Error: ${error.message}`)
})
// synchronous
// const puzzle = getPuzzleSync()
// console.log(puzzle)
