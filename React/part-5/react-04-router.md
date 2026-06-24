# React Video 4 — React Router, Multi-Page Apps & URL Parameters

> **Web Dev Series** | [YouTube Video Link] | [GitHub Repo Link]  
> **Prerequisites:** React Video 1 (Components, JSX, Props) + React Video 2 (useState, Events) + React Video 3 (useEffect, Data Fetching)

---

## Table of Contents

1. [What is React Router?](#1-what-is-react-router)
2. [Setting Up React Router](#2-setting-up-react-router)
3. [BrowserRouter, Routes, Route](#3-browserrouter-routes-route)
4. [Link and NavLink — Navigation Without Refresh](#4-link-and-navlink--navigation-without-refresh)
5. [useNavigate — Programmatic Navigation](#5-usenavigate--programmatic-navigation)
6. [URL Parameters with useParams](#6-url-parameters-with-useparams)
7. [useSearchParams — Query Strings](#7-usesearchparams--query-strings)
8. [Nested Routes and Layouts](#8-nested-routes-and-layouts)
9. [404 and Catch-All Routes](#9-404-and-catch-all-routes)
10. [Protecting Routes (Auth Guard Pattern)](#10-protecting-routes-auth-guard-pattern)
11. [Mini Project — User Dashboard with Routing](#11-mini-project--user-dashboard-with-routing)
12. [Interview Questions](#12-interview-questions)
13. [Quick Reference Cheat Sheet](#13-quick-reference-cheat-sheet)

---

## 1. What is React Router?

React is a **single page application** (SPA) framework — the browser loads one HTML file and JavaScript swaps content in and out. React Router is the standard library that makes this feel like a multi-page app by:

- Matching the current URL to a component and rendering it
- Letting users navigate with the Back/Forward buttons
- Keeping the URL in sync with what is on screen
- Enabling shareable URLs like `/users/3`

Without React Router, every page transition would require a full browser reload, losing all React state.

```
Traditional Multi-Page:
  /users       → server returns users.html (full reload)
  /users/3     → server returns user-detail.html (full reload)

React SPA with Router:
  /users       → React renders <UserList /> (no reload)
  /users/3     → React renders <UserDetail id={3} /> (no reload)
```

> 💡 **Analogy:** React Router is like a TV remote. The TV (browser window) stays on — you just change the channel (component shown). No one unplugs and replugs the TV every time you switch channels.

---

## 2. Setting Up React Router

```bash
npm install react-router-dom
```

React Router v6 is the current standard (2024+). Version 6 changed the API significantly from v5 — if you see `<Switch>` in older tutorials, that is v5. This video uses v6.

---

## 3. BrowserRouter, Routes, Route

Wrap your entire app in `BrowserRouter`. Use `Routes` and `Route` to define what renders at each URL.

```jsx
// src/main.jsx (entry point)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home       from './pages/Home';
import UserList   from './pages/UserList';
import UserDetail from './pages/UserDetail';
import NotFound   from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/"          element={<Home />}       />
      <Route path="/users"     element={<UserList />}   />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="*"          element={<NotFound />}   />
    </Routes>
  );
}

export default App;
```

### How Route matching works

| URL           | Matched Route      | Component Rendered |
|---------------|--------------------|--------------------|
| `/`           | `path="/"`         | `<Home />`         |
| `/users`      | `path="/users"`    | `<UserList />`     |
| `/users/3`    | `path="/users/:id"`| `<UserDetail />`   |
| `/anything`   | `path="*"`         | `<NotFound />`     |

> React Router v6 uses **exact matching by default** — you do not need `exact` like in v5.

---

## 4. Link and NavLink — Navigation Without Refresh

Never use `<a href>` for in-app navigation in React — it causes a full page reload and resets all state. Use `<Link>` instead.

```jsx
import { Link, NavLink } from 'react-router-dom';

// Link — basic navigation, no reload
<Link to="/users">View All Users</Link>
<Link to={`/users/${user.id}`}>View {user.name}</Link>

// NavLink — like Link but adds active class automatically
<NavLink
  to="/users"
  style={({ isActive }) => ({
    fontWeight: isActive ? '700' : '400',
    color: isActive ? '#0088AA' : '#333',
  })}
>
  Users
</NavLink>
```

### Building a Navbar with NavLink

```jsx
// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  padding: '8px 16px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: isActive ? '600' : '400',
  background: isActive ? '#0088AA' : 'transparent',
  color: isActive ? 'white' : '#333',
});

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '8px', padding: '16px 24px', background: 'white', borderBottom: '1px solid #eee' }}>
      <NavLink to="/"      style={linkStyle}>Home</NavLink>
      <NavLink to="/users" style={linkStyle}>Users</NavLink>
    </nav>
  );
}

export default Navbar;
```

---

## 5. useNavigate — Programmatic Navigation

Use `useNavigate` when you need to navigate from code, not a click — for example, after form submission or after login.

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // ... validate login ...
    navigate('/dashboard');          // go forward
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  );
}
```

### Navigate options

```jsx
navigate('/users');          // go to /users
navigate('/users', { replace: true }); // replace current history entry (no back button)
navigate(-1);                // go back (like browser back button)
navigate(1);                 // go forward
navigate(`/users/${id}`);    // dynamic path
```

> 🎯 **Interview:** `navigate('/path', { replace: true })` replaces the current history entry so the Back button skips it. Used after login (so Back doesn't return to the login page).

---

## 6. URL Parameters with useParams

`:id` in a route path is a **URL parameter** — a dynamic segment. Read it inside the component with `useParams`.

```jsx
// Route definition
<Route path="/users/:id" element={<UserDetail />} />

// Component
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function UserDetail() {
  const { id } = useParams(); // reads :id from the URL

  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (loading) return <p>Loading user...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
      <p>City: {user.address.city}</p>
    </div>
  );
}
```

### Multiple URL parameters

```jsx
// Route
<Route path="/teams/:teamId/users/:userId" element={<UserInTeam />} />

// Component
const { teamId, userId } = useParams();
// URL /teams/5/users/12 → teamId = "5", userId = "12"
```

> ⚠️ URL params are always **strings**. If your API expects a number, convert: `Number(id)` or `parseInt(id)`.

---

## 7. useSearchParams — Query Strings

Query strings (the `?key=value` part of a URL) are for optional filters, search terms, and pagination — not for identifying a specific resource.

```jsx
import { useSearchParams } from 'react-router-dom';

// URL: /users?search=john&page=2
function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const page   = Number(searchParams.get('page') ?? 1);

  function handleSearch(e) {
    setSearchParams({ search: e.target.value, page: 1 });
  }

  return (
    <div>
      <input
        value={search}
        onChange={handleSearch}
        placeholder="Search users..."
      />
      <p>Page {page}</p>
    </div>
  );
}
```

### URL params vs Search params

| | URL Params (`:id`) | Search Params (`?key=value`) |
|---|---|---|
| Example | `/users/3` | `/users?search=john` |
| Required? | Yes — route won't match without it | Optional |
| Use for | Identifying a specific resource | Filters, search, pagination |

---

## 8. Nested Routes and Layouts

Nested routes share a parent layout — the `<Outlet />` component marks where child routes render.

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout     from './components/Layout';
import Home       from './pages/Home';
import UserList   from './pages/UserList';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>         {/* parent layout */}
        <Route index          element={<Home />}       />  {/* / */}
        <Route path="users"   element={<UserList />}   />  {/* /users */}
        <Route path="users/:id" element={<UserDetail />} /> {/* /users/:id */}
      </Route>
    </Routes>
  );
}
```

```jsx
// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '24px' }}>
        <Outlet />   {/* child route renders here */}
      </main>
    </div>
  );
}

export default Layout;
```

> 💡 `<Outlet />` is the placeholder where nested route content appears. The parent layout (Navbar, sidebar, footer) stays constant while only the `<Outlet />` content changes.

### Index routes

```jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />  {/* renders at exactly "/" */}
  <Route path="about" element={<About />} />
</Route>
```

`index` means "render this when the parent path matches exactly."

---

## 9. 404 and Catch-All Routes

```jsx
// Catch-all — must be last in Routes
<Route path="*" element={<NotFound />} />
```

```jsx
// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <h1 style={{ fontSize: '80px', margin: 0 }}>404</h1>
      <p style={{ fontSize: '20px', color: '#666', margin: '16px 0 32px' }}>
        Page not found
      </p>
      <Link
        to="/"
        style={{ background: '#0088AA', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
```

---

## 10. Protecting Routes (Auth Guard Pattern)

A protected route redirects to login if the user is not authenticated.

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

```jsx
// Use in App.jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

> `<Navigate>` is the component equivalent of `useNavigate`. Use it in render logic (JSX); use `useNavigate` in event handlers and effects.

---

## 11. Mini Project — User Dashboard with Routing

Extending the User Dashboard from Video 3 with full routing: Home page, User List, User Detail page, Navbar, and 404 handling.

### File structure

```
src/
  hooks/
    useFetch.js          (from Video 3 — reuse as-is)
  components/
    Navbar.jsx
    Layout.jsx
    UserCard.jsx         (from Video 3 — reuse as-is)
    SkeletonCard.jsx     (from Video 3 — reuse as-is)
  pages/
    Home.jsx
    UserList.jsx
    UserDetail.jsx
    NotFound.jsx
  App.jsx
  main.jsx
```

### `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom';
import Layout     from './components/Layout';
import Home       from './pages/Home';
import UserList   from './pages/UserList';
import UserDetail from './pages/UserDetail';
import NotFound   from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index              element={<Home />}       />
        <Route path="users"       element={<UserList />}   />
        <Route path="users/:id"   element={<UserDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

### `src/components/Navbar.jsx`

```jsx
import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  padding: '8px 16px', borderRadius: '6px', textDecoration: 'none',
  fontWeight: isActive ? '600' : '400',
  background: isActive ? '#0088AA' : 'transparent',
  color: isActive ? 'white' : '#333',
  transition: 'all 0.15s',
});

function Navbar() {
  return (
    <nav style={{ display:'flex', alignItems:'center', gap:'8px', padding:'12px 24px', background:'white', borderBottom:'1px solid #eee', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
      <span style={{ fontWeight:'700', fontSize:'16px', color:'#0088AA', marginRight:'16px' }}>⚛ WebDev</span>
      <NavLink to="/"     end style={linkStyle}>Home</NavLink>
      <NavLink to="/users"    style={linkStyle}>Users</NavLink>
    </nav>
  );
}

export default Navbar;
```

### `src/components/Layout.jsx`

```jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div style={{ background:'#f9f9f7', minHeight:'100vh' }}>
      <Navbar />
      <main style={{ padding:'32px 24px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
```

### `src/pages/Home.jsx`

```jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ maxWidth:'600px' }}>
      <h1 style={{ fontSize:'32px', marginBottom:'12px' }}>React User Dashboard</h1>
      <p style={{ color:'#666', marginBottom:'28px', lineHeight:'1.7' }}>
        A multi-page React app with React Router, data fetching, loading states, and URL parameters. Built in the Web Dev Series.
      </p>
      <Link
        to="/users"
        style={{ background:'#0088AA', color:'white', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', fontWeight:'600' }}
      >
        View All Users →
      </Link>
    </div>
  );
}

export default Home;
```

### `src/pages/UserList.jsx`

```jsx
import { useState } from 'react';
import { Link }     from 'react-router-dom';
import useFetch     from '../hooks/useFetch';
import SkeletonCard from '../components/SkeletonCard';

function UserList() {
  const [search, setSearch] = useState('');
  const { data: users, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  const filtered = users?.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div>
      <h1 style={{ fontSize:'24px', marginBottom:'16px' }}>All Users</h1>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search users..."
        style={{ width:'100%', maxWidth:'400px', padding:'10px 14px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'14px', marginBottom:'24px', display:'block' }}
      />

      {!loading && !error && (
        <p style={{ color:'#666', marginBottom:'20px' }}>
          Showing {filtered.length} of {users?.length} users
        </p>
      )}

      {error && (
        <div style={{ background:'#FDECEA', padding:'20px', borderRadius:'10px', color:'#8B0000' }}>
          Failed to load users: {error}
        </div>
      )}

      <div style={{ display:'flex', flexWrap:'wrap', gap:'16px' }}>
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map(user => (
              <Link
                key={user.id}
                to={`/users/${user.id}`}
                style={{ textDecoration:'none', color:'inherit' }}
              >
                <div style={{ background:'white', borderRadius:'12px', padding:'20px', width:'260px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'pointer', transition:'transform 0.15s, box-shadow 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 16px rgba(0,0,0,0.10)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
                    <div style={{ width:44, height:44, borderRadius:'50%', background:'#0088AA', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'18px' }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin:0, fontSize:'15px' }}>{user.name}</h3>
                      <p style={{ margin:0, color:'#888', fontSize:'12px' }}>@{user.username}</p>
                    </div>
                  </div>
                  <p style={{ fontSize:'13px', color:'#555', margin:'0 0 4px' }}>📧 {user.email}</p>
                  <p style={{ fontSize:'13px', color:'#555', margin:0 }}>🏢 {user.company.name}</p>
                </div>
              </Link>
            ))
        }
      </div>

      {!loading && !error && filtered.length === 0 && (
        <p style={{ color:'#999', textAlign:'center', padding:'40px' }}>No users match your search.</p>
      )}
    </div>
  );
}

export default UserList;
```

### `src/pages/UserDetail.jsx`

```jsx
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function UserDetail() {
  const { id } = useParams();
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const { data: posts, loading: postsLoading } = useFetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );

  if (loading) return <p>Loading user...</p>;
  if (error)   return <p style={{ color:'red' }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth:'680px' }}>
      <Link to="/users" style={{ color:'#0088AA', textDecoration:'none', fontSize:'14px' }}>
        ← Back to Users
      </Link>

      <div style={{ background:'white', borderRadius:'16px', padding:'28px', marginTop:'20px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'24px' }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:'#0088AA', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'26px' }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ margin:0, fontSize:'22px' }}>{user.name}</h1>
            <p style={{ margin:0, color:'#888' }}>@{user.username}</p>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          {[
            ['📧 Email',   user.email],
            ['📞 Phone',   user.phone],
            ['🌐 Website', user.website],
            ['🏢 Company', user.company.name],
            ['📍 City',    user.address.city],
            ['🏠 Street',  user.address.street],
          ].map(([label, value]) => (
            <div key={label} style={{ background:'#f9f9f7', borderRadius:'8px', padding:'12px 14px' }}>
              <p style={{ margin:0, fontSize:'12px', color:'#888' }}>{label}</p>
              <p style={{ margin:'4px 0 0', fontSize:'14px', fontWeight:'500' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop:'28px' }}>
        <h2 style={{ fontSize:'18px', marginBottom:'16px' }}>
          Posts {postsLoading ? '(loading...)' : `(${posts?.length ?? 0})`}
        </h2>
        {!postsLoading && posts?.map(post => (
          <div key={post.id} style={{ background:'white', borderRadius:'10px', padding:'16px 20px', marginBottom:'10px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin:'0 0 6px', fontSize:'14px', textTransform:'capitalize' }}>{post.title}</h3>
            <p style={{ margin:0, fontSize:'13px', color:'#666', lineHeight:'1.6' }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetail;
```

### `src/pages/NotFound.jsx`

```jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign:'center', padding:'80px 24px' }}>
      <h1 style={{ fontSize:'80px', margin:0, color:'#0088AA' }}>404</h1>
      <p style={{ fontSize:'20px', color:'#666', margin:'16px 0 32px' }}>
        Page not found
      </p>
      <Link
        to="/"
        style={{ background:'#0088AA', color:'white', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', fontWeight:'600' }}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
```

---

## 12. Interview Questions

**Q: What is React Router and why is it needed?**  
A: React Router is a library for client-side routing in React SPAs. Without it, navigating between views would require full page reloads, losing all React state. React Router syncs the browser URL to what component is rendered, enables Back/Forward navigation, and makes URLs shareable — all without ever reloading the page.

---

**Q: What is the difference between `<Link>` and a regular `<a>` tag in React?**  
A: A regular `<a href>` triggers a full browser page reload, which destroys all React state and re-runs the entire app. `<Link>` intercepts the click, updates the URL using the History API, and tells React Router to swap the component — no reload, state preserved, instantaneous.

---

**Q: What is the difference between `<Link>` and `<NavLink>`?**  
A: `<NavLink>` adds an `isActive` prop (and `isPending`) to its `style` and `className` callbacks, letting you style the active link differently. Used for navigation menus where you want to highlight the current page.

---

**Q: How do you read a URL parameter in React Router?**  
A: Define the route with `:paramName` (e.g. `path="/users/:id"`), then read it inside the component with `const { id } = useParams()`. Params are always strings — convert if needed.

---

**Q: What is the difference between URL parameters and search params?**  
A: URL params (`:id`) are required parts of the path that identify a specific resource — `/users/5`. Search params (`?key=value`) are optional query strings used for filtering, searching, or pagination — `/users?search=john&page=2`. Read search params with `useSearchParams`.

---

**Q: How do you navigate programmatically in React Router?**  
A: Use `const navigate = useNavigate()`, then call `navigate('/path')`. Pass `{ replace: true }` to replace the current history entry (useful after login so Back doesn't return to the login screen). Use `navigate(-1)` to go back.

---

**Q: What is `<Outlet />`?**  
A: `<Outlet />` is a placeholder in a parent layout component where child route content renders. Nested routes in `App.jsx` define what fills the Outlet. The parent layout (Navbar, sidebar) stays constant; only the Outlet content changes.

---

**Q: What is the difference between `<Navigate>` and `useNavigate`?**  
A: `<Navigate>` is a component used in JSX/render logic (e.g., redirect if not logged in). `useNavigate` is a hook that gives you a `navigate` function to call in event handlers or `useEffect`. Both navigate programmatically, but one is declarative (JSX) and the other is imperative (function call).

---

## 13. Quick Reference Cheat Sheet

```jsx
// Install
// npm install react-router-dom

// Setup — wrap app in BrowserRouter
import { BrowserRouter } from 'react-router-dom';
// <BrowserRouter><App /></BrowserRouter>

// Routes
import { Routes, Route } from 'react-router-dom';
<Routes>
  <Route path="/"         element={<Home />}       />
  <Route path="/users"    element={<UserList />}   />
  <Route path="/users/:id" element={<UserDetail />} />
  <Route path="*"         element={<NotFound />}   />
</Routes>

// Navigation
import { Link, NavLink } from 'react-router-dom';
<Link to="/users">Users</Link>
<NavLink to="/users" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}>

// Programmatic navigation
const navigate = useNavigate();
navigate('/users');
navigate(-1);                         // back
navigate('/login', { replace: true }); // replace history

// URL parameters
// Route: path="/users/:id"
const { id } = useParams();           // "3" (always string)

// Search params  
// URL: /users?search=john
const [searchParams, setSearchParams] = useSearchParams();
const search = searchParams.get('search') ?? '';
setSearchParams({ search: 'john', page: 2 });

// Nested routes with layout
<Route path="/" element={<Layout />}>
  <Route index        element={<Home />}     />
  <Route path="users" element={<UserList />} />
</Route>
// Layout.jsx: <Outlet /> renders child content

// Redirect (declarative)
import { Navigate } from 'react-router-dom';
if (!isLoggedIn) return <Navigate to="/login" replace />;
```

---

## What's Next

**React Final Project** covers:
- Building a complete multi-feature app combining everything from the series
- Components, state, useEffect, data fetching, React Router
- Professional folder structure and component organisation
- Deployment to Vercel / Netlify

---

*Part of the Web Dev Series — [YouTube Channel Link]*  
*Questions? Drop a comment on the video or open an issue.*
