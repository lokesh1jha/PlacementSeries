const animal = {
    breathe() {
        console.log('Breathing...');
    }
};


const dog = {
    bark() {
        console.log('Woof!');
    }
};


// Set animal as the prototype of dog
Object.setPrototypeOf(dog, animal);



dog.bark();     // Woof!     - found on dog itself
dog.breathe();  // Breathing - found on animal (prototype)


// Check prototype
console.log(Object.getPrototypeOf(dog) === animal);  // true
