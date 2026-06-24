import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import UserCard from "./UserCard";
import SkeletonCard from "../components/SkeletonCard";

function Home() {

  const { darkMode } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(searchParams.get("q") ?? "")

  const query = searchParams.get("q") ?? ""

  const { data, loading, error } = useFetch(query ? `https://api.github.com/search/users?q=${query}&per_page=12` : null);

  const users = data?.items ?? []

  function handleSearch(e) {
    e.preventDefault()
    if (input.trim()) setSearchParams({ q: input.trim() })
  }

  const card = {
    background: darkMode ? "#161B22" : "#FFFFFF",
    border: `1px solid ${darkMode ? "#30363D" : "#D0D7DE"}`,
    borderRadius: "12px",
    padding: "20px",
    color: darkMode ? "#E6EDF3" : "#1F2328"
  };


  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>DevFinder</h1>
      <p style={{ color: darkMode ? "#8B949E" : "#656D76", marginBottom: "24px" }}>
        Search GitHub users by username
      </p>

      {/* Search form */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search GitHub username..."
          style={{
            flex: 1, padding: "10px 14px",
            border: `1px solid ${darkMode ? "#30363D" : "#D0D7DE"}`,
            borderRadius: "8px", fontSize: "14px",
            background: darkMode ? "#0D1117" : "#FFFFFF",
            color: darkMode ? "#E6EDF3" : "#1F2328"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px", background: "#0088AA",
            color: "white", border: "none",
            borderRadius: "8px", cursor: "pointer", fontWeight: "600"
          }}
        >
          Search
        </button>
      </form>

      {error && <p style={{ color: "#F85149" }}>Error: {error}</p>}
      {!loading && query && users.length === 0 && (
        <p style={{ color: darkMode ? "#8B949E" : "#656D76" }}>
          No users found for "{query}"
        </p>
      )}

      {/* Results grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : users.map(user => (
            <Link
              key={user.id}
              to={`/users/${user.login}`}
              style={{ textDecoration: "none" }}
            >
              <UserCard user={user} darkMode={darkMode} />
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
