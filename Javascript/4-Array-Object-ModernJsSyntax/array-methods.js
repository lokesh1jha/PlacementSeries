//----------------------------------------forEach----------------------------------------
let students = ['Rahul', 'Priya', 'Ankit'];


students.forEach(function(student) {
    console.log('Hello', student);
});


// Arrow function version (cleaner)
students.forEach(student => {
    console.log('Hello', student);
});


// With index
students.forEach((student, index) => {
    console.log(index + 1, student);
});


//---------------------------------------- map ----------------------------------------
let numbers = [1, 2, 3, 4, 5]; // original array will be not affected with the use of "map"


// Double every number
let doubled = numbers.map(num => num * 2);
console.log(doubled);    // [2, 4, 6, 8, 10]
console.log(numbers);    // [1, 2, 3, 4, 5]  — original unchanged


// Real example — extract names from objects
let users = [
    { name: 'Rahul', age: 22 },
    { name: 'Priya', age: 21 },
    { name: 'Ankit', age: 23 }
];


let names = users.map(user => user.name);
console.log(names);   // ['Rahul', 'Priya', 'Ankit']

//----------------------------------------filter---------------------------------------- 
let listofnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


// Keep only even numbers
let evens = listofnumbers.filter(num => num % 2 === 0);
console.log(evens)
console.log(listofnumbers)


// Real example — filter students who passed
let allstudents = [
    { name: 'Rahul',  marks: 85 },
    { name: 'Priya',  marks: 42 },
    { name: 'Ankit',  marks: 78 },
    { name: 'Sneha',  marks: 35 },
    { name: 'Vikram', marks: 91 }
];


let passed = allstudents.filter(s => s.marks >= 50);
console.log(passed);

//*IMP*/
//----------------------------------------reduce---------------------------------------- 
// Syntax: array.reduce((accumulator, currentValue) => {}, initialValue)


let newnumbers = [10, 20, 30, 40, 50];


let total = newnumbers.reduce((acc, curr) => {
    return acc + curr;
}, 0);


console.log(total);   // 150


// Step by step what happens:
// Start: acc = 0
// Step 1: acc = 0 + 10  = 10
// Step 2: acc = 10 + 20 = 30
// Step 3: acc = 30 + 30 = 60
// Step 4: acc = 60 + 40 = 100
// Step 5: acc = 100 + 50 = 150


// Shorter version
let sum = numbers.reduce((acc, curr) => acc + curr, 0);


// Real example — count occurrences
let votes = ['React', 'Vue', 'React', 'Angular', 'React', 'Vue'];


let count = votes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
}, {});


console.log(count);   // { React: 3, Vue: 2, Angular: 1 }

//----------------------------------------find and findIndex---------------------------------------- 
let newusers = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Ankit' }
];


let user = newusers.find(u => u.id === 2);
console.log(user);   // { id: 2, name: 'Priya' }


let index = newusers.findIndex(u => u.id === 2);
console.log(index);  // 1


// Returns undefined if not found
let missing = newusers.find(u => u.id === 99);
console.log(missing);  // undefined

//----------------------------------------includes, some, every---------------------------------------- 
let fruits = ['apple', 'mango', 'banana'];


// includes — does this exact value exist?
console.log(fruits.includes('mango'));    // true
console.log(fruits.includes('grape'));    // false


let numbers = [2, 4, 6, 8, 10];


// some — does AT LEAST ONE element match?
console.log(numbers.some(n => n > 9));   // true  (10 matches)
console.log(numbers.some(n => n > 20));  // false (none match)


// every — do ALL elements match?
console.log(numbers.every(n => n % 2 === 0));  // true  (all even)
console.log(numbers.every(n => n > 5));        // false (2, 4 fail)


//----------------------------------------sort---------------------------------------- 
// sort is tricky. By default it sorts as strings — even numbers. This causes a famous bug.
/*
 WATCH OUT: sort() without a comparison function converts elements to strings first. 
 This means [10, 9, 2, 1] sorted becomes [1, 10, 2, 9] — NOT [1, 2, 9, 10]. 
 Always pass a comparison function for numbers.
 */

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


// Sort strings alphabetically
let names = ['Rahul', 'Ankit', 'Priya', 'Zara'];
names.sort();
console.log(names);   // ['Ankit', 'Priya', 'Rahul', 'Zara']


// Sort objects by a property
let students = [
    { name: 'Rahul', marks: 85 },
    { name: 'Priya', marks: 92 },
    { name: 'Ankit', marks: 78 }
];
students.sort((a, b) => b.marks - a.marks);  // highest first
console.log(students[0].name);   // 'Priya'

/*
**NOTE**
 INTERVIEW: 'Why does sort() give wrong results for numbers?' is a popular interview question. 
 Answer: sort() converts elements to strings by default. '10' comes before '2' alphabetically. 
 Always use (a, b) => a - b for numbers
*/