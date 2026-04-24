# JavaScript Fundamentals - Tutorial & Interview Notes

## 📚 Tutorial Topics

### 1. Data Types

#### Primitive Types
```javascript
typeof "hello"    // "string"
typeof 23         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" ⚠️ BUG!
typeof Symbol()   // "symbol"
typeof 10n        // "bigint"
```

#### Truthy/Falsy Values
```javascript
// Falsy: false, 0, "", null, undefined, NaN
// Truthy: everything else ( [], {}, "false", etc.)
```

### 2. Operators

#### Comparison Operators
```javascript
==   // Loose equality (type coercion)
===  // Strict equality (no type coercion)
!=   // Loose inequality
!==  // Strict inequality
```

#### Arithmetic Operators
```javascript
+   // Addition/concatenation
-   // Subtraction
*   // Multiplication
/   // Division
%   // Modulus
**  // Exponentiation (ES6)
```

#### Type Coercion Tricks
```javascript
"5" + 5   // "55" (string concatenation)
"5" - 3   // 2 (string converted to number)
true + 3  // 4 (true = 1)
false + 3 // 3 (false = 0)
```

### 3. Loops

```javascript
// for loop
for(let i = 1; i <= 10; i++) { }

// while loop
while(a > 0) { a--; }

// for...of (arrays)
for(let city of cities) { }

// for...in (objects)
for(let key in person) { }
```

#### Break vs Continue
```javascript
break;    // Exit loop completely
continue; // Skip current iteration
```

### 4. Conditions

```javascript
// if-else
if(marks < 40) { console.log("C"); }
else if(marks < 80) { console.log("B"); }

// Ternary operator
let status = age > 20 ? "Adult" : "Child";

// switch
switch(day) {
    case "Monday":
    case "Tuesday":
        console.log("Start of Week");
        break;
    default:
        console.log("Party");
}
```

### 5. Functions

```javascript
// Regular function
function greet(name) {
    return "Hello " + name;
}

// Arrow function
const greetArrow = (name = 'Guest') => {
    console.log("Hello ", name);
};

// Rest parameter
const dynamicParams = (first, ...rest) => {
    console.log(rest); // Array of remaining args
};
```

---

## 🎯 Important Interview Questions

### Q1: What is the output of `typeof null`?

> **Answer:** `"object"` — This is a known JavaScript bug since inception. Kept for backward compatibility.

### Q2: What is the difference between `==` and `===`?

> **Answer:**
> - `==` compares values after type coercion
> - `===` compares both value AND type (strict equality)
> - **Always prefer `===`** to avoid unexpected behavior

```javascript
"5" == 5   // true  (type coercion)
"5" === 5  // false (different types)
```

### Q3: What is Truthy and Falsy in JavaScript?

> **Answer:** Every value has implicit boolean conversion:
> - **Falsy (6)**: `false`, `0`, `""`, `null`, `undefined`, `NaN`
> - **Truthy**: Everything else including `"0"`, `[]`, `{}`

### Q4: What is the difference between `for...in` and `for...of`?

> **Answer:**
> - `for...in` — iterates over object keys (enumerable properties)
> - `for...of` — iterates over array values (iterable objects)

```javascript
for(let key in obj) { }    // keys: name, age, city
for(let val of arr) { }    // values: item1, item2
```

### Q5: What is the output?

```javascript
console.log("5" + 5);
console.log("5" - 3);
console.log(true + 3);
```

> **Answer:**
> - `"5" + 5` → `"55"` (string wins, concatenation)
> - `"5" - 3` → `2` (minus triggers numeric conversion)
> - `true + 3` → `4` (true = 1)

### Q6: Explain Arrow Functions vs Regular Functions

> **Answer:**
> | Arrow Function | Regular Function |
> |----------------|------------------|
> | `this` inherits from scope | `this` is dynamic |
> | Cannot be used as object constructor | Can be constructor |
> | No `arguments` object | Has `arguments` object |
> | Shorter syntax | More verbose |

### Q7: What is the Rest Parameter?

> **Answer:** Collects multiple arguments into an array:
> ```javascript
> function sum(...numbers) {
>     return numbers.reduce((a, b) => a + b);
> }
> sum(1, 2, 3, 4); // 10
> ```

### Q8: What is the output?

```javascript
let a = 5;
let b = "5";
console.log(a == b);
console.log(a === b);
console.log(a != b);
console.log(a !== b);
```

> **Answer:**
> - `a == b` → `true` (coercion)
> - `a === b` → `false` (different types)
> - `a != b` → `false` (coercion makes them equal)
> - `a !== b` → `true` (strict, types differ)

---

## 🔑 Key Takeaways

1. **Use `===` always** — avoid type coercion bugs
2. **Remember the 6 falsy values** — `false, 0, "", null, undefined, NaN`
3. **Use appropriate loops** — `for...in` for objects, `for...of` for arrays
4. **Arrow functions** — great for callbacks, but don't use as constructors
5. **Rest parameters** — flexible function arguments
6. **Type coercion** — `+` concatenates, `-/*/%` convert to numbers