import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import useFetch from './components/useFetch'
import SkeletonCard from './components/SkeletonCard'
import UserCard from './components/UserCards'
const API = 'https://jsonplaceholder.typicode.com/users';


function App() {
  const [search, setSearch] = useState('')
  const { data: users, loading, error } = useFetch(API)

  const filtered = users? users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  ) : []


  return (
    <div style={{ background: '#f9f9f7', minHeight: '100vh', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>User Dashboard</h1>


      {/* Search input */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder='Search users by name...'
        style={{
          width: '100%', maxWidth: '400px',
          padding: '10px 14px', border: '1px solid #ddd',
          borderRadius: '8px', fontSize: '14px',
          marginBottom: '24px', display: 'block'
        }}
      />


      {/* Stats */}
      {!loading && !error && (
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Showing {filtered.length} of {users?.length} users
        </p>
      )}


      {/* Error state */}
      {error && (
        <div style={{ background: '#FDECEA', padding: '20px', borderRadius: '10px', color: '#8B0000' }}>
          <p>Failed to load users: {error}</p>
        </div>
      )}


      {/* Cards grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {loading || !users
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map(user => <UserCard key={user.id} user={user} />)
        }
      </div>


      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
          No users match your search.
        </p>
      )}
    </div>
  )
}


export default App;
