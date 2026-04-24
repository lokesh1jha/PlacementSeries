# DOM Manipulation Basics - Tutorial & Interview Notes

## 📚 Tutorial Topics

### 1. Selecting Elements

```javascript
// Single element
document.querySelector('button');

// Multiple elements
document.querySelectorAll("input");
```

### 2. Event Listeners

```javascript
button.addEventListener("click", (event) => {
    event.preventDefault();
    // Handle click
});
```

### 3. Common Events

| Event | Description |
|-------|-------------|
| click | Mouse click |
| submit | Form submission |
| input | Input value change |
| keydown/keyup | Keyboard press |
| mouseover/mouseout | Mouse hover |
| change | Value change (blur) |

### 4. Accessing Form Values

```javascript
const input = document.querySelectorAll("input");
const email = input[0].value;
const name = input[1].value;
```

### 5. Preventing Default Behavior

```javascript
event.preventDefault(); // Prevents form reload, link navigation
```

---

## 🎯 Important Interview Questions

### Q1: What is the difference between querySelector and querySelectorAll?

> **Answer:**
> - `querySelector` returns first matching element (or null)
> - `querySelectorAll` returns NodeList of all matches
> - NodeList is static (doesn't update live)

### Q2: What is the difference between getElementById and querySelector?

> **Answer:**
> - `getElementById` - faster, returns single element by ID
> - `querySelector` - more flexible, uses CSS selectors
> - `getElementById` uses camelCase, querySelector uses string

### Q3: What is Event Bubbling?

> **Answer:** Events propagate from target element up to root. Use `event.stopPropagation()` to stop it.

```javascript
child.addEventListener("click", (e) => {
    e.stopPropagation(); // Stops bubbling
});
```

### Q4: What is the difference between preventDefault and stopPropagation?

> **Answer:**
> - `preventDefault()` - stops default browser action (form submit, link navigation)
> - `stopPropagation()` - stops event from bubbling/capturing

### Q5: How do you get value from an input field?

> **Answer:**
> ```javascript
> const input = document.querySelector('#myInput');
> const value = input.value;
> ```

### Q6: What is the output?

```javascript
const inputs = document.querySelectorAll("input");
console.log(inputs[0]); // ?
console.log(inputs.length); // ?
```

> **Answer:** Returns NodeList collection. Access by index like array.

---

## 🔑 Key Takeaways

1. Use `querySelector` for single elements, `querySelectorAll` for multiple
2. Always use `event.preventDefault()` in form handlers
3. Access form values via `.value` property
4. Understand event handling to manipulate DOM dynamically