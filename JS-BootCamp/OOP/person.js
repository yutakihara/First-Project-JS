// Class 



class Person {

    constructor (firstName, lastName, age, likes =[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.likes = likes;
    }

    getBio () {
        let bio = `${this.firstName} is ${this.age}.`;
        this.likes.forEach((like) => {
            bio += ` ${this.firstName} likes ${like}.`;
        });

        return bio;
    }

    setName (fullName) {
        const names = fullName.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
    }

}

// Inheritance class 
class Employee extends Person {
    constructor (firstName, lastName, age, position, likes) {
        super (firstName, lastName, age, likes);
        this.position = position;
    }

    getBio () {
        return `${this.firstName} ${this.lastName} is a ${this.position}`;
    }

    getYearLeft() {
        return 65 - this.age;
    }
}



class Student extends Person {
    constructor (firstName, lastName, age, likes=[], grade) {
        super(firstName, lastName, age, likes);
        this.grade = grade;
    }

    getBio () {
        return (this.grade >= 70) ? `${this.firstName} ${this.lastName} is passing the class` : `${this.firstName} ${this.lastName} is failing the class`;
    }

    updateGrade ( point ) {
        this.grade += point;
    }
}

const me = new Student('Yuta', 'Kihara', 21, 'Studying', 80);
console.log(me.getBio());
me.updateGrade(-20);
console.log(me.getBio());


// Prototypal Inheritance

// const Person = function (firstName, lastName, age, likes = []) {
//     this.firstName = firstName
//     this.lastName = lastName
//     this.age = age
//     this.likes = likes
// }

// Person.prototype.getBio = function () {
//     let bio = `${this.firstName} is ${this.age}.`

//     this.likes.forEach((like) => {
//         bio += ` ${this.firstName} likes ${like}.`
//     })

//     return bio
// }

// Person.prototype.setName = function (fullName) {
//     const names = fullName.split(' ')
//     this.firstName = names[0]
//     this.lastName = names[1]
// }

// const me = new Person('Andrew', 'Mead', 27, ['Teaching', 'Biking'])
// me.setName('Alexis Turner')
// console.log(me.getBio())

// const person2 = new Person('Clancey', 'Turner', 51)
// console.log(person2.getBio())