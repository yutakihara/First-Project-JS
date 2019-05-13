const square = (num) => num * num


console.log(square(5))

const people = [{
    name: "Yuta",
    age: 67
}, {
    name: "Kai",
    age: 34
}, {
    name: "Michael",
    age: 90
}]

const under30 = people.filter( (person) => person.age < 30);

console.log(under30)

