# Web Dev Series #14 — Express Basics

> **Node.js & Express Series — Video 2 of 5** · Server Setup · Routes · Middleware · REST Conventions

---

## 📋 What We Cover

- Why Express exists — what it removes vs. raw Node `http` (Video 1)
- **Setting up an Express server** — `app.get`, `app.listen`
- **Routing** — route parameters (`req.params`) vs. query parameters (`req.query`)
- **Middleware** — `app.use()`, `next()`, `express.json()`, custom middleware
- **REST conventions** — resource naming, HTTP verbs, status codes
- **Mini Project** — a small Express "Quotes API" with routing, middleware, and proper status codes

---

## ✅ Prerequisites

- Completed [Node.js Video 1 — Node.js Basics](./node-01-basics.md) (#13) — modules, `fs`, `path`, `npm`
- Comfortable with `async`/`await` and JSON from the JS/React series
- Node.js installed (LTS recommended — 18, 20, or 22)

---

## ⚙️ Setup

```bash
mkdir express-basics
cd express-basics
npm init -y
npm install express
npm install --save-dev nodemon
```

---

## Section 1 — Why Express? From Raw `http` to a Framework

In Video 1, raw `http` meant manual `if/else` chains on `req.url`, manual headers, manual `res.end()`. Express is a lightweight, **unopinionated** web framework on top of that same `http` module — clean routing methods, a middleware pipeline, and convenience methods like `res.json()`/`res.send()`.

```bash
npm ls express
# node-basics-server@1.0.0
# └── express@4.19.2
```

> 💡 **Analogy** — Raw `http` + `if/else` is assembling furniture with a hammer and hand saw. Express is the power-tool kit: same final furniture, far less manual effort.

> ℹ️ **Tip** — Express calls itself "fast, unopinionated, minimalist." It won't force a folder structure on you — that's freedom, but also your responsibility as the app grows.

> ⚠️ **Watch Out** — "Unopinionated" doesn't mean "no rules." Plenty of fresher projects collapse into one 800-line `server.js` because nobody imposed structure.

> 🔗 **JS/Node Connection** — Every Express route handler uses the exact same `(req, res)` shape as `http.createServer()` from Video 1. Express wraps what you already know.

> 🎯 **Interview Q:** *What is Express.js, and why use it instead of the built-in `http` module?*
> **A:** Express is a minimal, unopinionated Node.js web framework built on `http`. It provides routing methods, a middleware pipeline, and convenience methods (`res.json()`, `res.send()`) that remove the boilerplate of manually parsing URLs, setting headers, and handling routes by hand.

---

## Section 2 — Setting Up an Express Server

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**`package.json` — run with nodemon for auto-restart:**
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

> 💡 **Analogy** — `app.listen()` is opening the shop's front door at a specific address (port). The server exists in code the moment it's written, but it isn't open for business until `listen()` runs.

> ⚠️ **Watch Out** — `EADDRINUSE` means another process already holds that port. Express also doesn't auto-end responses — every route still needs `res.send()`, `res.json()`, or `res.end()`.

> ℹ️ **Tip** — Use `npm run dev` (nodemon) while developing — it restarts the server automatically on save.

> 🔗 **JS/Node Connection** — Identical to `http.createServer()` + `.listen()` from Video 1 — `app.get('/', handler)` replaces the manual `if (req.url === '/' && req.method === 'GET')` check.

> 🎯 **Interview Q:** *How do you create and start an Express server?*
> **A:** Require `express`, call `express()` for an app instance, define routes with `app.get/post/put/delete`, then call `app.listen(port, callback)`.

---

## Section 3 — Routing: Route Params & Query Params

```js
// Route parameters
app.get('/users/:id', (req, res) => {
  res.send(`You asked for user ${req.params.id}`);
});
// GET /users/42  ->  "You asked for user 42"
// req.params = { id: '42' }   <-- always a STRING
```

```js
// Query parameters
app.get('/search', (req, res) => {
  const term = req.query.q;
  res.send(`Searching for: ${term}`);
});
// GET /search?q=nodejs  ->  "Searching for: nodejs"
// req.query = { q: 'nodejs' }
```

Route order matters — Express matches top to bottom, first match wins. Put specific, hardcoded routes (`/users/me`) **above** dynamic ones (`/users/:id`).

> 💡 **Analogy** — Route params are blanks in a fill-in-the-blank URL template. Whatever value lands there gets captured automatically into `req.params` — no manual string-splitting.

> ⚠️ **Watch Out** — `req.params` values are always **strings**, even if they look numeric. Convert with `Number()`/`parseInt()` before math or comparisons.

> 🔗 **JS/Node Connection** — Route params are the backend twin of React Router's dynamic segments (Video 11). `useParams()` on the frontend, `req.params` on the backend — same idea, opposite sides.

> 🎯 **Interview Q:** *What's the difference between route parameters and query parameters in Express?*
> **A:** Route parameters (`:id`) are part of the URL path and required for the route to match — accessed via `req.params`. Query parameters are optional key-value pairs after `?` — accessed via `req.query`.

---

## Section 4 — Middleware: `app.use()`, `next()`, `express.json()`

A middleware function sits between the request and the final handler: `(req, res, next)`. It can inspect/modify the request, run side effects (logging), then call `next()` to pass control forward — or end the response itself.

```js
const express = require('express');
const app = express();

app.use(express.json()); // must come BEFORE routes that read req.body

app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
});
```

**Custom middleware — a request logger:**
```js
function requestLogger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next(); // without this, the request hangs forever
}

app.use(requestLogger);
```

Middleware runs in registration order — logging first, body-parsing before any route reading `req.body`.

> 💡 **Analogy** — Middleware is an airport security checkpoint. Each checkpoint inspects/processes you before letting you continue toward your gate (the route handler). Skip `next()`, and you're stuck at that checkpoint forever.

> ⚠️ **Watch Out** — Forgetting `next()` is the #1 "my server just hangs" bug. Forgetting `app.use(express.json())` silently leaves `req.body` as `undefined` on every POST/PUT.

> ℹ️ **Tip** — Apply middleware globally with `app.use(fn)`, or scope it to one route: `app.get('/admin', requireAuth, handler)`.

> 🔗 **JS/Node Connection** — Chaining via `next()` is conceptually similar to chaining `.then()` on promises — each link decides whether/when to hand off control. Difference: middleware runs within a single request's lifecycle.

> 🎯 **Interview Q:** *What is middleware in Express, and what does calling `next()` do?*
> **A:** Functions with signature `(req, res, next)` that run during the request-response cycle — they can modify `req`/`res` or perform side effects like logging. `next()` passes control to the next middleware/handler; without it, the request hangs.

---

## Section 5 — REST Conventions & Status Codes

REST treats URLs as nouns (resources); the HTTP method expresses the action.

```bash
// GOOD - noun-based resource, verb implied by HTTP method
GET    /quotes        -> list all quotes
GET    /quotes/5      -> get quote with id 5
POST   /quotes        -> create a new quote
PUT    /quotes/5      -> update quote 5
DELETE /quotes/5      -> delete quote 5

// BAD - verb baked into the URL (anti-pattern)
GET    /getAllQuotes
POST   /createNewQuote
GET    /deleteQuote?id=5
```

```js
app.get('/quotes/:id', (req, res) => {
  const quote = findQuoteById(req.params.id);

  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  res.status(200).json(quote);
});
```

> 💡 **Analogy** — REST conventions are like a restaurant chain's standardized menu layout — learn it once, predict the shape of any well-designed REST API instantly.

> ⚠️ **Watch Out** — Returning `200 OK` for every response (including errors) breaks any client that checks status codes. Avoid verbs baked into URLs — that's the HTTP method's job.

> ℹ️ **Tip** — Memorize cold: `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.

> 🔗 **JS/Node Connection** — `res.json()`/`res.status()` are clean wrappers around the manual `JSON.stringify()` + `res.end()` work from Video 1's mini project.

> 🎯 **Interview Q:** *What status code would you return when a POST successfully creates a new resource, and why?*
> **A:** `201 Created` — signals a new resource now exists on the server, often paired with the created resource in the response body.

---

## Mini Project — A Small Express Quotes API

Combines routing, route params, middleware, and REST-style status codes. Full CRUD (`PUT`/`DELETE`) and Postman testing are the focus of Video 3 — today: clean `GET` and `POST`.

```bash
mkdir quotes-api
cd quotes-api
npm init -y
npm install express
npm install --save-dev nodemon
```

**`server.js`:**
```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(requestLogger);

let quotes = [
  { id: 1, text: 'Code never lies, comments sometimes do.' },
  { id: 2, text: 'First, solve the problem. Then, write the code.' }
];

// GET /quotes - list all
app.get('/quotes', (req, res) => {
  res.status(200).json(quotes);
});

// GET /quotes/:id - get one
app.get('/quotes/:id', (req, res) => {
  const quote = quotes.find(q => q.id === Number(req.params.id));

  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  res.status(200).json(quote);
});

// POST /quotes - create one
app.post('/quotes', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'text field is required' });
  }

  const newQuote = { id: quotes.length + 1, text };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

app.listen(PORT, () => {
  console.log(`Quotes API running at http://localhost:${PORT}`);
});
```

**Testing with curl:**
```bash
curl http://localhost:3000/quotes

curl http://localhost:3000/quotes/1

curl -X POST http://localhost:3000/quotes \
  -H "Content-Type: application/json" \
  -d '{"text": "Talk is cheap. Show me the code."}'
```

> 💡 **Analogy** — Compare this file's line count to Video 1's `if/else` routing block doing the same job — barely longer, despite adding a second route, a logger, and body parsing.

> ⚠️ **Watch Out** — Missing `Content-Type: application/json` on a POST means `express.json()` won't parse the body — `req.body` stays `undefined`. The in-memory `quotes` array resets on every restart (expected — a real DB arrives in Series 4).

> ℹ️ **Tip** — `400` = the request itself was malformed; `404` = the request was fine but the resource doesn't exist. Don't mix these up.

> 🔗 **JS/Node Connection** — This API is intentionally the exact shape your React app will call starting in Video 4, replacing DevFinder's public GitHub API calls with calls to an API you built yourself — the `useFetch` pattern (Video 10) works unchanged.

> 🎯 **Interview Q:** *Walk me through building a simple REST endpoint in Express that returns a 404 when a resource isn't found.*
> **A:** Define the route with `app.get('/resource/:id', ...)`, look up the item via `req.params.id` (converted to the right type), check if the lookup returned nothing. If so, `res.status(404).json({ error: '...' })` and return immediately; otherwise `res.status(200).json(item)`.

---

## Recap

We moved from raw Node `http` to Express, set up a real server, learned routing with route params and query params, understood middleware and `next()`, locked in REST conventions and status codes, and built a working Quotes API. Next video: full CRUD (`PUT`/`DELETE`) and a hands-on Postman walkthrough.

---

## 🎯 Interview Cheat Sheet

| Term | Definition |
|---|---|
| **Express.js** | Minimal, unopinionated Node.js web framework built on top of the `http` module |
| **app.listen()** | Starts the Express server, binding it to a specific port |
| **app.get/post/put/delete()** | Registers a route handler for a specific HTTP method + path |
| **req.params** | Object holding dynamic route segment values (e.g. `:id`); always strings |
| **req.query** | Object holding key-value pairs from the URL's query string (after `?`) |
| **req.body** | Parsed request body; requires `express.json()` middleware for JSON payloads |
| **Middleware** | A function with signature `(req, res, next)` that runs during the request cycle |
| **next()** | Passes control to the next middleware/route handler; omitting it hangs the request |
| **express.json()** | Built-in middleware that parses JSON request bodies into `req.body` |
| **Route order** | Express matches routes top to bottom; specific routes must precede dynamic ones |
| **REST** | Architectural style treating URLs as nouns (resources) and HTTP methods as verbs |
| **Idempotent** | An operation producing the same result no matter how many times it's repeated (GET, PUT, DELETE) |
| **200 OK** | Standard success response for GET/PUT requests |
| **201 Created** | Success response specifically for POST requests that create a new resource |
| **400 Bad Request** | Client error — the request itself was malformed or missing required data |
| **404 Not Found** | Client error — the request was valid but the resource doesn't exist |
| **500 Internal Server Error** | Generic server-side failure, not the client's fault |
| **res.send() vs res.json()** | `res.send()` sends any type; `res.json()` explicitly serializes and sets JSON headers |
| **Global vs route-level middleware** | `app.use(fn)` runs on every request; passing `fn` as a route argument scopes it to one route |
| **nodemon** | Dev dependency that auto-restarts the server on file changes |

---

## 🔗 Resources

- [Express Official Docs](https://expressjs.com/)
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)
- [MDN — HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Tutorial (restfulapi.net)](https://restfulapi.net/)
- [nodemon Documentation](https://github.com/remy/nodemon)

---

*Web Dev Series — Node.js Video 2 | Next: Node.js Video 3*
