# Web Dev Series #16 — Connecting React to Express

> **Node.js & Express Series — Video 4 of 5** · fetch() · CORS · Environment Variables · Full GET + POST Round Trip

---

## 📋 What We Cover

- Recap — two apps, two ports (React dev server + Express API running separately)
- **The CORS problem** — what it is, why it exists, why it only shows up in the browser
- **Fixing CORS** with the `cors` npm package
- **Calling your own API from React** — a `useQuotes` hook + environment variables for the API URL
- **Sending data** — a controlled POST form in React
- **Mini Project** — a connected Quotes app: full GET + POST round trip, frontend to backend

---

## ✅ Prerequisites

- Completed [Node.js Video 3 — CRUD API + Postman](./node-03-crud-postman.md) (#15) — full CRUD Quotes API
- Completed the React Series (#8–12) — comfortable with `useState`, `useEffect`, custom hooks, controlled forms
- Both the `quotes-api` (Express) and a Vite-based React project ready to run side by side

---

## ⚙️ Setup

```bash
# Terminal 1 — Express API
cd quotes-api
npm run dev

# Terminal 2 — React app (separate project)
cd quotes-frontend
npm run dev
```

---

## Section 1 — Recap: Two Apps, Two Ports

The React series gave us DevFinder — a frontend calling a public GitHub API. The last three videos gave us a Quotes API in Express, tested by hand in Postman. Today we connect them.

During development, React (via Vite) and Express run as **two separate processes on two separate ports** — typically React on `localhost:5173`, Express on `localhost:3000`. They aren't connected just because both say "localhost."

> 💡 **Analogy** — Two separate buildings on the same street (localhost), different door numbers (ports). Mail to one doesn't automatically reach the other — you need an explicit forwarding arrangement.

> ℹ️ **Tip** — Keep two terminal windows open side by side: one for React (`npm run dev`), one for Express (`npm run dev` via nodemon).

> ⚠️ **Watch Out** — Many beginners assume "both say localhost" means same origin. It does NOT — different ports make them different origins.

> 🔗 **JS/React Connection** — Builds directly on the `useFetch` custom hook (Video 10) and fetch patterns from the JS series — we're not relearning fetch, just pointing it somewhere new.

> 🎯 **Interview Q:** *Are a local React app and a local Express API the same origin?*
> **A:** No — origin is protocol + domain + port together. Different ports (5173 vs 3000) make them different origins under the same-origin policy.

---

## Section 2 — The CORS Problem

Point a React `fetch()` straight at `http://localhost:3000/quotes` with no changes on the Express side, and you'll get a browser console error like *"blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present."*

This is the **Same-Origin Policy** — browsers block JS on one origin from reading a response from a different origin unless that origin explicitly allows it. **This is enforced by the browser, not the server** — which is why every Postman test in Video 3 worked fine; Postman doesn't enforce CORS at all.

Why it exists: without it, a malicious site in one tab could silently read data from another site (like your bank) using your logged-in session, in another tab.

> 💡 **Analogy** — CORS is a bouncer at a private club's door. The club (your server) must put your name (origin) on the guest list, or the bouncer (the browser) won't let the response back through.

> ⚠️ **Watch Out** — A CORS error does NOT mean your server crashed. The request often reaches the server fine — it's the *response* getting blocked on the way back. Check your server logs.

> ℹ️ **Tip** — CORS errors are exclusively a browser + JS phenomenon. They never appear in Postman, curl, or a direct address-bar visit.

> 🔗 **JS/React Connection** — Ties to Video 2's `requestLogger` middleware — during a blocked CORS request, your terminal usually still shows the request logged, proving it arrived.

> 🎯 **Interview Q:** *What is CORS, and why do CORS errors only show up in the browser, not in Postman?*
> **A:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism blocking JS from reading cross-origin responses unless explicitly allowed via headers. It's enforced by the browser, not the server — Postman/curl don't run that enforcement.

---

## Section 3 — Fixing CORS with the `cors` Package

```bash
npm install cors
```

**`server.js` — enabling CORS for local development:**
```js
const express = require('express');
const cors = require('cors');
const quotesRouter = require('./routes/quotes');

const app = express();
const PORT = 3000;

app.use(cors());              // allow ALL origins (fine for local dev)
app.use(express.json());
app.use('/quotes', quotesRouter);

app.listen(PORT, () => {
  console.log(`Quotes API running at http://localhost:${PORT}`);
});
```

**Tightened version — only your React dev server's origin:**
```js
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

`app.use(cors())` adds `Access-Control-Allow-Origin: *` to every response — fine for local dev, worth scoping down before production.

> 💡 **Analogy** — `app.use(cors())` is telling the bouncer "let everyone in tonight, no guest list." Fine for a private rehearsal, risky for the real show.

> ⚠️ **Watch Out** — `cors()` must run BEFORE your routes — the same ordering rule as `express.json()` from Video 2.

> ℹ️ **Tip** — Avoid copy-pasted manual CORS header snippets from random sites; the `cors` package handles edge cases correctly.

> 🔗 **JS/React Connection** — `cors()` is just another piece of middleware, same `(req, res, next)` shape as `express.json()` and the custom `requestLogger` from Video 2.

> 🎯 **Interview Q:** *How do you enable CORS in Express, and what's the difference between `app.use(cors())` and restricting it to a specific origin?*
> **A:** Install `cors` and add `app.use(cors())` before routes — allows any origin. Restrict with `app.use(cors({ origin: 'https://yourdomain.com' }))` to allow only that origin.

---

## Section 4 — Calling Your Own API from React

**`.env` (React project root):**
```bash
VITE_API_URL=http://localhost:3000
```

**`useQuotes.js`:**
```js
import { useState, useEffect } from 'react';

function useQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/quotes`);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        const data = await res.json();
        setQuotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  return { quotes, loading, error, setQuotes };
}

export default useQuotes;
```

This is almost line-for-line `useFetch` from Video 10 — only the URL changed, now pointed at your own Express server.

> 💡 **Analogy** — An env variable for your API URL is a sticky note with your friend's address, instead of tattooing it on your arm — addresses change, and a sticky note updates in one place.

> ⚠️ **Watch Out** — In Vite, browser-exposed env variables MUST be prefixed `VITE_` — anything without it is invisible to `import.meta.env`, on purpose, for security.

> ℹ️ **Tip** — Add `.env` to `.gitignore` — same instinct as `node_modules` from Video 1. Build the habit now, before a real secret ever lives in one.

> 🔗 **JS/React Connection** — Reuses 100% of the `useEffect` + async/await + try/catch/finally pattern from `useFetch` (Video 10) — proving the pattern was never GitHub-specific.

> 🎯 **Interview Q:** *Why store an API base URL in an environment variable instead of hardcoding it?*
> **A:** The URL changes between environments — localhost in dev, a real domain in production. Centralizing it means changing one value instead of every fetch call, and keeps environment config out of committed source.

---

## Section 5 — Sending Data: a POST Form in React

**`AddQuoteForm.jsx`:**
```jsx
import { useState } from 'react';

function AddQuoteForm({ onQuoteAdded }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error('Failed to add quote');

      const newQuote = await res.json();
      onQuoteAdded(newQuote);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new quote"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Quote'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default AddQuoteForm;
```

A controlled form exactly like Video 9 — but the submit handler now POSTs to Express and waits for the real, server-confirmed response (including the server-generated id) before updating the UI.

> 💡 **Analogy** — Updating the UI before confirming the POST succeeded is like cashing a check before it clears. Waiting for `res.ok` is waiting for the check to actually clear.

> ⚠️ **Watch Out** — A common bug: updating the UI optimistically, then silently diverging from the server if the request fails. `onQuoteAdded(newQuote)` is only called *after* `res.ok` is confirmed true.

> ℹ️ **Tip** — Always check `res.ok` before assuming success. `fetch()` does NOT throw on 4xx/5xx — it resolves normally.

> 🔗 **JS/React Connection** — Ties directly back to Video 2's `res.status(201).json(newQuote)` — built specifically so the frontend would have a confirmed, server-assigned id to work with.

> 🎯 **Interview Q:** *Does `fetch()` throw an error for a 404 or 400 response?*
> **A:** No — `fetch()` only rejects on network failures. A 404/400 resolves normally; you must check `res.ok` (or `res.status`) and handle the error yourself.

---

## Mini Project — A Connected Quotes App

**`App.jsx`:**
```jsx
import useQuotes from './useQuotes';
import AddQuoteForm from './AddQuoteForm';

function App() {
  const { quotes, loading, error, setQuotes } = useQuotes();

  function handleQuoteAdded(newQuote) {
    setQuotes((prev) => [...prev, newQuote]);
  }

  if (loading) return <p>Loading quotes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Quotes</h1>
      <ul>
        {quotes.map((q) => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ul>
      <AddQuoteForm onQuoteAdded={handleQuoteAdded} />
    </div>
  );
}

export default App;
```

**Testing:** run both servers, open the React app, confirm the list loads from Express (not placeholder data), add a quote through the form, and check the Network tab for the `Access-Control-Allow-Origin` header on the response.

> 💡 **Analogy** — Structurally identical to DevFinder (Video 12) — fetch on mount, render a list, handle loading/error. Only *where* the data comes from changed.

> ⚠️ **Watch Out** — If you restart one server and forget the other still has a stale cache/build, you'll see confusing behavior. Hard-refresh and check both terminals for errors.

> ℹ️ **Tip** — Open the Network tab, click the `/quotes` request, and check Response Headers for `Access-Control-Allow-Origin` — seeing it makes CORS concrete instead of theoretical.

> 🔗 **JS/React Connection** — The direct sequel to DevFinder (Video 12) — same hooks-based architecture, now pointed at your own backend, closing the loop between the React and Node/Express series.

> 🎯 **Interview Q:** *Walk me through what happens when a user submits this form, from click to updated UI.*
> **A:** `onSubmit` fires, `preventDefault()` stops the reload, the handler sets submitting state and calls `fetch()` with method POST, a JSON body, and a `Content-Type` header. Once Express responds, `res.ok` is checked, the parsed JSON (with the new id) is passed up via `onQuoteAdded`, updating state and triggering a re-render.

---

## Recap

We learned what CORS actually is and why it's browser-only, fixed it with the `cors` package, connected React to our own Express backend via an environment variable, and built a full GET + POST round trip with a working form. Next video: the Final Project, bringing the whole series together into one complete REST API.

---

## 🎯 Interview Cheat Sheet

| Term | Definition |
|---|---|
| **CORS** | Cross-Origin Resource Sharing — a browser mechanism controlling cross-origin requests |
| **Same-Origin Policy** | Default browser rule blocking JS from reading responses from a different origin |
| **Origin** | The combination of protocol + domain + port; any difference means a different origin |
| **Access-Control-Allow-Origin** | Response header that tells the browser which origin(s) may read the response |
| **cors package** | Express middleware package that adds the correct CORS headers automatically |
| **Preflight request (OPTIONS)** | An automatic browser-sent check before certain cross-origin requests, asking permission first |
| **fetch() and res.ok** | `fetch()` does not throw on 4xx/5xx; `res.ok` must be checked manually to detect HTTP errors |
| **Environment variable (frontend)** | A config value (like an API URL) kept outside hardcoded source code |
| **import.meta.env** | Vite's way of exposing environment variables to frontend code |
| **VITE_ prefix** | Required prefix for any env variable Vite exposes to browser-side code |
| **.env file** | File storing environment variables for a project; excluded from git via `.gitignore` |
| **Optimistic UI update** | Updating the UI before a request is confirmed successful — risky if the request fails |
| **Controlled form** | A form whose input value is driven by React state via `value` + `onChange` |
| **Network tab** | Browser DevTools panel showing real requests/responses, including headers |
| **localhost vs deployed origin** | Dev URLs (e.g. `localhost:5173`) differ from real production URLs after deployment |
| **Dev server vs production server** | Local development servers (Vite, nodemon) vs the real servers used after deploying |
| **JSON.stringify() (POST body)** | Converts a JS object into a JSON string to send as a request body |
| **Content-Type header** | Tells the server how to interpret the request body (e.g. `application/json`) |
| **useEffect dependency array** | Controls when an effect re-runs; an empty array means "run once, on mount" |
| **Two-process local development** | Running the frontend dev server and backend API server simultaneously during development |

---

## 🔗 Resources

- [MDN — Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [npm — cors package](https://www.npmjs.com/package/cors)
- [Vite — Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)
- [MDN — fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN — Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

---

*Web Dev Series — Node.js Video 4 | Next: Node.js Video 5 (Final Project)*
