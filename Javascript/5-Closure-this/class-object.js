class Person {
    // constructor runs when you create a new Person
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }


    // method shared by all Person instances
    greet() {
        console.log(`Hi, I am ${this.name}, age ${this.age}`);
    }


    // getter - access like a property, not a function
    get info() {
        return `${this.name} (${this.age})`;
    }
}


const p1 = new Person('Lokesh', 27);
const p2 = new Person('Priya', 24);


p1.greet();              // Hi, I am Lokesh, age 27
p2.greet();              // Hi, I am Priya, age 24
console.log(p1.info);   // Lokesh (27)


// Check type
console.log(p1 instanceof Person);  // true






// ---- Inheritance with extends and super -----
// extends lets one class inherit from another. super calls the parent class constructor or methods.

class Animal {
    constructor(name) {
        this.name = name;
    }


    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}


class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // MUST call super() before using this
        this.breed = breed;
    }


    speak() {
        console.log(`${this.name} barks!`);
    }


    info() {
        super.speak();  // call parent method
        console.log(`Breed: ${this.breed}`);
    }
}


const d = new Dog('Tommy', 'Labrador');
d.speak();   // Tommy barks!
d.info();    // Tommy makes a sound.
             // Breed: Labrador


console.log(d instanceof Dog);     // true
console.log(d instanceof Animal);  // true

// INTERVIEW: 'Explain classes and inheritance in JavaScript.' Answer: A class is a blueprint for creating objects. It uses the class keyword, a constructor method, and can have methods. extends creates a child class that inherits all properties and methods of the parent. super() must be called inside the child constructor before using this — it calls the parent constructor.
