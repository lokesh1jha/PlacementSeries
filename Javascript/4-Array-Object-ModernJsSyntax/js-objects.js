//3.1 Objects
let person = {
    name: 'Lokesh',
    age: 27,
    city: 'Hyderabad',
    isEmployed: true
};


// Access with dot notation
console.log(person.name);   // 'Lokesh'
console.log(person.age);    // 27


// Access with bracket notation (use when key is dynamic)
console.log(person['city']);   // 'Hyderabad'
console.log("person['name']", person['name'])

let key = 'name';
console.log(person[key]);   // 'Lokesh'


// Update a value
person.age = 28;


// Add a new key
person.skills = ['JavaScript', 'React'];


// Delete a key
delete person.isEmployed;


console.log(person);



// 3.2 — Nested Objects

let employee = {
    name: 'Priya',
    address: {
        city: 'Bangalore',
        pincode: '560001'
    },
    skills: ['React', 'Node', 'CSS']
};


// Access nested property
console.log(employee.address.city);     // 'Bangalore'
console.log(employee.skills[0]);         // 'React'


// Safe access with optional chaining (from Part 2)
console.log(employee?.address?.pincode); // '560001'



// 3.3 — Object Methods
// A method is just a function stored inside an object.

let calculator = {
    value: 0,
    add: function(num) {
        this.value += num;
        return this;   // return this for chaining
    },
    subtract: function(num) {
        this.value -= num;
        return this;
    },
    getResult: function() {
        return this.value;
    }
};


calculator.add(10).add(5).subtract(3);
console.log(calculator.getResult());   // 12
// INTERVIEW: 'What is this keyword in JavaScript?' — inside an object method, this refers to the object itself. 
// So this.value means 'the value property of this object'. this behaves differently in arrow functions — 
// that is covered in Part 4.






// 3.4 — Object.keys(), Object.values(), Object.entries()
// Three very useful built-in methods. Interviewers ask about these frequently.

let student = {
    name: 'Rahul',
    age: 22,
    city: 'Delhi'
};


// Object.keys() — returns array of all keys
console.log(Object.keys(student));
// ['name', 'age', 'city']


// Object.values() — returns array of all values
console.log(Object.values(student));
// ['Rahul', 22, 'Delhi']


// Object.entries() — returns array of [key, value] pairs
console.log(Object.entries(student));
// [['name','Rahul'], ['age',22], ['city','Delhi']]


// Useful for looping over an object
Object.entries(student).forEach(([key, value]) => {
    console.log(key + ': ' + value);
});
