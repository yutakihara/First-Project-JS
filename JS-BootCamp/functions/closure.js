const createCounter = () => {
    let count = 0

    return {
        increment () {
            count++
        }, 
        decrement () {
            count--
        },
        getCount () {
            return count;
        }
    }
}
// counter indeed cannot modify count variable, meaning that
// the variable is protected from outside 

const counter = createCounter()

const tipper = (tip) => {
    return function (amount) {
        return amount * tip
    }
}

console.log(tipper(.15)(100))