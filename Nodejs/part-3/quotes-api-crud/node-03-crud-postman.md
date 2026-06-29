# Web Dev Series #15 — CRUD API + Postman

> **Node.js & Express Series — Video 3 of 5** · PUT · DELETE · express.Router() · Postman Testing

---

## 📋 What We Cover

- Recap & completing the CRUD picture — what's left after Video 2 (PUT, DELETE)
- **PUT `/quotes/:id`** — replacing a resource, PUT vs PATCH
- **DELETE `/quotes/:id`** — removing a resource, `204 No Content`
- **Organizing routes** with `express.Router()` instead of one giant `server.js`
- **Postman** — requests, Collections, Environments/Variables
- **Mini Project** — the complete CRUD Quotes API, fully tested in Postman

---

## ✅ Prerequisites

- Completed [Node.js Video 2 — Express Basics](./node-02-express.md) (#14) — Express server, routing, middleware
- The Quotes API from Video 2 (`GET`/`POST` already working)
- [Postman](https://www.postman.com/downloads/) installed (free)

---

## ⚙️ Setup

```bash
# Continue in the quotes-api project from Video 2
cd quotes-api

# Create a routes folder for this video's refactor
mkdir routes
```

---

## Section 1 — Recap & Completing the CRUD Picture

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete, mapping directly to HTTP methods:

| CRUD | HTTP Method |
|---|---|
| Create | POST |
| Read | GET |
| Update | PUT (or PATCH) |
| Delete | DELETE |

We already have Create and Read from Video 2. Today: Update and Delete.

> 💡 **Analogy** — CRUD is like the four things you can do to any folder of files: create a new one, read/open an existing one, edit it, or delete it. Every API resource boils down to combinations of these four actions.

> ℹ️ **Tip** — GET and DELETE are idempotent — repeating them produces the same end state. A well-designed PUT is idempotent too. POST is the odd one out — each call typically creates a new resource.

> ⚠️ **Watch Out** — Plenty of fresher resumes claim "built CRUD APIs" without being able to explain idempotency in an interview. Make sure this actually sticks.

> 🔗 **JS/Node Connection** — Directly continues Video 2's REST conventions section — today we fill in the verbs that table was missing.

> 🎯 **Interview Q:** *What does CRUD stand for, and which HTTP method maps to each operation?*
> **A:** Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.

---

## Section 2 — Building PUT `/quotes/:id`

```js
app.put('/quotes/:id', (req, res) => {
  const quote = quotes.find(q => q.id === Number(req.params.id));

  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'text field is required' });
  }

  quote.text = text;
  res.status(200).json(quote);
});
```

> 💡 **Analogy** — PUT is like replacing an entire page in a printed notebook — you swap the whole page, not pencil in one correction. PATCH would be the eraser that changes only part of the page.

> ⚠️ **Watch Out** — Don't skip the 404 check just because POST didn't need one. POST always creates a new resource; PUT and DELETE always target a specific existing one by id.

> ℹ️ **Tip** — PUT should be idempotent: sending the exact same PUT request twice should leave the data in the same final state both times.

> 🔗 **JS/Node Connection** — This validate-then-mutate pattern is the same guard-clause style of error handling used in React form submit handlers (Video 9).

> 🎯 **Interview Q:** *What's the difference between PUT and PATCH?*
> **A:** PUT conventionally replaces the entire resource (client sends the full object); PATCH applies a partial update (client sends only the changed fields).

---

## Section 3 — Building DELETE `/quotes/:id`

```js
app.delete('/quotes/:id', (req, res) => {
  const index = quotes.findIndex(q => q.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  quotes.splice(index, 1);
  res.status(204).send();
});
```

`204 No Content` is the most semantically correct status for a successful DELETE — the action succeeded and there's nothing further to return. `200 OK` with a confirmation message is also acceptable — just make the choice deliberately.

> 💡 **Analogy** — `204 No Content` is like a waiter clearing your plate without saying anything — the job's done, nothing further to report.

> ⚠️ **Watch Out** — `res.status(204).send()` must be called with no body. Also: `splice()` mutates in place; `filter()` returns a new array — know which one you're using.

> ℹ️ **Tip** — Deleting a non-existent id should still return 404, exactly like GET and PUT. Keep error-handling shape consistent across every CRUD route.

> 🔗 **JS/Node Connection** — `findIndex()`, `splice()`, `filter()` are the same JS array fundamentals from the JS Series, now managing server-side state instead of a UI list.

> 🎯 **Interview Q:** *What status code should a successful DELETE return, and what's the difference between 200 and 204?*
> **A:** `204 No Content` is the most semantically correct when no body is returned. `200 OK` works too if you want to send a confirmation message or the deleted resource — the choice should be deliberate.

---

## Section 4 — Organizing Routes with `express.Router()`

A single `server.js` holding every route for every resource becomes unmanageable fast. `express.Router()` creates a self-contained mini-app for one resource, plugged into the main app with one line.

**`routes/quotes.js`:**
```js
const express = require('express');
const router = express.Router();

let quotes = [
  { id: 1, text: 'Code never lies, comments sometimes do.' },
  { id: 2, text: 'First, solve the problem. Then, write the code.' }
];

router.get('/', (req, res) => {
  res.status(200).json(quotes);
});

router.get('/:id', (req, res) => {
  const quote = quotes.find(q => q.id === Number(req.params.id));
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  res.status(200).json(quote);
});

router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text field is required' });
  const newQuote = { id: quotes.length + 1, text };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

router.put('/:id', (req, res) => {
  const quote = quotes.find(q => q.id === Number(req.params.id));
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text field is required' });
  quote.text = text;
  res.status(200).json(quote);
});

router.delete('/:id', (req, res) => {
  const index = quotes.findIndex(q => q.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Quote not found' });
  quotes.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
```

**`server.js` — now just wiring things together:**
```js
const express = require('express');
const quotesRouter = require('./routes/quotes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/quotes', quotesRouter);

app.listen(PORT, () => {
  console.log(`Quotes API running at http://localhost:${PORT}`);
});
```

Every route inside the router is written relative to `/` — Express automatically prepends `/quotes`, the mount path given to `app.use()`.

> 💡 **Analogy** — `express.Router()` is like a department inside a company. The "Quotes Department" handles everything under `/quotes` internally; the "front desk" (main app) just forwards `/quotes/*` requests straight there.

> ⚠️ **Watch Out** — Forgetting `module.exports = router` means `require('./routes/quotes')` returns an empty object — a literal callback to Video 1's "forgot to export" warning.

> ℹ️ **Tip** — This pattern scales: each new resource (users, comments, orders) gets its own router file mounted at its own path, keeping `server.js` short and readable.

> 🔗 **JS/Node Connection** — The exact `module.exports` pattern from Video 1's Modules section, now applied to a real Express app.

> 🎯 **Interview Q:** *How would you organize routes in a larger Express application?*
> **A:** Split routes by resource into separate files using `express.Router()`, export each with `module.exports`, then mount each in the main app with `app.use('/resourceName', router)`.

---

## Section 5 — Postman: Testing All Four CRUD Operations

Typing a URL into a browser's address bar only ever sends a GET request — there's no built-in browser way to send POST, PUT, or DELETE with a JSON body. Postman fills that gap, and is genuinely used at most companies doing backend work.

**For each request in Postman:**
```text
Method:   GET / POST / PUT / DELETE  (dropdown next to the URL bar)
URL:      http://localhost:3000/quotes  (or /quotes/1, etc.)
Headers:  Content-Type: application/json  (auto-set when Body type = JSON)
Body:     raw -> JSON  (used for POST and PUT only)
          { "text": "Talk is cheap. Show me the code." }

After clicking Send, check:
  - Status code (top right of the response panel)
  - Response body (the JSON returned)
  - Time and size (useful later for performance awareness)
```

Save working requests into a **Collection** (a named group, e.g. "Quotes API") so you can re-run them without retyping. **Environments/Variables** let you define something like `{{baseUrl}}` once and reuse it across every saved request — useful when you eventually deploy and the URL changes.

> 💡 **Analogy** — Postman is a TV remote control for your API. Instead of fiddling with cables (curl commands, browser tricks) every time, you get clean, saved buttons you can press repeatedly.

> ⚠️ **Watch Out** — The #1 "my Postman request isn't working" issue: `Content-Type` isn't actually set to `application/json`. Postman usually sets this automatically when you pick JSON in the Body tab — double check if `req.body` ever comes through `undefined`.

> ℹ️ **Tip** — Save every request into a Collection as you build it, not after the fact.

> 🔗 **JS/Node Connection** — Connects straight back to the `curl` commands from Video 2 — Postman does the same job with a friendlier visual interface.

> 🎯 **Interview Q:** *How would you test a POST endpoint that expects a JSON body, without using a frontend?*
> **A:** Use Postman or curl: set the method to POST, the URL to the endpoint, a `Content-Type: application/json` header, the JSON payload in the body, send it, then check the status code and response body.

---

## Mini Project — Complete CRUD Quotes API + Postman Collection

**Final project structure:**
```text
quotes-api/
  node_modules/
  routes/
    quotes.js       <- all 5 routes, exported as a Router
  server.js         <- wiring: express.json() + mount the router
  package.json
```

**Postman test checklist — run every one of these and confirm the status code:**
```text
GET    /quotes              -> 200  (full list)
GET    /quotes/1            -> 200  (existing id)
GET    /quotes/999          -> 404  (id doesn't exist)
POST   /quotes  (valid)     -> 201  (text provided)
POST   /quotes  (no text)   -> 400  (validation works)
PUT    /quotes/1  (valid)   -> 200  (existing id, text provided)
PUT    /quotes/999          -> 404  (id doesn't exist)
DELETE /quotes/1            -> 204  (existing id)
DELETE /quotes/999          -> 404  (id doesn't exist)
```

> 💡 **Analogy** — Running through every one of these cases is like a pilot's pre-flight checklist — tedious, but it catches the bug before a real user (or interviewer) does.

> ⚠️ **Watch Out** — Testing only the happy path and skipping error cases is the most common gap between a fresher's testing habits and a working engineer's. Always test missing fields and bad ids too.

> ℹ️ **Tip** — Export your Postman Collection (built-in Export option) and commit the JSON file to your GitHub repo — it documents your API for free and is great to show in interviews.

> 🔗 **JS/Node Connection** — This is the exact API your React app will call starting next video — the `useFetch` pattern from Video 10 carries over unchanged; only where the call happens changes.

> 🎯 **Interview Q:** *If handed this Quotes API and asked to test it thoroughly, what would you check beyond the happy path?*
> **A:** Valid requests for every verb, requests with missing/invalid fields (400), requests targeting nonexistent ids (404), and confirming idempotent behavior — repeating the same PUT/DELETE shouldn't change the result the second time.

---

## Recap

We completed the full CRUD cycle (PUT, DELETE), understood idempotency beyond a buzzword, organized routes with `express.Router()`, and tested every case — happy path and error path — in Postman. Next video: connecting this API to a real React frontend, including CORS.

---

## 🎯 Interview Cheat Sheet

| Term | Definition |
|---|---|
| **CRUD** | Create, Read, Update, Delete — the four fundamental operations on any resource |
| **PUT** | HTTP method conventionally used to replace an entire existing resource |
| **DELETE (HTTP method)** | HTTP method used to remove an existing resource |
| **PATCH** | HTTP method for partial updates — sends only the fields that changed |
| **Idempotent** | An operation that produces the same end state no matter how many times it's repeated |
| **204 No Content** | Success status with no response body — common for DELETE |
| **findIndex()** | Array method returning the index of the first matching element, or -1 if none found |
| **splice() vs filter()** | `splice()` mutates the array in place; `filter()` returns a new array, leaving the original untouched |
| **express.Router()** | Creates a self-contained, mountable group of routes for one resource |
| **Mount path** | The path prefix given in `app.use(path, router)` that's prepended to every route inside that router |
| **Postman** | A GUI tool for sending HTTP requests (GET/POST/PUT/DELETE) to test APIs |
| **Collection (Postman)** | A saved, named group of related API requests |
| **Environment / Variables** | Reusable values (like `{{baseUrl}}`) that can be swapped across an entire Postman Collection at once |
| **Guard clause** | An early-return check for an invalid/edge case at the top of a function, before the main logic |
| **Happy path** | The expected, valid flow through a piece of code, with no errors |
| **Edge case** | An unusual or boundary input (missing field, nonexistent id) that a robust API must still handle correctly |
| **Content-Type header** | HTTP header telling the server how to interpret the request body (e.g. `application/json`) |
| **module.exports (router)** | Used to export an `express.Router()` instance so it can be required and mounted elsewhere |
| **Safe HTTP method** | A method that doesn't modify server state (e.g. GET) — distinct from, but related to, idempotency |
| **Export Collection** | Postman feature that saves a Collection as a JSON file, shareable or committable to a repo |

---

## 🔗 Resources

- [Express Routing Guide](https://expressjs.com/en/guide/routing.html) (covers `express.Router()`)
- [MDN — HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN — HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Postman Learning Center](https://learning.postman.com/)
- [Postman — Collections Documentation](https://learning.postman.com/docs/collections/collections-overview/)
- [REST API Tutorial (restfulapi.net)](https://restfulapi.net/)

---

*Web Dev Series — Node.js Video 3 | Next: Node.js Video 4*
