# Web Dev Series #13 — Node.js Basics

> **Node.js & Express Series — Video 1 of 5** · Modules · fs · path · npm & package.json

---

## 📋 What We Cover

- What Node.js actually is (and isn't) — the V8 engine, runtime vs. browser
- **Modules** — CommonJS (`require`/`module.exports`) vs ES Modules (`import`/`export`)
- **fs module** — reading & writing files (sync, callback, and Promise-based)
- **path module** — building safe, cross-platform file paths
- **npm & package.json** — dependencies, devDependencies, semantic versioning, `package-lock.json`
- **Mini Project** — a working HTTP server built with zero external packages

---

## ✅ Prerequisites

- Completed the [JS Series](#) (#0–7) — comfortable with functions, async/await, promises
- Completed the [React Series](#) (#8–12) — comfortable with `import`/`export` syntax, `npm install`
- Node.js installed (LTS recommended — 18, 20, or 22)
- A code editor (VS Code recommended) and a terminal

---

## ⚙️ Setup

```bash
# Confirm Node is installed
node -v

# Create a project folder for today's mini project
mkdir node-basics-server
cd node-basics-server

# Initialize package.json
npm init -y
```

---

## Section 1 — What Is Node.js & Why It Matters

Node.js is **not** a programming language and **not** a framework. It's a **JavaScript runtime** — Chrome's V8 engine pulled out of the browser and packaged with built-in superpowers the browser deliberately withholds from JS: file system access, networking, process control.

```bash
node -v
# v22.11.0

node
> 2 + 2
4
> .exit
```

> 💡 **Analogy** — The V8 engine is like a car engine. In a Toyota it pulls a car; drop the same engine into a boat and it spins a propeller instead. Same engine, different vehicle, different abilities. Node.js does that with V8 — same engine Chrome uses, now powering a server instead of a webpage.

> ℹ️ **Tip** — Always check your Node version with `node -v`. Stick to LTS (even-numbered) versions — 18, 20, 22 — for any real project; they get security patches for years.

> ⚠️ **Watch Out** — The #1 fresher mix-up in interviews: Node.js is a *runtime*, not a framework. Calling it "a framework" is an instant red flag to an interviewer.

> 🔗 **JS Connection** — Everything you already know — variables, functions, `.map()`/`.filter()`, promises, async/await, closures — works identically in Node.js. You're not learning a new language, just a new environment for the one you already know.

> 🎯 **Interview Q:** *What is Node.js, and how is it different from JavaScript running in a browser?*
> **A:** Node.js is a JS runtime built on Chrome's V8 engine that runs JavaScript outside the browser. Browser JS is sandboxed with browser APIs (DOM, fetch); Node.js trades those for system-level abilities — file system, networking, process control.

---

## Section 2 — Modules: `require`/`exports` vs ES Modules

Node's default module system is **CommonJS**. Node also supports **ES Modules** — the same `import`/`export` syntax you already used in every React component.

**CommonJS — `math.js`:**
```js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
```

**CommonJS — `app.js`:**
```js
const { add, subtract } = require('./math');

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
```

**ES Modules — opt in via `package.json`:**
```json
{
  "type": "module"
}
```

**ES Modules — `math.js`:**
```js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

**ES Modules — `app.js`:**
```js
import { add, subtract } from './math.js';

console.log(add(5, 3));
```

> 💡 **Analogy** — Every file is a sealed box of Lego pieces. `module.exports` (or `export`) decides which pieces are allowed to leave the box. `require()`/`import` is someone reaching in and pulling out only the pieces you allowed out.

> ℹ️ **Tip** — Frequently asked at 2–3 YOE level: CommonJS (`require`) loads synchronously and can be called conditionally anywhere in code. ES Modules (`import`) are static — resolved at the top of the file before any code runs — and support async loading.

> ⚠️ **Watch Out** — You cannot mix `require()` and `import` in the same file (syntax error). By default every `.js` file is CommonJS unless you add `"type": "module"` to `package.json` or use the `.mjs` extension.

> 🔗 **JS Connection** — This is exactly the `import`/`export` syntax from every React component since Video 8. `import App from './App'` on the frontend and `import { add } from './math.js'` in Node are the same syntax — only what's on the other side changes.

> 🎯 **Interview Q:** *What's the difference between `require()` and `import` in Node.js, and which does Node use by default?*
> **A:** Node defaults to CommonJS (`require`/`module.exports`). `require()` is synchronous and callable anywhere. `import`/`export` (ESM) is static, resolved at the top of the file, and supports async module loading — opt in via `"type": "module"` or `.mjs`.

---

## Section 3 — The File System: the `fs` Module

`fs` is Node's built-in module for reading and writing files. Every operation comes in three flavors: synchronous (blocking), callback-based async, and Promise-based async (preferred).

**Synchronous (blocking) read:**
```js
const fs = require('fs');

const data = fs.readFileSync('notes.txt', 'utf-8');
console.log(data);
```

**Promise-based (recommended) read:**
```js
const fs = require('fs/promises');

async function readNotes() {
  try {
    const data = await fs.readFile('notes.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error('Could not read file:', err.message);
  }
}

readNotes();
```

**Writing a file:**
```js
const fs = require('fs/promises');

await fs.writeFile('output.txt', 'Hello from Node.js!');
```

> 💡 **Analogy** — A sync `fs` call is a cashier who won't serve anyone else until your entire transaction finishes. An async call is the same cashier starting your transaction, then helping the next person while a colleague finishes bagging your items.

> ⚠️ **Watch Out** — Never use a `*Sync` method inside a server route handler. It blocks Node's single thread completely — the server can't respond to *any* other user while it runs. A very common production bug.

> ℹ️ **Tip** — Async `fs` calls can throw — always wrap them in `try/catch` (or `.catch()`). A missing file or bad path throws a real error your app should handle gracefully.

> 🔗 **JS Connection** — `fs.promises.readFile()` is awaited inside `try/catch` exactly like `fetch()` was in your `useFetch` custom hook (Video 10). Same pattern — only what you're fetching changes: network response vs. file on disk.

> 🎯 **Interview Q:** *What's the difference between `fs.readFile` and `fs.readFileSync`? When does it matter?*
> **A:** `fs.readFileSync` blocks the entire process until the read finishes. `fs.readFile` (callback or Promise-based) is non-blocking. It matters most in servers, where a blocking call freezes the server for every connected user, not just the one who triggered it.

---

## Section 4 — The `path` Module

Windows uses backslashes, Linux/Mac use forward slashes. Hardcoded path strings break across operating systems — `path` solves this.

```js
const path = require('path');

// __dirname = absolute path of the folder containing THIS file
console.log(__dirname);

const filePath = path.join(__dirname, 'data', 'notes.txt');
console.log(filePath);
// Linux/Mac: /home/user/project/data/notes.txt
// Windows:   C:\Users\user\project\data\notes.txt
```

```js
console.log(path.join('folder', '../other', 'file.txt'));
// 'other/file.txt' -> just joins + normalizes segments

console.log(path.resolve('folder', '../other', 'file.txt'));
// '/current/working/dir/other/file.txt' -> always ABSOLUTE
```

> 💡 **Analogy** — `path.join` is like Google Maps using the correct road signs (slashes) for whatever country (OS) you're driving in. `path.resolve` goes further: it always gives the full address starting from the root.

> ℹ️ **Tip** — Wrap any file path that `fs` will use with `path.join(__dirname, ...)` instead of a relative string. Critical from Video 2 onward, once Express serves static files.

> ⚠️ **Watch Out** — `path.join()` just glues + normalizes segments — **not** guaranteed absolute. `path.resolve()` always returns an absolute path, resolved right to left. A common interview trick question.

> 🔗 **JS Connection** — `path` and `fs` are almost always used together. The same `__dirname`-style thinking shows up in frontend build tooling configs (webpack, Vite).

> 🎯 **Interview Q:** *What's the difference between `path.join()` and `path.resolve()`?*
> **A:** `path.join()` combines segments with the correct OS separator and normalizes the result, but isn't guaranteed absolute. `path.resolve()` processes segments right to left and always returns an absolute path, prepending the current working directory if needed.

---

## Section 5 — npm & package.json

npm (**Node Package Manager**) is both a public registry of open-source packages and the CLI tool that installs them.

```bash
npm init -y
```

**Generated `package.json`:**
```json
{
  "name": "node-basics-demo",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

```bash
npm install express
npm install --save-dev nodemon
```

**`package.json` after installing:**
```json
{
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

> 💡 **Analogy** — `package.json` is a recipe card listing ingredients (dependencies) and acceptable version ranges. `package-lock.json` is the grocery receipt — the exact version of every ingredient actually bought, down to nested ones — so anyone following it gets the identical result on any machine.

> ℹ️ **Tip** — Use `npm ci` instead of `npm install` in CI/CD pipelines. It deletes `node_modules` first and installs strictly from `package-lock.json` — faster and 100% reproducible.

> ⚠️ **Watch Out** — Three classic mistakes: committing `node_modules` to Git (always `.gitignore` it), hand-editing `package-lock.json` (let npm manage it), and misreading `^4.19.2` (minor + patch updates allowed) vs `~4.19.2` (patch only).

> 🔗 **JS Connection** — Every `npm install react-router-dom` in the React series used this exact mechanism — same registry, same `package.json` rules.

> 🎯 **Interview Q:** *What's the difference between `dependencies` and `devDependencies`, and what does `package-lock.json` do?*
> **A:** `dependencies` are required to run the app in production (e.g. `express`). `devDependencies` are dev-only tools (e.g. `nodemon`), skipped in a production-only install. `package-lock.json` locks the exact resolved version of every dependency — including nested ones — for reproducible installs.

---

## Mini Project — A Basic HTTP Server

Combine everything above into a real server using only Node's built-in `http` module — no Express yet.

**Step 1 — project setup:**
```bash
mkdir node-basics-server
cd node-basics-server
npm init -y
```

**Step 2 — `index.html`:**
```html
<!DOCTYPE html>
<html>
  <head><title>My First Node Server</title></head>
  <body>
    <h1>Hello from a plain Node.js server!</h1>
    <p>No Express. No framework. Just Node.</p>
  </body>
</html>
```

**Step 3 — `server.js`:**
```js
const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.url === '/') {
    try {
      const filePath = path.join(__dirname, 'index.html');
      const html = await fs.readFile(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Something went wrong reading the page.');
    }

  } else if (req.url === '/about') {
    const payload = {
      project: 'Node Basics Mini Project',
      framework: 'none',
      awesome: true
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Step 4 — add a start script to `package.json`:**
```json
"scripts": {
  "start": "node server.js"
}
```

**Test it:**
```bash
npm start
# Visit http://localhost:3000        -> HTML page
# Visit http://localhost:3000/about  -> raw JSON
# Visit http://localhost:3000/xyz    -> 404 message
```

> 💡 **Analogy** — The `if/else` on `req.url` *is* routing. Express (next video) replaces this block with a clean, declarative API — like swapping hand-signaled traffic for automatic traffic lights.

> ⚠️ **Watch Out** — Forgetting `res.end()` leaves the browser tab spinning forever. Forgetting the `Content-Type` header makes clients misinterpret JSON as plain text.

> ℹ️ **Tip** — `res.writeHead(statusCode, headers)` must come before `res.end()`. Know `200`, `404`, and `500` by heart — more status codes arrive in the CRUD API video.

> 🔗 **JS Connection** — This manual `if (req.url === '/about')` routing is the server-side cousin of React Router (Video 11) — there you mapped URL paths to components on the frontend; here you map them to responses on the backend.

> 🎯 **Interview Q:** *How would you create a basic web server in Node.js without a framework?*
> **A:** Call `http.createServer()` with a callback receiving `(req, res)`, inspect `req.url`/`req.method` to decide the response, set headers/status with `res.writeHead()`, and finish with `res.end()`. Call `server.listen(port)` to start accepting connections.

---

## Recap

With zero external packages, we covered what Node.js is, how to split code with modules (CommonJS + ESM), how to read/write files with `fs`, how to build safe paths with `path`, how `npm`/`package.json` actually work, and built a real HTTP server by hand. Next video: Express — the same goals, a fraction of the code.

---

## 🎯 Interview Cheat Sheet

| Term | Definition |
|---|---|
| **Node.js** | JS runtime built on Chrome's V8 engine that runs JavaScript outside the browser |
| **V8 Engine** | Google's open-source JS engine that compiles JavaScript to machine code |
| **CommonJS** | Node's default module system, using `require()` and `module.exports` |
| **ES Modules (ESM)** | Modern JS module system using `import`/`export`, enabled via `"type": "module"` |
| **module.exports** | Object used to export values from a CommonJS module |
| **require()** | Function used to import a CommonJS module; synchronous, callable anywhere |
| **fs module** | Built-in module for reading, writing, and managing files |
| **fs.readFileSync** | Synchronous (blocking) file read — freezes the event loop until done |
| **fs.promises.readFile** | Promise-based (non-blocking) file read — awaitable, preferred in modern code |
| **path.join()** | Joins path segments using the correct OS separator; not guaranteed absolute |
| **path.resolve()** | Builds an absolute path, resolving segments right to left |
| **\_\_dirname** | Absolute path of the directory containing the current file |
| **npm** | Node Package Manager — CLI tool + public registry for installing packages |
| **package.json** | Manifest file listing project metadata, dependencies, and scripts |
| **package-lock.json** | Locks the exact installed version of every dependency, including nested ones |
| **dependencies** | Packages required to run the app in production |
| **devDependencies** | Packages only needed during development (testing, build tools) |
| **Caret (^) vs Tilde (~)** | `^` allows minor + patch updates; `~` allows only patch updates |
| **npm ci** | Clean install strictly from `package-lock.json` — used in CI/CD pipelines |
| **Event Loop** | Mechanism that lets Node handle async operations on a single thread |
| **Blocking vs Non-blocking** | Whether code execution waits (blocks) for an operation to finish or not |

---

## 🔗 Resources

- [Node.js Official Docs](https://nodejs.org/en/docs)
- [Node.js `fs` module docs](https://nodejs.org/api/fs.html)
- [Node.js `path` module docs](https://nodejs.org/api/path.html)
- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning (semver.org)](https://semver.org/)
- [Node.js Release Schedule (LTS info)](https://nodejs.org/en/about/previous-releases)

---

*Web Dev Series — Node.js Video 1 | Next: Node.js Video 2*
