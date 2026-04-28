# Array, Object & Modern JS Syntax - Complete Notes

## Overview
Comprehensive notes covering arrays, objects, destructuring, spread/rest operators, template literals, JSON, and modern JavaScript features. Includes key interview concepts and frequently asked questions.

---

## 1. Array Methods

### forEach - Loops with No Return Value
- **Purpose**: Iterate over array elements (side effects only)
- **Return Value**: `undefined` - does NOT return a new array
- **Use Case**: Logging, performing actions on each element
```javascript
let students = ['Rahul', 'Priya', 'Ankit'];
students.forEach(function(student) {
    console.log('Hello', student);
});
// Arrow function version (cleaner)
students.forEach(student => console.log('Hello', student));
// With index
students.forEach((student, index) => {
    console.log(index + 1, student);
});
```
**Interview Tip**: forEach cannot be chained like map/filter because it returns undefined. Use for side effects only.

---

### map - Transforms, Returns New Array (Same Length)
- **Purpose**: Transform each element, returns NEW array of SAME length
- **Original Array**: Unchanged (immutable)
- **Return**: New array with transformed values
```javascript
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(num => num * 2);
console.log(doubled);    // [2, 4, 6, 8, 10]
console.log(numbers);    // [1, 2, 3, 4, 5] - original unchanged

// Extract names from objects
let users = [
    { name: 'Rahul', age: 22 },
    { name: 'Priya', age: 21 },
    { name: 'Ankit', age: 23 }
];
let names = users.map(user => user.name);
console.log(names);   // ['Rahul', 'Priya', 'Ankit']
```
**Interview Tip**: map is for 1:1 transformations. Every input element produces exactly one output element.

---

### filter - Keeps Matching Items (Returns Shorter or Equal Array)
- **Purpose**: Select elements that pass a condition
- **Original Array**: Unchanged
- **Return**: New array with only matching items (can be shorter)
```javascript
let listofnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evens = listofnumbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter students who passed
let allstudents = [
    { name: 'Rahul',  marks: 85 },
    { name: 'Priya',  marks: 42 },
    { name: 'Ankit',  marks: 78 },
    { name: 'Sneha',  marks: 35 },
    { name: 'Vikram', marks: 91 }
];
let passed = allstudents.filter(s => s.marks >= 50);
console.log(passed); // Only students with marks >= 50
```
**Interview Tip**: filter returns a subset. Condition must return boolean true/false.

---

### reduce - Combines All Into One Value
- **Purpose**: Reduce array to a single value (accumulator)
- **Syntax**: `array.reduce((accumulator, currentValue) => {}, initialValue)`
- **Return**: Single accumulated value (any type)
```javascript
let newnumbers = [10, 20, 30, 40, 50];
let total = newnumbers.reduce((acc, curr) => {
    return acc + curr;
}, 0);
console.log(total);   // 150

// Step by step:
// Start: acc = 0
// Step 1: acc = 0 + 10  = 10
// Step 2: acc = 10 + 20 = 30
// Step 3: acc = 30 + 30 = 60
// Step 4: acc = 60 + 40 = 100
// Step 5: acc = 100 + 50 = 150

// Real example — count occurrences
let votes = ['React', 'Vue', 'React', 'Angular', 'React', 'Vue'];
let count = votes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
}, {});
console.log(count);   // { React: 3, Vue: 2, Angular: 1 }
```
**Interview Tip**: reduce is powerful for aggregations (sum, count, groupBy). Always provide initial value.

---

### Additional Array Methods

**find** - Returns first matching element or undefined
```javascript
let newusers = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Ankit' }
];
let user = newusers.find(u => u.id === 2);
console.log(user);   // { id: 2, name: 'Priya' }
let missing = newusers.find(u => u.id === 99);
console.log(missing);  // undefined
```

**findIndex** - Returns index of first matching element or -1
```javascript
let index = newusers.findIndex(u => u.id === 2);
console.log(index);  // 1
```

**includes** - Check if value exists (exact match)
```javascript
let fruits = ['apple', 'mango', 'banana'];
console.log(fruits.includes('mango'));    // true
console.log(fruits.includes('grape'));    // false
```

**some** - Does AT LEAST ONE element match?
```javascript
let numbers = [2, 4, 6, 8, 10];
console.log(numbers.some(n => n > 9));   // true (10 matches)
console.log(numbers.some(n => n > 20));  // false (none match)
```

**every** - Do ALL elements match?
```javascript
console.log(numbers.every(n => n % 2 === 0));  // true (all even)
console.log(numbers.every(n => n > 5));        // false (2, 4 fail)
```

**sort** - ⚠️ Sorts as strings by default - use comparator for numbers
```javascript
// Default sort — WRONG for numbers
let nums = [10, 9, 2, 1, 100];
nums.sort();
console.log(nums);   // [1, 10, 100, 2, 9]  — sorted as strings!

// Correct numeric sort — ascending
nums.sort((a, b) => a - b);
console.log(nums);   // [1, 2, 9, 10, 100]

// Descending
nums.sort((a, b) => b - a);
console.log(nums);   // [100, 10, 9, 2, 1]

// Sort objects by property
let students = [
    { name: 'Rahul', marks: 85 },
    { name: 'Priya', marks: 92 },
    { name: 'Ankit', marks: 78 }
];
students.sort((a, b) => b.marks - a.marks);  // highest first
console.log(students[0].name);   // 'Priya'
```

---

## 2. Array Modification - splice vs slice

### splice - MODIFIES Original Array
- Changes the original array
- Syntax: `splice(startIndex, deleteCount, ...itemsToAdd)`
- Returns: Array of deleted elements
```javascript
let cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Pune'];
// Remove 2 elements starting at index 1
const deletedElements = cities.splice(1, 2);
console.log(deletedElements); // ['Mumbai', 'Chennai']
console.log(cities); // ['Delhi', 'Kolkata', 'Pune'] - ORIGINAL CHANGED

// Add element at index 1
cities.splice(1, 0, 'Bangalore');
console.log(cities); // ['Delhi', 'Bangalore', 'Kolkata', 'Pune']
```

### slice - Does NOT Modify Original
- Returns NEW array, original unchanged
- Syntax: `slice(startIndex, endIndex)` - endIndex is NOT included
```javascript
let cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Pune'];
let deleted = cities.slice(1, 3);
console.log("sliced result", deleted); // ['Mumbai', 'Chennai']
console.log(cities); // ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Pune'] - NOT CHANGED
```

**Interview Tip**: This is a very common question! `splice` modifies original, `slice` returns new array. Same mnemonic: slice is cleaner (no mutation).

---

## 3. Destructuring

Extracts values from arrays/objects into variables. Used everywhere in React!

### Object Destructuring
```javascript
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
```

### Array Destructuring
```javascript
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
```

**React Example**:
```javascript
const [count, setCount] = useState(0);
// This is array destructuring! Without understanding it, React hooks are confusing.
```

**Interview Tip**: Destructuring is heavily used in React for props and hooks. Interviewers often ask to explain with examples.

---

## 4. Spread (...) vs Rest (...)

### Spread Operator - Expands (Used on RIGHT Side)
Spreads elements of array or properties of object.

**With Arrays**:
```javascript
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
```

**With Objects**:
```javascript
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
```

**React Use Case**: Update state without mutating:
```javascript
setState({ ...prevState, newField: value });
```

---

### Rest Operator - Collects (Used on LEFT Side in Destructuring)
Collects remaining items into an array/object.

**In Arrays**:
```javascript
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);    // 1
console.log(second);   // 2
console.log(rest);     // [3, 4, 5]
```

**In Objects**:
```javascript
let { name, age, ...others } = { 
    name: 'Priya', 
    age: 22, 
    city: 'Mumbai', 
    role: 'Dev' 
};
console.log(name);     // 'Priya'
console.log(others);   // { city: 'Mumbai', role: 'Dev' }
```

**Key Point**: Same syntax (`...`), opposite purpose!
- **Right side** = Spread (expands)
- **Left side** = Rest (collects)

**Interview Tip**: Many beginners confuse spread and rest. Emphasize: position matters! Same syntax, different context.

---

## 5. Template Literals

Backtick strings with embedded expressions.
```javascript
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
```

**Interview Tip**: Cleaner string concatenation and multi-line support. Also supports expression evaluation.

---

## 6. JSON - JSON.parse() and JSON.stringify()

JSON is how data is sent between frontend and backend.

**Analogy**: JSON is like a universal language for data. Your frontend might be React, backend Node.js, third-party service Python — JSON is the common format they all understand.

```javascript
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
```

**Interview Answer**:
- **What is JSON?** JSON stands for JavaScript Object Notation. It is a text-based format for representing structured data that is language-independent.
- **JSON.stringify()** converts a JS object to a JSON string (for sending to API).
- **JSON.parse()** converts a JSON string back to a JS object (when receiving from API).

**Interview Tip**: "What is JSON?" is asked in almost every fresher interview. Always mention it's text-based, language-independent, and the standard for API communication.

---

## 7. Object Methods

### this keyword in Object Methods
```javascript
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
```

**Key Point**: Inside an object method, `this` refers to the object itself. Arrow functions do NOT have their own `this` — they inherit it from the parent scope.

**Interview Tip**: "What is this keyword in JavaScript?" — inside an object method, this refers to the object itself.

---

### Object.keys(), Object.values(), Object.entries()

```javascript
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
```

**Interview Tip**: These are frequently asked. Know what each returns and common use cases (e.g., Object.keys for iterating, Object.entries for looping with both key and value).

---

## Quick Reference Summary

| Method/Concept | Purpose | Mutates Original | Returns |
|---------------|---------|------------------|----------|
| **forEach** | Loop, side effects | No (doesn't apply) | undefined |
| **map** | Transform each element | No | New array (same length) |
| **filter** | Select matching items | No | New array (shorter/equal) |
| **reduce** | Combine to single value | No | Single value (any type) |
| **splice** | Add/remove items | ✅ YES | Array of deleted items |
| **slice** | Extract portion | No | New array |
| **sort()** | Sort elements | ✅ YES | Sorted array (use (a,b)=>a-b for nums) |
| **JSON.stringify()** | Object → String | No | String |
| **JSON.parse()** | String → Object | No | Object |
| **Object.keys()** | Get keys as array | No | Array of keys |
| **Object.values()** | Get values as array | No | Array of values |
| **Object.entries()** | Get [key,value] pairs | No | Array of pairs |

---

## Top Interview Questions

1. **forEach vs map**: What's the difference? Which returns a new array?
2. **splice vs slice**: Which modifies the original array? What does each return?
3. **sort() bug**: Why does `[10, 9, 2, 1].sort()` give `[1, 10, 2, 9]`? How to fix?
4. **JSON**: What is JSON? Explain stringify vs parse with examples.
5. **this keyword**: What is `this` inside an object method? What about arrow functions?
6. **Spread vs Rest**: What's the difference? Give examples of each.
7. **Destructuring**: Explain with an example. How is it used in React?
8. **reduce**: Explain how it works. Give a real-world use case.
9. **Object methods**: What do Object.keys(), .values(), .entries() return?
10. **map chaining**: Can you chain forEach with map? Why or why not?

---

## Pro Tips

- **map/filter/reduce** don't mutate the original array — great for functional programming
- **splice/sort** DO mutate — use carefully or create copies first
- Always use `(a, b) => a - b` comparator for numeric sorting
- Spread operator is essential for immutability (React state updates)
- Destructuring makes code cleaner and is fundamental to modern React
- JSON is the standard for API communication — stringify for sending, parse for receiving
- `this` behaves differently in arrow functions vs regular functions