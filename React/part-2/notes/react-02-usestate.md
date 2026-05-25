# React Video 2 — useState, Event Handling, Controlled Components & Conditional Rendering

> **Web Dev Series** | [YouTube Video Link] | [GitHub Repo Link]  
> **Prerequisites:** React Video 1 (Components, JSX, Props)

---

## Table of Contents

1. [Props vs State](#1-props-vs-state)
2. [useState Hook](#2-usestate-hook)
3. [Event Handling](#3-event-handling)
4. [Controlled Components & Forms](#4-controlled-components--forms)
5. [Conditional Rendering](#5-conditional-rendering)
6. [State Patterns — Objects & Arrays](#6-state-patterns--objects--arrays)
7. [Mini Project — Interactive Todo App](#7-mini-project--interactive-todo-app)
8. [Interview Questions](#8-interview-questions)
9. [Quick Reference Cheat Sheet](#9-quick-reference-cheat-sheet)

---

## 1. Props vs State

| | Props | State |
|---|---|---|
| **Where it lives** | Passed from parent | Inside the component |
| **Who controls it** | Parent component | The component itself |
| **Can it change?** | No — read-only | Yes — via setter function |
| **Triggers re-render?** | Yes (when parent updates) | Yes (when setter is called) |
| **Analogy** | Date of birth on ID card | Bank balance |

```jsx
// Props - from outside, read-only
function UserCard({ name }) {
  return <h3>{name}</h3>;  // can display, cannot change
}

// State - inside, can change
function Counter() {
  const [count, setCount] = useState(0);
  return <h3>Count: {count}</h3>;  // updates automatically
}
```

---

## 2. useState Hook

### What is a Hook?
A Hook is a special function that lets you use React features inside a functional component. `useState` gives your component **memory** — it can remember a value between renders.

### Syntax

```jsx
import { useState } from 'react';

const [value, setValue] = useState(initialValue);
//     ^^^^^  ^^^^^^^^            ^^^^^^^^^^^^
//   current   setter fn           starting value
```

`useState` returns an **array of exactly 2 items** — we use array destructuring (from JS Part 3) to name them.

### Basic Counter

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### ⚠️ Critical Rule — Never Mutate State Directly

```jsx
// ❌ WRONG — does NOT trigger re-render
count = count + 1;

// ✅ CORRECT — always use the setter function
setCount(count + 1);
```

### Multiple State Variables

```jsx
function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  }

  return (
    <button onClick={handleLike}
      style={{ background: liked ? '#e0245e' : '#f0f0f0' }}>
      {liked ? '♥' : '♡'} {likes} Likes
    </button>
  );
}
```

### Functional Update Form

Use when new state **depends on the previous state**:

```jsx
// ❌ Stale state problem
function handleTripleClick() {
  setCount(count + 1);  // all three use same stale value
  setCount(count + 1);  // result: only +1 total
  setCount(count + 1);
}

// ✅ Functional update — always gets latest value
function handleTripleClick() {
  setCount(prev => prev + 1);  // result: +3 total
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

> **Rule:** When new state depends on previous state → use `setState(prev => ...)`. When setting an unrelated new value → direct form is fine.

---

## 3. Event Handling

### React vs HTML Events

```jsx
// HTML (wrong in React)
<button onclick="handleClick()">Click</button>

// React — camelCase, pass function reference (no brackets)
<button onClick={handleClick}>Click</button>

// With arguments — wrap in arrow function
<button onClick={() => handleClick(someId)}>Click</button>
```

### Common Events

| Event | Use Case |
|-------|----------|
| `onClick` | Button clicks, toggles |
| `onChange` | Input value changes |
| `onSubmit` | Form submission |
| `onKeyDown` | Keyboard key pressed |
| `onMouseEnter` / `onMouseLeave` | Hover effects |
| `onFocus` / `onBlur` | Input focus states |

### ⚠️ Common Mistake

```jsx
// ❌ WRONG — calls immediately during render
<button onClick={handleClick()}>Click</button>

// ✅ CORRECT — passes reference, calls on click
<button onClick={handleClick}>Click</button>

// ✅ CORRECT — with argument, wrap in arrow
<button onClick={() => handleClick(id)}>Click</button>
```

### The Event Object

```jsx
function KeyTracker() {
  const [lastKey, setLastKey] = useState('');

  function handleKeyDown(event) {
    console.log(event.key);      // 'a', 'Enter', 'ArrowUp'
    console.log(event.keyCode);  // numeric key code
    setLastKey(event.key);
  }

  return (
    <input onKeyDown={handleKeyDown} placeholder="Press any key..." />
  );
}
```

### Preventing Default Behaviour

```jsx
function SearchForm() {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();  // stops page reload
    console.log('Searching for:', query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}
```

---

## 4. Controlled Components & Forms

A **controlled component** is an input whose value is controlled by React state, not the DOM.

### Single Input

```jsx
function NameInput() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={name}                              // controlled by state
        onChange={(e) => setName(e.target.value)} // updates on every keystroke
        placeholder="Enter your name"
      />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
}
```

**Data flow:** User types → `onChange` fires → `setName(e.target.value)` → state updates → React re-renders → input shows new value.

### Multi-field Form with Validation

```jsx
import { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  // One handler for all inputs — uses e.target.name
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,        // spread existing fields (JS Part 3)
      [name]: value   // update only the changed field
    }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim())         newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (formData.password.length < 6)  newErrors.password = 'Min 6 characters';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) return <h2>Welcome, {formData.name}!</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"     value={formData.name}     onChange={handleChange} placeholder="Name" />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <input name="email"    value={formData.email}    onChange={handleChange} placeholder="Email" />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <button type="submit">Register</button>
    </form>
  );
}
```

> **JS Connection:** `setFormData(prev => ({ ...prev, [name]: value }))` uses the **spread operator** and **computed property names** from JS Part 3.

---

## 5. Conditional Rendering

### Pattern 1 — Ternary (A or B)

```jsx
// Show one thing or another
{isLoggedIn
  ? <h2>Welcome back! 👋</h2>
  : <h2>Please login</h2>
}
```

### Pattern 2 — Short-circuit && (something or nothing)

```jsx
// Show something or nothing
{count > 0 && <span>{count} notifications</span>}
```

> ⚠️ **Never** use `0 && <Component />`. When count is `0`, React renders the number `0` on screen. Always use `count > 0 &&`.

### Pattern 3 — Early Return (guard clauses)

```jsx
function UserProfile({ user }) {
  if (!user)         return <p>No user found.</p>;
  if (user.isBanned) return <p>Account suspended.</p>;

  // Main render — only reaches here if all checks pass
  return <div><h2>{user.name}</h2></div>;
}
```

### Combining Patterns

```jsx
function ProductList({ products, isLoading }) {
  if (isLoading)             return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

---

## 6. State Patterns — Objects & Arrays

React uses **shallow comparison** to detect changes. If the reference is the same, React skips re-render. Always create a **new reference**.

### Object State

```jsx
const [user, setUser] = useState({ name: 'Rahul', age: 22 });

// ❌ WRONG — mutates same reference, no re-render
user.age = 23;
setUser(user);

// ✅ CORRECT — new object with spread
setUser({ ...user, age: 23 });
```

### Array State

```jsx
const [items, setItems] = useState(['apple', 'mango']);

// ❌ WRONG
items.push('banana');
setItems(items);

// ✅ Add item
setItems([...items, 'banana']);

// ✅ Remove item
setItems(items.filter(i => i !== 'apple'));

// ✅ Update item
setItems(items.map(i => i === 'apple' ? 'grape' : i));
```

> **JS Connection:** All these patterns use **spread**, **filter**, and **map** from JS Part 3.

---

## 7. Mini Project — Interactive Todo App

Full working code. Two components in one file for simplicity.

```jsx
// src/components/TodoApp.jsx
import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 16px', background: 'white', borderRadius: '8px',
      marginBottom: '8px', opacity: todo.completed ? 0.6 : 1
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{
        flex: 1,
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#999' : '#1a1a18'
      }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}
        style={{ background: 'none', border: 'none', color: '#cc3300', cursor: 'pointer', fontSize: '18px' }}>
        ×
      </button>
    </div>
  );
}

function TodoApp() {
  const [todos, setTodos]   = useState([
    { id: 1, text: 'Learn React useState', completed: true  },
    { id: 2, text: 'Build a Todo app',     completed: false },
    { id: 3, text: 'Learn useEffect',      completed: false },
  ]);
  const [input, setInput]   = useState('');
  const [filter, setFilter] = useState('all');

  function addTodo(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active')    return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount    = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t =>  t.completed).length;

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 16px' }}>
      <h1>My Todos</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        {activeCount} remaining · {completedCount} done
      </p>

      {/* Add form */}
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px' }}
        />
        <button type="submit"
          style={{ padding: '10px 20px', background: '#0088AA', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['all', 'active', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px', border: 'none', borderRadius: '99px', cursor: 'pointer',
              background: filter === f ? '#0088AA' : '#f0f0f0',
              color: filter === f ? 'white' : '#666',
              textTransform: 'capitalize'
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Todo list */}
      {filteredTodos.length === 0
        ? <p style={{ color: '#999', textAlign: 'center', padding: '32px' }}>No tasks</p>
        : filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))
      }
    </div>
  );
}

export default TodoApp;
```

### Key Concepts Used in This Project

| Feature | Where Used |
|---------|-----------|
| `useState` | todos, input, filter |
| Controlled input | Add task input field |
| `event.preventDefault()` | addTodo form handler |
| Functional update `prev =>` | addTodo, toggleTodo, deleteTodo |
| Spread operator | addTodo (new array), toggleTodo (new object) |
| `array.map()` | Render todo list, toggleTodo, filter tabs |
| `array.filter()` | deleteTodo, filteredTodos, counts |
| Conditional rendering `&&` | Empty state message |
| Ternary | Strikethrough style, button colours |
| Props as functions | onToggle, onDelete passed to TodoItem |

---

## 8. Interview Questions

**Q: What is the difference between props and state?**  
A: Props are read-only data passed from parent to child. State is internal data a component owns and can change. When state changes, React re-renders the component automatically.

---

**Q: What is useState?**  
A: `useState` is a React Hook that adds state to a functional component. It returns an array: `[currentValue, setterFunction]`. When the setter is called with a new value, React re-renders the component.

---

**Q: Why can't you mutate state directly?**  
A: React uses shallow comparison (===) to detect changes. If you mutate an object or array directly, the reference stays the same, React thinks nothing changed, and skips the re-render. Always create a new reference using spread or non-mutating array methods.

---

**Q: What is a controlled component?**  
A: A controlled component is a form input whose value is controlled by React state via the `value` prop and an `onChange` handler. React is the single source of truth for the input's value.

---

**Q: What is event.preventDefault() and when do you use it?**  
A: It stops the browser's default behaviour for an event. Most commonly used to stop form submission from reloading the page. Call it as the first line inside your onSubmit handler.

---

**Q: What are the patterns for conditional rendering in React?**  
A: Three patterns. Ternary (`condition ? A : B`) for showing one thing or another. Short-circuit (`condition && A`) for showing something or nothing — never use `0 && A`. Early return (`if (!condition) return <Fallback />`) for guard clauses.

---

**Q: What is the functional update form of useState?**  
A: `setState(prev => prev + 1)` instead of `setState(value + 1)`. Use it when the new state depends on the previous state. It guarantees you always get the latest state value, avoiding stale state bugs in batched updates.

---

## 9. Quick Reference Cheat Sheet

```jsx
// useState
const [count, setCount] = useState(0);
setCount(42);               // direct
setCount(prev => prev + 1); // functional (use when depending on prev)

// Events
<button onClick={handler}>         // reference
<button onClick={() => fn(arg)}>   // with argument
<form onSubmit={handleSubmit}>     // form
event.preventDefault();            // stop default

// Controlled input
<input value={name} onChange={e => setName(e.target.value)} />

// Object state update
setUser(prev => ({ ...prev, age: 23 }));

// Array state updates
setItems(prev => [...prev, newItem]);          // add
setItems(prev => prev.filter(i => i.id !== id)); // remove
setItems(prev => prev.map(i =>                 // update
  i.id === id ? { ...i, done: true } : i
));

// Conditional rendering
{isLoggedIn ? <Dashboard /> : <Login />}  // ternary
{hasError && <ErrorMsg />}                // && (never 0 &&)
if (!user) return <p>Not found</p>;       // early return
```

---

## What's Next

**React Video 3** covers:
- `useEffect` — running side effects
- Fetching data from a real API inside React
- Loading and error states
- Dependency array — when useEffect runs
- Rebuilding the User Dashboard in React

---

*Part of the Web Dev Series — [YouTube Channel Link]*  
*Questions? Drop a comment on the video or open an issue.*
