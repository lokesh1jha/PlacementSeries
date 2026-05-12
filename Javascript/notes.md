# JavaScript Placement Preparation Guide
## Folders 5, 6, 7, and 8

---

## 📚 Folder 5: Closures, `this` Keyword, and Object-Oriented JavaScript

### 1. Closures

#### Detailed Definition
A closure is a function that has access to its outer function's scope even after the outer function has returned. This creates a "closed-over" environment where inner functions can access variables from their parent scope chain.

```javascript
// Practical Example: Bank Account with Private Data
function createBankAccount(initialBalance, customerName) {
    let balance = initialBalance;  // Private variable
    let name = customerName;

    return {
        deposit(amount) {
            balance += amount;
            console.log(`Deposit complete. New balance: ${balance}`);
        },
        withdraw(amount) {
            if (balance < amount) {
                console.log("Insufficient funds");
                return;
            }
            balance -= amount;
            console.log(`Withdrawal complete. New balance: ${balance}`);
        },
        getBalance() {
            console.log(`Hi ${name}, your balance: ${balance}`);
        }
    };
}

const customer1 = createBankAccount(10000, "Lokesh");
customer1.getBalance(); // Hi Lokesh, your balance: 10000
```

**Key Points:**
- Closures enable data privacy (simulating private variables)
- The inner function maintains a reference to the outer scope
- Memory is retained as long as the closure exists

#### IIFE (Immediately Invoked Function Expression)
```javascript
(function() {
    console.log("IIFE called immediately");
})();
```

---

### 2. The `this` Keyword

#### Detailed Definition
`this` refers to the object that is currently calling the function. Its value depends on **how** the function is invoked, not **where** it's defined.

```javascript
// Global context
console.log(this); // Window object (browser)

// Object method
const person = {
    name: "Lokesh",
    greet() {
        console.log(`Hello, I am ${this.name}`);
    }
};
person.greet(); // "Hello, I am Lokesh" - this = person

// Arrow functions - NO own 'this', inherits from outer scope
const timer = {
    seconds: 0,
    startBroken() {
        setTimeout(function() {
            // BUG: this = Window, not timer
            console.log(this.seconds); // NaN
        }, 1000);
    },
    startFixed() {
        setTimeout(() => {
            // FIX: Arrow inherits 'this' from startFixed
            this.seconds++;
            console.log(this.seconds); // Works correctly
        }, 1000);
    }
};
```

**Rules:**
| Invocation | Value of `this` |
|------------|-----------------|
| Global function | `undefined` (strict) / `window` (non-strict) |
| Object method | The object calling the method |
| `call()`/`apply()`/`bind()` | Explicitly set value |
| Arrow function | Inherits from enclosing scope |

---

### 3. `call`, `apply`, and `bind`

#### Detailed Definition
These methods explicitly set the value of `this` for a function call.

```javascript
function introduce(city, company) {
    console.log(`I am ${this.name} from ${city}, I work at ${company}`);
}

const person1 = { name: "Rahul" };
const person2 = { name: "Priya" };

// call - arguments passed one by one
introduce.call(person1, "Delhi", "TCS");
// "I am Rahul from Delhi, I work at TCS"

// apply - arguments passed as array
introduce.apply(person2, ["Mumbai", "Infosys"]);
// "I am Priya from Mumbai, I work at Infosys"

// bind - returns new function with 'this' permanently set
const boundIntroduce = introduce.bind(person1, "Delhi", "TCS");
boundIntroduce(); // "I am Rahul from Delhi, I work at TCS"
```

**Difference Summary:**
- `call()`: Invokes immediately with arguments listed
- `apply()`: Invokes immediately with arguments in array
- `bind()`: Returns a new function (doesn't invoke)

---

### 4. Prototypes

#### Detailed Definition
Every JavaScript object has a hidden `[[Prototype]]` property that links to another object. This forms the **prototype chain** for inheritance.

```javascript
const animal = {
    breathe() {
        console.log("Breathing...");
    }
};

const dog = {
    bark() {
        console.log("Woof!");
    }
};

// Set animal as prototype of dog
Object.setPrototypeOf(dog, animal);

dog.bark();    // "Woof!" - found on dog
dog.breathe(); // "Breathing..." - found on animal (prototype)
```

**Prototype Chain Lookup:**
1. Check object's own properties
2. Check `[[Prototype]]` object
3. Continue up the chain until `null`

---

### 5. Classes and Objects

#### Detailed Definition
Classes are syntactic sugar over JavaScript's prototype-based inheritance. They provide a cleaner syntax for creating objects and handling inheritance.

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hi, I am ${this.name}, age ${this.age}`);
    }

    get info() {
        return `${this.name} (${this.age})`;
    }
}

const p1 = new Person("Lokesh", 27);
p1.greet(); // "Hi, I am Lokesh, age 27"

// Inheritance with extends and super
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
        super(name);  // MUST call before using 'this'
        this.breed = breed;
    }

    speak() {
        console.log(`${this.name} barks!`);
    }

    info() {
        super.speak();
        console.log(`Breed: ${this.breed}`);
    }
}

const d = new Dog("Tommy", "Labrador");
d.speak(); // "Tommy barks!"
d.info();  // "Tommy makes a sound." then "Breed: Labrador"
```

---

### 6. Error Handling: try/catch/finally

#### Detailed Definition
JavaScript provides structured error handling using `try`, `catch`, and `finally` blocks.

```javascript
try {
    let obj = null;
    console.log(obj.name); // TypeError!
    console.log("This never runs");
} catch (error) {
    console.log("Error caught!");
    console.log(error.message); // "Cannot read properties of null"
    console.log(error.name);    // "TypeError"
} finally {
    console.log("This ALWAYS runs");
}

// Custom errors
function divide(a, b) {
    if (b === 0) {
        throw new RangeError("Cannot divide by zero");
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (err) {
    console.log(`${err.name}: ${err.message}`);
}

// Custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}
```

---

### Interview Question Bank - Folder 5

#### Conceptual Questions
1. What is a closure and how does it enable data privacy?
2. Explain the difference between `var`, `let`, and `const` in closure scenarios.
3. What is lexical scope and how does it relate to closures?
4. How does `this` behave differently in arrow functions vs regular functions?
5. Explain `call()`, `apply()`, and `bind()` with use cases.
6. What is the prototype chain and how does inheritance work?
7. What is the difference between `__proto__` and `prototype`?
8. How do classes in ES6 differ from constructor functions?

#### Output-Based Questions
```javascript
// Q1: What logs?
function outer() {
    let count = 0;
    return function inner() {
        count++;
        return count;
    };
}
const counter = outer();
console.log(counter()); // ?
console.log(counter()); // ?

// Q2: What is 'this'?
const obj = {
    name: "Test",
    greet: () => {
        console.log(this.name);
    }
};
obj.greet();

// Q3: What logs?
const person = {
    name: "John",
    greet() {
        return () => console.log(this.name);
    }
};
person.greet()();

// Q4: What is the output?
function test() {
    "use strict";
    console.log(this);
}
test();
```

#### Coding Challenges
```javascript
// Challenge 1: Create a private counter with closures
function createCounter() {
    // TODO: Implement with increment, decrement, getValue
}

// Challenge 2: Implement function chaining
const calc = {
    result: 0,
    add(n) { this.result += n; return this; },
    subtract(n) { this.result -= n; return this; },
    multiply(n) { this.result *= n; return this; },
    getValue() { return this.result; }
};

console.log(calc.add(5).multiply(2).subtract(3).getValue()); // Expected: 7

// Challenge 3: Debounce function implementation
function debounce(func, delay) {
    // TODO: Return debounced function
}
```

---

## 📊 Folder 6: Built-in Methods (String, Number, Math, Date)

### 1. String Methods

#### Detailed Definition
JavaScript provides numerous methods for string manipulation. Strings are immutable - methods return new strings.

```javascript
let str = "  Hello, JavaScript World!  ";

// trim - remove whitespace
console.log(str.trim()); // "Hello, JavaScript World!"

// Case conversion
console.log("hello".toUpperCase()); // "HELLO"
console.log("HELLO".toLowerCase()); // "hello"

// Search methods
console.log("Hyderabad".includes("bad")); // true
console.log("hello".indexOf("l")); // 2
console.log("hello".startsWith("he")); // true
console.log("hello".endsWith("lo")); // true

// Extract and modify
console.log("JavaScript".slice(0, 4)); // "Java"
console.log("ha ha ha".replace("ha", "ho")); // "ho ha ha" (first match)
console.log("ha ha ha".replaceAll("ha", "ho")); // "ho ho ho"

// Transform
console.log("a,b,c".split(",")); // ["a", "b", "c"]
console.log("5".padStart(3, "0")); // "005"
console.log("ha".repeat(3)); // "hahaha"
```

---

### 2. Number and Math Methods

#### Detailed Definition
JavaScript handles numbers as 64-bit floating-point values. Math object provides mathematical operations.

```javascript
// Number methods
let price = 123.4567;
console.log(price.toFixed(2)); // "123.46" - STRING!
console.log(typeof price.toFixed(2)); // "string"

// parseInt vs parseFloat
console.log(parseInt("42px")); // 42 - stops at non-digit
console.log(parseFloat("3.14px")); // 3.14

// Type checking
console.log(isNaN("hello")); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isInteger(5)); // true

// Math methods
console.log(Math.round(4.5)); // 5
console.log(Math.ceil(4.1)); // 5
console.log(Math.floor(4.9)); // 4
console.log(Math.max(1, 5, 3)); // 5
console.log(Math.random()); // 0 to 0.999...

// Random integer between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

### 3. Date Methods

#### Detailed Definition
The Date object represents a single moment in time. Dates are stored as milliseconds since Unix epoch (Jan 1, 1970).

```javascript
const now = new Date();
console.log(now); // Current date/time

// Get components (WARNING: month is 0-indexed!)
console.log(now.getFullYear()); // 2026
console.log(now.getMonth()); // 0-11 (0 = January!)
console.log(now.getDate()); // 1-31

// Day of week (0 = Sunday)
console.log(now.getDay()); // 0-6

// Time components
console.log(now.getHours()); // 0-23
console.log(now.getMinutes()); // 0-59

// Formatting
console.log(now.toLocaleDateString()); // "4/29/2026"
console.log(now.toISOString()); // "2026-04-29T10:15:00.000Z"

// Timestamp
console.log(Date.now()); // Milliseconds since epoch

// Specific date
const birthday = new Date("1998-06-15");
```

---

### Interview Question Bank - Folder 6

#### Conceptual Questions
1. Why does `toFixed()` return a string instead of a number?
2. What's the difference between `parseInt()` and `Number()`?
3. Explain `isNaN()` vs `Number.isNaN()`.
4. Why is `getMonth()` 0-indexed in JavaScript Date?
5. How do you generate a random integer between two values?
6. What does `Math.trunc()` do differently from `Math.floor()`?

#### Output-Based Questions
```javascript
// Q1
console.log(0.1 + 0.2); // ?
console.log((0.1 + 0.2).toFixed(2)); // ?

// Q2
console.log(parseInt("10px20")); // ?
console.log(Number("10px20")); // ?

// Q3
console.log("hello".repeat(2.5)); // ?
console.log("hello".repeat(-1)); // ?

// Q4
let date = new Date(2023, 0, 1); // Jan 1, 2023
console.log(date.getMonth()); // ?

// Q5
console.log(Math.max()); // ?
console.log(Math.min()); // ?
```

#### Coding Challenges
```javascript
// Challenge 1: Format number with commas
function formatNumber(num) {
    // 1234567 -> "1,234,567"
}

// Challenge 2: Calculate days between two dates
function daysBetween(date1, date2) {
    // Return absolute difference in days
}

// Challenge 3: Generate random hex color
function randomColor() {
    // Return like "#FF5733"
}
```

---

## ⚡ Folder 7: Asynchronous JavaScript (Timers, Promises, Async/Await, Fetch)

### 1. setTimeout and setInterval

#### Detailed Definition
JavaScript is single-threaded but provides asynchronous timers that execute callbacks after a delay.

```javascript
// setTimeout - runs ONCE after delay
console.log("Before");
setTimeout(() => {
    console.log("After 2 seconds");
}, 2000);
console.log("After setup");
// Output: Before, After setup, After 2 seconds

// setInterval - runs REPEATEDLY
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log("Tick:", count);
    if (count === 3) {
        clearInterval(intervalId);
        console.log("Stopped!");
    }
}, 1000);

// Zero delay doesn't mean immediate
setTimeout(() => console.log("Zero delay"), 0);
console.log("Synchronous");
// Output: Synchronous, Zero delay
```

---

### 2. Promises

#### Detailed Definition
A Promise represents the eventual completion (or failure) of an asynchronous operation. It has three states: pending, fulfilled, rejected.

```javascript
const myPromise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Operation succeeded!");
    } else {
        reject("Something went wrong!");
    }
});

myPromise
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Error:", error))
    .finally(() => console.log("Always runs"));

// Simulating API call with delay
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Rahul" });
            } else {
                reject(new Error("Invalid ID"));
            }
        }, 1000);
    });
}

// Promise chaining
getUserData(1)
    .then(user => {
        console.log("User:", user.name);
        return user; // Pass to next .then
    })
    .then(user => console.log("ID:", user.id))
    .catch(err => console.log("Error:", err.message));

// Promise.all - parallel execution
Promise.all([
    fetch("/users"),
    fetch("/products"),
    fetch("/orders")
])
    .then(([users, products, orders]) => {
        console.log("All data loaded");
    })
    .catch(err => console.log("One failed"));

// Promise.race - first to settle wins
Promise.race([
    fetch("/fast"),
    fetch("/slow")
]).then(result => console.log("First done"));
```

---

### 3. async/await

#### Detailed Definition
`async/await` provides syntactic sugar over Promises, making asynchronous code look synchronous.

```javascript
// Old way - Promises
function oldWay() {
    getUser(1)
        .then(user => console.log(user.name))
        .catch(err => console.log(err));
}

// New way - async/await
async function newWay() {
    try {
        const user = await getUser(1);
        console.log(user.name);
    } catch (err) {
        console.log(err);
    }
}

// async always returns Promise
async function greet() {
    return "Hello";
}
greet().then(msg => console.log(msg)); // "Hello"

// Sequential vs Parallel
// BAD - sequential
async function slow() {
    const users = await fetchUsers();
    const products = await fetchProducts(); // waits!
}

// GOOD - parallel
async function fast() {
    const [users, products] = await Promise.all([
        fetchUsers(),
        fetchProducts()
    ]);
}
```

---

### 4. Fetch API

#### Detailed Definition
The Fetch API provides a modern interface for making HTTP requests, returning Promises.

```javascript
// GET request
fetch("https://api.example.com/users/1")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    })
    .then(user => console.log(user))
    .catch(err => console.log("Error:", err.message));

// POST request
async function createUser(userData) {
    try {
        const response = await fetch("https://api.example.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) throw new Error("Failed");

        const newUser = await response.json();
        return newUser;
    } catch (err) {
        console.error(err);
    }
}
```

**Important Gotchas:**
- `fetch()` only rejects on network errors, NOT HTTP errors (404, 500)
- Always check `response.ok` before calling `.json()`
- `response.json()` also returns a Promise

---

### Interview Question Bank - Folder 7

#### Conceptual Questions
1. Explain the event loop, call stack, and callback queue.
2. What are the states of a Promise?
3. Difference between `Promise.all`, `Promise.race`, `Promise.allSettled`.
4. Why doesn't `fetch()` reject on 404 or 500 status codes?
5. Explain `async/await` vs `.then()` chains.
6. What is callback hell and how do Promises solve it?
7. What is the output order of the following async code?

#### Output-Based Questions
```javascript
// Q1: What logs and in what order?
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Q2: Promise microtask vs setTimeout macrotask
Promise.resolve()
    .then(() => console.log("Promise 1"));
setTimeout(() => console.log("Timeout 1"), 0);
Promise.resolve()
    .then(() => console.log("Promise 2"));
setTimeout(() => console.log("Timeout 2"), 0);

// Q3: What happens?
async function test() {
    console.log("Start");
    await Promise.resolve(1);
    console.log("Middle");
    await Promise.resolve(2);
    console.log("End");
}
test();
console.log("After");

// Q4: Closure in async
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Fix with let or IIFE
```

#### Coding Challenges
```javascript
// Challenge 1: Implement a retry mechanism
async function fetchWithRetry(url, maxRetries = 3) {
    // Retry failed fetch up to maxRetries times
}

// Challenge 2: Debounce with immediate execution
function debounce(func, delay, immediate = false) {
    // Return debounced function
}

// Challenge 3: Implement Promise.all from scratch
function myPromiseAll(promises) {
    // Return a Promise that resolves when all resolve
}
```

---

## 🎨 Folder 8: DOM Manipulation and Practical Application

### User Dashboard Implementation

The user dashboard demonstrates real-world JavaScript concepts combined:

```javascript
// Key concepts from user-dashboard.html:

// 1. DOM Selection
const grid = document.querySelector("#userGrid");
const status = document.querySelector("#status");

// 2. Async data fetching
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed");
        return await response.json();
    } catch (error) {
        // Handle error
    }
}

// 3. Array methods for filtering
document.querySelector("#searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query)
    );
    renderUsers(filtered);
});

// 4. Template literals for dynamic HTML
const html = users.map(user => `
    <div class="card">
        <h3>${user.name}</h3>
        <p class="email">${user.email}</p>
        <p>${user.address.city}</p>
    </div>
`).join("");
```

---

### Best Practices & Common Pitfalls

#### Closures
- **Best:** Use IIFEs or block scoping to avoid loop issues
- **Pitfall:** Creating unnecessary closures that prevent garbage collection

#### `this` Keyword
- **Best:** Use arrow functions in callbacks that need outer `this`
- **Pitfall:** Using `this` in arrow functions expecting object context

#### Promises
- **Best:** Always return Promises in `.then()` chains
- **Pitfall:** Forgetting to handle errors with `.catch()`

#### async/await
- **Best:** Wrap `await` in try/catch
- **Pitfall:** Sequential awaits for independent operations

#### Fetch
- **Best:** Always check `response.ok` before `.json()`
- **Pitfall:** Assuming 404/500 will trigger `.catch()`

---

## 📝 Quick Reference Summary

| Concept | Syntax | Key Points |
|---------|--------|------------|
| Closure | `function() { return function() {...} }` | Captures outer scope variables |
| `this` | `obj.method()` vs `method.call(obj)` | Depends on call site |
| Promise | `new Promise((res, rej) => {})` | Three states: pending, fulfilled, rejected |
| async/await | `async function() { await promise }` | Syntactic sugar over Promises |
| fetch | `fetch(url).then(r => r.json())` | Always check `response.ok` |
| Date.getMonth() | `date.getMonth() + 1` | 0-indexed (Jan = 0) |
| toFixed() | `num.toFixed(2)` | Returns STRING |

---

*End of Notes - Happy Coding!*