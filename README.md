# PlacementSeries

Code for the Playlist: [YouTube Playlist](https://www.youtube.com/playlist?list=PL-vKBpWiirxm9FOZQf-EyzF9brITtItrM)

---

## HTML & CSS

| Topic | Notes | Code |
|-------|-------|------|
| HTML Basics, CSS (Box Model, Flexbox, Grid), Responsive Design, Form Styling, Interview Questions | [notes.md](HTML-CSS/notes.md) | [index.html](HTML-CSS/index.html), [style.css](HTML-CSS/style.css) |

---

## JavaScript

| # | Topic | Notes | Code |
|---|-------|-------|------|
| 1 | Variables (`var`, `let`, `const`), Hoisting, TDZ, Scoping | [notes.md](Javascript/1-Vars/notes.md) | [demo.js](Javascript/1-Vars/demo.js) |
| 2 | DOM Manipulation (`querySelector`, Events, `preventDefault`, Event Bubbling) | [notes.md](Javascript/2-DOM-manupulation-basics/notes.md) | [index.js](Javascript/2-DOM-manupulation-basics/index.js) |
| 3 | Data Types, Operators, Loops, Conditions, Functions, Scope & Hoisting | [notes.md](Javascript/3-data-types-loops-conditions-functions/notes.md) | [index.js](Javascript/3-data-types-loops-conditions-functions/index.js), [conditions.js](Javascript/3-data-types-loops-conditions-functions/conditions.js), [function.js](Javascript/3-data-types-loops-conditions-functions/function.js), [loops.js](Javascript/3-data-types-loops-conditions-functions/loops.js), [scope-and-hoisting.js](Javascript/3-data-types-loops-conditions-functions/scope-and-hoisting.js) |
| 4 | Arrays, Array Methods (`map`, `filter`, `reduce` etc.), Objects, Destructuring, Spread/Rest, Template Literals, JSON | [notes.md](Javascript/4-Array-Object-ModernJsSyntax/notes.md) | [array.js](Javascript/4-Array-Object-ModernJsSyntax/array.js), [array-methods.js](Javascript/4-Array-Object-ModernJsSyntax/array-methods.js), [js-objects.js](Javascript/4-Array-Object-ModernJsSyntax/js-objects.js), [modern-js.js](Javascript/4-Array-Object-ModernJsSyntax/modern-js.js) |
| 5 | Closures, `this` Keyword, `call`/`apply`/`bind`, Prototypes, Classes, Error Handling | [notes.md](Javascript/notes.md#-folder-5-closures-this-keyword-and-object-oriented-javascript) | [closures.js](Javascript/5-Closure-this/closures.js), [this-keyword.js](Javascript/5-Closure-this/this-keyword.js), [call-apply-bind.js](Javascript/5-Closure-this/call-apply-bind.js), [prototypes.js](Javascript/5-Closure-this/prototypes.js), [class-object.js](Javascript/5-Closure-this/class-object.js), [try-catch.js](Javascript/5-Closure-this/try-catch.js) |
| 6 | Built-in Methods: String, Number, Math, Date | [notes.md](Javascript/notes.md#-folder-6-built-in-methods-string-number-math-date) | [string-methods.js](Javascript/6-Inbuild-methods/string-methods.js), [numbers.js](Javascript/6-Inbuild-methods/numbers.js), [math.js](Javascript/6-Inbuild-methods/math.js), [dates.js](Javascript/6-Inbuild-methods/dates.js) |
| 7 | Async JS: `setTimeout`/`setInterval`, Promises, `async`/`await`, Fetch API | [notes.md](Javascript/notes.md#-folder-7-asynchronous-javascript) | [setTimeout-setInterval.js](Javascript/7-async/setTimeout-setInterval.js), [promises.js](Javascript/7-async/promises.js), [async-await.js](Javascript/7-async/async-await.js), [fetch.js](Javascript/7-async/fetch.js) |
| 8 | Capstone Project: User Dashboard (DOM + Async + Arrays) | [notes.md](Javascript/notes.md#-folder-8-user-dashboard-capstone-project) | [user-dashboard.html](Javascript/8-user-dasboard/user-dashboard.html) |

**Full Reference:** [Javascript/notes.md](Javascript/notes.md) (covers topics 5–8 in detail)

---

## React

### Part 1: Introduction, JSX, Components & Props

| Topic | Notes | Code |
|-------|-------|------|
| What is React, Virtual DOM, Vite Setup | [react-01-introduction.md](React/part-1/notes/react-01-introduction.md) | — |
| JSX Rules (5 rules) | [1-jsx-rules.js](React/part-1/notes/1-jsx-rules.js) | — |
| Components (Functional, Arrow) & Props (Read-only, Default, Spread) | [2-components.js](React/part-1/notes/2-components.js) | [ProductCard.jsx](React/part-1/my-first-react-app/src/components/ProductCard.jsx), [ProfileCard.jsx](React/part-1/my-first-react-app/src/components/ProfileCard.jsx), [Avatar.jsx](React/part-1/my-first-react-app/src/components/Avatar.jsx), [UserInfo.jsx](React/part-1/my-first-react-app/src/components/UserInfo.jsx) |
| Rendering Lists (`map`, `key`), Mini Project (Profile Card App) | [react-01-introduction.md](React/part-1/notes/react-01-introduction.md) | [App.jsx](React/part-1/my-first-react-app/src/App.jsx) |

### Part 2: useState, Events, Controlled Components & Conditional Rendering

| Topic | Notes | Code |
|-------|-------|------|
| Props vs State, `useState` Hook, Event Handling | [react-02-usestate.md](React/part-2/notes/react-02-usestate.md) | [Counter.jsx](React/part-2/my-first-react-app/src/components/Counter.jsx), [LikeButton.jsx](React/part-2/my-first-react-app/src/components/LikeButton.jsx), [KeyTracker.jsx](React/part-2/my-first-react-app/src/components/KeyTracker.jsx) |
| Controlled Components (Single & Multi-field Forms, Validation) | [react-02-usestate.md](React/part-2/notes/react-02-usestate.md) | [CustomForm.jsx](React/part-2/my-first-react-app/src/components/CustomForm.jsx), [RegistrationForm.jsx](React/part-2/my-first-react-app/src/components/RegistrationForm.jsx) |
| Conditional Rendering (Ternary, Short-circuit `&&`, Early Return) | [react-02-usestate.md](React/part-2/notes/react-02-usestate.md) | [App.jsx](React/part-2/my-first-react-app/src/App.jsx) |
| State Patterns (Object/Array Immutability with Spread/Map/Filter) | [react-02-usestate.md](React/part-2/notes/react-02-usestate.md) | — |
| Mini Project: Todo App (Add, Remove, Toggle, Filter) | [react-02-usestate.md](React/part-2/notes/react-02-usestate.md) | [TodoApp.jsx](React/part-2/todo-app/src/components/TodoApp.jsx) |
| Interview Cheat Sheet | [interview-cheet-sheet.txt](React/part-2/notes/interview-cheet-sheet.txt) | — |
