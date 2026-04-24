# JavaScript Variables - Tutorial & Interview Notes

## 📚 Tutorial Topics

### 1. Variables Declaration

JavaScript has three ways to declare variables:

```javascript
var color = "red";    // Old way - function scoped
let height = 125;     // Modern way - block scoped
const floor = 22;     // Constant - cannot be reassigned
```

### 2. Differences: var vs let vs const

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Reassignment | ✅ | ✅ | ❌ |
| Global object | Yes | No | No |

### 3. Variable Initialization

```javascript
let name;              // undefined by default
name = "Lokesh";       // Assignment
name = "Ravi";         // Reassignment allowed with let
```

### 4. Data Types Overview

- **Primitive**: string, number, boolean, undefined, null, symbol, bigint
- **Reference**: object, array, function

---

## 🎯 Important Interview Questions

### Q1: What is the difference between `var` and `let`?

> **Answer:** 
> - `var` is function-scoped, `let` is block-scoped
> - `var` can be redeclared, `let` cannot
> - `var` hoists with undefined, `let` has Temporal Dead Zone (TDZ)
> - `var` adds to global object, `let` does not

### Q2: What is Hoisting in JavaScript?

> **Answer:** Hoisting moves variable declarations to the top of their scope before execution.
> ```javascript
> console.log(x); // undefined (not error)
> var x = 5;
> // Internally interpreted as:
> var x;
> console.log(x);
> x = 5;
> ```

### Q3: Why should we prefer `const` over `var`?

> **Answer:** 
> - Prevents accidental reassignment
> - Block-scoped (like let)
> - Signals intent to other developers
> - Enables better optimization by JavaScript engine

### Q4: What is Temporal Dead Zone (TDZ)?

> **Answer:** The period between entering scope and declaration where accessing `let`/`const` variables throws ReferenceError.

```javascript
{
  console.log(x); // ReferenceError - TDZ
  let x = 5;
}
```

### Q5: What is the output and why?

```javascript
console.log(x);
var x = 10;
```

> **Answer:** `undefined` — var hoists with initialization, not value.

---

## 🔑 Key Takeaways

1. **Always use `const`** by default, `let` when reassignment needed
2. **Avoid `var`** in modern JavaScript
3. **Understand hoisting** to avoid bugs
4. **Remember TDZ** for let/const