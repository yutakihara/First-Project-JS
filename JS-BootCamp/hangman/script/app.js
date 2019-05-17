const puzzleEl = document.getElementById('puzzle')
const guessesEl = document.getElementById('guesses')
let game1 

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})
const render = () => {
    puzzleEl.textContent = ''
    guessesEl.textContent = game1.statusMessage
    game1.puzzle.split('').forEach( (letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle(3)
    game1 = new Hangman(puzzle, 3)
    render()
}

document.getElementById('reset').addEventListener('click', startGame)

startGame()
// Promise Chaining

// getCurrentCountry().then( (country) => {
//     console.log(country.name)
// }).catch( (err) => {
//     console.log(err)
// })


// getPuzzle(4).then( (puzzle) => {
//     console.log(puzzle)
// }).catch( (err) => {
//     console.log(`${err}`)
// })

