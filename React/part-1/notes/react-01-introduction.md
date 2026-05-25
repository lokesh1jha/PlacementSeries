# React Video 1 — Introduction, JSX, Components & Props

> **Web Dev Series** | Part of the complete HTML → CSS → JavaScript → React → Node.js roadmap  
> **YouTube:** [Link to video] | **GitHub Repo:** [Your repo link]

---

## Table of Contents

1. [What is React and Why Use It](#1-what-is-react-and-why-use-it)
2. [Setup — Create React App with Vite](#2-setup--create-react-app-with-vite)
3. [Project Structure](#3-project-structure)
4. [JSX — JavaScript XML](#4-jsx--javascript-xml)
5. [Components](#5-components)
6. [Props](#6-props)
7. [Rendering Lists with map()](#7-rendering-lists-with-map)
8. [Mini Project — Profile Card App](#8-mini-project--profile-card-app)
9. [Interview Questions](#9-interview-questions)
10. [Quick Reference Cheat Sheet](#10-quick-reference-cheat-sheet)

---

## 1. What is React and Why Use It

### The Problem with Plain JavaScript

In plain JavaScript, every time your data changes, you manually update the DOM:

```js
// Plain JS - you write this for every single update
function updateLikeCount(tweetId, newCount) {
  const el = document.querySelector(`#tweet-${tweetId} .like-count`);
  el.textContent = newCount;
}

function updateUserName(userId, newName) {
  const els = document.querySelectorAll(`.user-${userId} .username`);
  els.forEach(el => el.textContent = newName);
}
// Imagine 100 different pieces of data - becomes impossible to manage
```

At small scale this works. At real application scale (Twitter feed, e-commerce site, dashboard) — it breaks down completely.

### What React Does Differently

React introduces one core idea: **describe what your UI should look like based on your data. React updates the DOM automatically when data changes.**

```jsx
// React way - you DESCRIBE the UI
// React figures out what changed and updates only that part
function TweetCard({ tweet }) {
  return (
    <div className="tweet">
      <p>{tweet.text}</p>
      <span>{tweet.likes} likes</span>
    </div>
  );
}
// When tweet.likes changes, React updates only the likes span
// You never write getElementById again
```

### Four Core React Concepts

| Concept | What It Is |
|---------|-----------|
| **Components** | Reusable pieces of UI — like LEGO blocks |
| **JSX** | HTML-like syntax inside JavaScript |
| **Props** | Data passed from parent → child component |
| **State** | Data that changes over time inside a component *(Video 2)* |

### Key Facts for Interviews

- React was created by **Facebook** in **2013**
- It is a **library**, not a framework (it only handles the UI layer)
- Uses a **Virtual DOM** — React keeps a copy of the DOM in memory, compares changes, and only updates what actually changed (called **reconciliation**)
- Most popular frontend library in **2026**

---

## 2. Setup — Create React App with Vite

### Prerequisites

```bash
node --version   # v18 or higher required
npm --version    # v9 or higher required
```

> Download Node from [nodejs.org](https://nodejs.org) — install the **LTS** version.

### Create a New React Project

```bash
# Create project (Vite is faster and modern — NOT Create React App)
npm create vite@latest my-react-app -- --template react

# Navigate into the project
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Why Vite and NOT Create React App?

| | Vite | Create React App (CRA) |
|---|---|---|
| Speed | Very fast | Slow |
| Status | Actively maintained | **Deprecated** |
| Used in industry | Yes | No (2024+) |
| Build tool | esbuild/Rollup | Webpack |

> **Always use Vite for new React projects in 2026.**

---

## 3. Project Structure

```
my-react-app/
├── node_modules/     ← installed packages (NEVER touch this)
├── public/
│   └── vite.svg      ← static files
├── src/              ← YOUR CODE LIVES HERE
│   ├── assets/       ← images used in components
│   ├── App.css       ← styles for App component
│   ├── App.jsx       ← main App component
│   ├── index.css     ← global styles
│   └── main.jsx      ← entry point
├── index.html        ← the ONE HTML file React uses
├── package.json      ← project info and dependencies
└── vite.config.js    ← Vite configuration
```

### Understanding `main.jsx`

```jsx
// main.jsx - this is where React starts
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**What this does:** Finds the `<div id="root">` in `index.html` and renders the entire React app inside it. This is the **Single Page Application (SPA)** pattern — one HTML file, React controls everything inside it.

---

## 4. JSX — JavaScript XML

JSX lets you write HTML-like code inside JavaScript. It is **not** valid JavaScript — Vite compiles it into `React.createElement()` calls automatically.

```jsx
// WITHOUT JSX (what React compiles to - you never write this)
const element = React.createElement('h1', { className: 'title' }, 'Hello World');

// WITH JSX (what you actually write)
const element = <h1 className="title">Hello World</h1>;
```

### JSX Rules — All 5 Must Be Memorised

#### Rule 1 — Return ONE root element

```jsx
// ❌ WRONG — two root elements
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ CORRECT — wrap in a div
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✅ BETTER — use Fragment to avoid extra div in DOM
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

#### Rule 2 — `className` not `class`

```jsx
// ❌ WRONG
<div class="container">...</div>

// ✅ CORRECT — 'class' is a reserved word in JS
<div className="container">...</div>
```

#### Rule 3 — All tags must be closed

```jsx
// ❌ WRONG
<img src="photo.jpg">
<input type="text">
<br>

// ✅ CORRECT — self-close tags without children
<img src="photo.jpg" />
<input type="text" />
<br />
```

#### Rule 4 — JavaScript expressions inside `{}`

```jsx
const name = 'Lokesh';
const age = 27;
const isLoggedIn = true;

return (
  <div>
    {/* This is a JSX comment */}

    {/* Variable */}
    <h1>Hello, {name}!</h1>

    {/* Expression */}
    <p>Born in {2026 - age}</p>

    {/* Ternary operator — if/else not allowed directly in JSX */}
    <p>{isLoggedIn ? 'Welcome back!' : 'Please login'}</p>

    {/* Function call */}
    <p>{name.toUpperCase()}</p>
  </div>
);
```

> ⚠️ You **cannot** use `if/else` or `for` loops directly inside JSX return. Use ternary operators and `array.map()` instead.

#### Rule 5 — Inline styles as objects with camelCase

```jsx
// ❌ WRONG — string styles don't work in JSX
<p style="color: red; font-size: 16px">Text</p>

// ✅ CORRECT — style takes a JS object, camelCase properties
<p style={{ color: 'red', fontSize: '16px' }}>Text</p>

// ✅ CLEANER — define style object separately
const titleStyle = {
  color: '#1a1a18',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px'
};

<h1 style={titleStyle}>Page Title</h1>
```

> 💡 The double curly braces `style={{ }}` — outer `{}` is JSX (JavaScript expression), inner `{}` is a JavaScript object literal.

---

## 5. Components

A component is a **JavaScript function that returns JSX**. It is a reusable, independent piece of UI.

### Defining a Component

```jsx
// Function declaration style
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Arrow function style (most common in real projects)
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};

// Shorthand — single expression, skip return and braces
const Greeting = () => <h1>Hello, World!</h1>;
```

> ⚠️ Component names **MUST start with a capital letter**.  
> `<greeting />` = HTML tag. `<Greeting />` = React component.

### Exporting and Importing Components

```jsx
// Header.jsx — define and export
function Header() {
  return (
    <header>
      <h1>My App</h1>
    </header>
  );
}

export default Header;  // ← always export at the bottom
```

```jsx
// App.jsx — import and use
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />   {/* use it like an HTML tag */}
      <main>...</main>
    </div>
  );
}

export default App;
```

### Component File Structure (Best Practice)

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── UserCard.jsx
│   └── Button.jsx
├── App.jsx
└── main.jsx
```

One component per file. All components in a `components/` folder inside `src/`.

### Component Tree

```
App
├── Header
├── Main
│   ├── HeroSection
│   ├── ProductList
│   │   ├── ProductCard
│   │   ├── ProductCard
│   │   └── ProductCard   ← same component, used 3 times
│   └── Newsletter
└── Footer
```

Write once, reuse anywhere.

---

## 6. Props

Props (properties) are how you **pass data from a parent component to a child component**. They work exactly like function arguments.

### Passing Props

```jsx
// Parent passes props as attributes
<UserCard
  name="Rahul Sharma"
  role="Frontend Developer"
  city="Delhi"
  isOnline={true}
/>
```

### Receiving Props

```jsx
// Child receives props as a parameter object
// Use destructuring (from JS Part 3) to extract values

function UserCard({ name, role, city, isOnline }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{role}</p>
      <p>{city}</p>
      <span>{isOnline ? '🟢 Online' : '⚫ Offline'}</span>
    </div>
  );
}
```

### Props Are Read-Only

```jsx
function UserCard({ name }) {
  // ❌ NEVER modify props
  // name = 'Different name';  // Error!

  // ✅ Use props as-is
  return <h3>{name}</h3>;
}
```

> Props flow **one way only** — parent → child. If you need to change data, that is what **state** is for (Video 2).

### Default Props

```jsx
function Button({ text = 'Click me', color = 'blue', disabled = false }) {
  return (
    <button
      disabled={disabled}
      style={{ background: color, color: 'white', padding: '8px 16px' }}
    >
      {text}
    </button>
  );
}

// Usage
<Button />                           // 'Click me', blue
<Button text="Submit" />             // 'Submit', blue
<Button text="Delete" color="red" /> // 'Delete', red
```

### Spread Props

```jsx
const buttonConfig = { text: 'Save', color: 'green' };

// Spread an object as props (from JS Part 3 — spread operator)
<Button {...buttonConfig} />
// Same as: <Button text="Save" color="green" />
```

---

## 7. Rendering Lists with `map()`

The most common React pattern — convert an array of data into an array of components.

```jsx
const users = [
  { id: 1, name: 'Rahul',  role: 'Frontend Dev' },
  { id: 2, name: 'Priya',  role: 'Backend Dev'  },
  { id: 3, name: 'Ankit',  role: 'Full Stack'   },
];

function App() {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          role={user.role}
        />
      ))}
    </div>
  );
}
```

> Uses `Array.map()` from JavaScript — exactly what was covered in JS Part 3.

### The `key` Prop

```jsx
// ❌ Missing key — React shows warning
{users.map(user => <UserCard name={user.name} />)}

// ✅ With key
{users.map(user => <UserCard key={user.id} name={user.name} />)}
```

**Why is `key` required?**  
When the list changes (add/remove/reorder), React uses `key` to identify which items changed and **only re-renders those** — not the whole list.

**Rules for `key`:**
- Must be **unique** among sibling elements
- Must be **stable** — do not change between renders
- Use **IDs from your data** when available
- ⚠️ Avoid using array index as key if the list order can change

---

## 8. Mini Project — Profile Card App

Complete working code from the video. Three files.

### `src/components/SkillBadge.jsx`

```jsx
function SkillBadge({ skill }) {
  return (
    <span style={{
      background: '#E0F6FF',
      color: '#0088AA',
      padding: '3px 10px',
      borderRadius: '99px',
      fontSize: '12px',
      fontWeight: '500',
      marginRight: '6px',
      marginBottom: '6px',
      display: 'inline-block'
    }}>
      {skill}
    </span>
  );
}

export default SkillBadge;
```

### `src/components/ProfileCard.jsx`

```jsx
import SkillBadge from './SkillBadge';

function ProfileCard({ name, role, avatar, skills, github, available }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e8e6df',
      borderRadius: '16px',
      padding: '24px',
      width: '280px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>

      {/* Avatar and name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <img
          src={avatar}
          alt={name}
          style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h3 style={{ margin: 0, fontSize: '16px' }}>{name}</h3>
          <p style={{ margin: '2px 0 0', color: '#666', fontSize: '13px' }}>{role}</p>
        </div>
      </div>

      {/* Availability badge */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{
          background: available ? '#D4EDDA' : '#F8D7DA',
          color: available ? '#155724' : '#721C24',
          padding: '3px 10px',
          borderRadius: '99px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {available ? 'Open to work' : 'Not available'}
        </span>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '16px' }}>
        {skills.map(skill => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        style={{ color: '#0088AA', fontSize: '13px', textDecoration: 'none' }}
      >
        View GitHub →
      </a>
    </div>
  );
}

export default ProfileCard;
```

### `src/App.jsx`

```jsx
import ProfileCard from './components/ProfileCard';

const developers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    skills: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com',
    available: true
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    skills: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    available: false
  },
  {
    id: 3,
    name: 'Ankit Kumar',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['Node.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com',
    available: true
  },
  {
    id: 4,
    name: 'Sneha Patel',
    role: 'React Developer',
    avatar: 'https://i.pravatar.cc/150?img=9',
    skills: ['React', 'TypeScript', 'Tailwind'],
    github: 'https://github.com',
    available: true
  },
];

function App() {
  return (
    <div style={{ background: '#f9f9f7', minHeight: '100vh', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Developer Profiles</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        {developers.length} developers · {developers.filter(d => d.available).length} available
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {developers.map(dev => (
          <ProfileCard
            key={dev.id}
            name={dev.name}
            role={dev.role}
            avatar={dev.avatar}
            skills={dev.skills}
            github={dev.github}
            available={dev.available}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

---

## 9. Interview Questions

**Q: What is React?**  
A: React is a JavaScript library for building user interfaces. It is component-based — UIs are split into small reusable pieces. React uses a virtual DOM to efficiently update only the parts of the real DOM that change. Created by Facebook in 2013, it is the most widely used frontend library.

---

**Q: What is JSX?**  
A: JSX is a syntax extension for JavaScript that lets you write HTML-like code inside JS. It compiles to `React.createElement()` calls via tools like Vite/Babel. Key rules: use `className` instead of `class`, all tags must be closed, return one root element, embed JavaScript with `{}`, and use style as a camelCase object.

---

**Q: What is a component in React?**  
A: A component is a JavaScript function that returns JSX. It is a reusable, independent piece of UI. Component names must start with a capital letter. Components can be nested to build complex UIs from small, manageable pieces.

---

**Q: What are props in React?**  
A: Props (properties) are how data is passed from a parent component to a child. They are read-only — a component cannot modify its own props. They work like function arguments. Data flows one way: parent → child.

---

**Q: Why does React need the `key` prop when rendering lists?**  
A: React uses `key` to identify which items in a list have changed, been added, or removed. Without `key`, React cannot efficiently update the list and re-renders everything. `key` must be unique among siblings and stable between renders.

---

**Q: What is the Virtual DOM?**  
A: The Virtual DOM is an in-memory representation of the real DOM. When state or props change, React creates a new Virtual DOM, compares it with the previous one (called **diffing**), and only updates the parts of the real DOM that actually changed (called **reconciliation**). This makes updates much faster than re-rendering the whole page.

---

**Q: What is the difference between a library and a framework?**  
A: A library (like React) handles one specific concern — React only handles the UI. You decide the rest of your architecture. A framework (like Angular) provides a complete structure for the entire app and enforces conventions. React is a library, not a framework.

---

## 10. Quick Reference Cheat Sheet

```jsx
// Create React app
npm create vite@latest app-name -- --template react

// Component structure
const MyComponent = () => {
  return (
    <div className="container">
      <h1>Hello</h1>
    </div>
  );
};
export default MyComponent;

// JSX rules
className     // not class
<img />       // self-close all tags
<>{...}</>    // Fragment for multiple root elements
{{ }}         // inline style object (double braces)
{expression}  // any JS expression inside curly braces

// Props — passing
<Card name="Rahul" age={22} isActive={true} />

// Props — receiving
const Card = ({ name, age, isActive }) => { ... }

// Default props
const Button = ({ text = 'Click', color = 'blue' }) => { ... }

// Rendering a list
{items.map(item => (
  <Card key={item.id} name={item.name} />
))}

// Spread props
const config = { text: 'Save', color: 'green' };
<Button {...config} />
```

---

## What's Next

**React Video 2** covers:
- `useState` hook — adding interactivity
- Handling events — onClick, onChange, onSubmit
- Controlled components — form inputs tied to state
- Conditional rendering patterns
- Building an interactive Todo app

---

*Part of the Web Dev Series — [YouTube Channel Link]*  
*Questions? Drop a comment on the video or open an issue on this repo.*
