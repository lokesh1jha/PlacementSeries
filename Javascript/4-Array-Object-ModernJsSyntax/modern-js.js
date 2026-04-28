// 4.1 — Destructuring
// Destructuring is a clean way to extract values from arrays or objects into separate variables. 
// You will use this every single day in React.

// Object Destructuring
let person = { name: 'Priya', age: 22, city: 'Mumbai' };


// Without destructuring
let name = person.name;
let age  = person.age;


// With destructuring — much cleaner
let { name, age, city } = person;
console.log(name);   // 'Priya'
console.log(age);    // 22


// Rename while destructuring
let { name: studentName, age: studentAge } = person;
console.log(studentName);   // 'Priya'


// Default values
let { name: n, salary = 0 } = person;
console.log(salary);   // 0  (salary doesn't exist, uses default)


// Nested destructuring
let user = { profile: { username: 'lokesh123', level: 5 } };
let { profile: { username } } = user;
console.log(username);   // 'lokesh123'

// Array Destructuring
let colors = ['red', 'green', 'blue'];


// Without destructuring
let first = colors[0];
let second = colors[1];


// With destructuring
let [first, second, third] = colors;
console.log(first);    // 'red'
console.log(second);   // 'green'


// Skip elements with commas
let [, , last] = colors;
console.log(last);   // 'blue'


// Swap two variables — elegant trick
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);   // 2 1
// INTERVIEW: Destructuring is used constantly in React — especially for function parameters and useState. 
// Example: const [count, setCount] = useState(0). If you don't understand destructuring you will struggle with React. 
// Interviewers also ask 'explain destructuring with an example'.










// 4.2 — Spread Operator (...)
// The spread operator spreads the elements of an array or object into individual items. Three dots.

// ─── WITH ARRAYS ─────────────────────


let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];


// Combine two arrays
let combined = [...arr1, ...arr2];
console.log(combined);   // [1, 2, 3, 4, 5, 6]


// Copy an array (prevents reference issues)
let original = [1, 2, 3];
let copy = [...original];
copy.push(4);
console.log(original);   // [1, 2, 3]  — not affected
console.log(copy);       // [1, 2, 3, 4]


// Pass array as function arguments
let nums = [5, 3, 8, 1];
console.log(Math.max(...nums));   // 8


// ─── WITH OBJECTS ────────────────────


let defaults = { theme: 'light', lang: 'en', fontSize: 14 };
let userPrefs = { theme: 'dark', fontSize: 18 };


// Merge objects — later values override earlier ones
let settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: 'dark', lang: 'en', fontSize: 18 }


// Copy an object
let original = { name: 'Rahul', age: 22 };
let copy = { ...original };
copy.age = 99;
console.log(original.age);   // 22  — not affected
// INTERVIEW: In React, you will use the spread operator to update state without mutating the original object. 
// This is a fundamental pattern: setState({ ...prevState, newField: value }). Interviewers ask 
// 'what is the spread operator and give a real use case'.

// 4.3 — Rest Operator in Destructuring
// The same three dots — but used on the LEFT side during destructuring. 
// It collects the remaining items.

// In arrays
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);    // 1
console.log(second);   // 2
console.log(rest);     // [3, 4, 5]


// In objects
let { name, age, ...others } = { name: 'Priya', age: 22, city: 'Mumbai', role: 'Dev' };
console.log(name);     // 'Priya'
console.log(others);   // { city: 'Mumbai', role: 'Dev' }
// TIP: Spread is used on the RIGHT side to expand. Rest is used on the LEFT side to collect. 
// Same syntax, opposite purpose. Many beginners confuse these.

// 4.4 — Template Literals
//  Template literals are backtick strings. 
// They let you embed variables directly inside a string —
//  no more string concatenation with + signs.

let name = 'Lokesh';
let company = 'Infosys';
let years = 2;


// Old way — messy
let msg1 = 'Hello ' + name + ', you have ' + years + ' years at ' + company;


// Template literal — clean
let msg2 = `Hello ${name}, you have ${years} years at ${company}`;
console.log(msg2);
// 'Hello Lokesh, you have 2 years at Infosys'


// Can run expressions inside ${}
let price = 100;
let gst = 0.18;
console.log(`Total: Rs.${price + price * gst}`);   // 'Total: Rs.118'


// Multi-line strings
let html = `
    <div>
        <h1>${name}</h1>
        <p>Works at ${company}</p>
    </div>
`;







// 4.5 — JSON — JSON.parse() and JSON.stringify()
// JSON is how data is sent between a frontend and a backend. Every API call you make in your career returns JSON. You must understand this.
// ANALOGY: JSON is like a universal language for data. Your frontend might be in React, your backend in Node, a third-party service in Python. JSON is the common format they all understand — like English between people who speak different native languages.

// An object in JavaScript
let user = {
    name: 'Rahul',
    age: 22,
    skills: ['JS', 'React']
};


// JSON.stringify() — convert object TO string (to send to server)
let jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"Rahul","age":22,"skills":["JS","React"]}'
console.log(typeof jsonString);   // 'string'


// JSON.parse() — convert string BACK to object (when you receive from server)
let parsedUser = JSON.parse(jsonString);
console.log(parsedUser.name);     // 'Rahul'
console.log(typeof parsedUser);   // 'object'


// Pretty print for debugging
console.log(JSON.stringify(user, null, 2));
// INTERVIEW: 'What is JSON?' is asked in almost every fresher interview. 
// Answer: JSON stands for JavaScript Object Notation. 
// It is a text-based format for representing structured data. 
// JSON.stringify() converts a JS object to a JSON string. 
// JSON.parse() converts a JSON string back to a JS object.

