//Prototype Inheritence

const Hangman = function (word, numMistake) {
    this.word = word.toLowerCase().split('')
    this.numMistak = numMistake
    this.guessedLetters = ['c']
}

Hangman.prototype.puzzleBack = function() {
    let puzzle = ''

    this.word.forEach( (letter) => {
        if (this.guessedLetters.includes(letter) || this.guessedLetters === ' ') {
            puzzle += letter
        } else {
            puzzle += '*'
        }
    })
    return puzzle
}

const question1 = new Hangman('Cat', 2)
const question2 = new Hangman('California', 4)
question1.printHello()
console.log(question1.puzzleBack())
console.log(question2.puzzleBack())