import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import UserCard from "../components/UserCards";
import SkeletonCard from "../components/SkeletonCard";

function UserList() {
    const [search, setSearch] = useState("");
    const { data: users, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const filtered = users?.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

    return (
        <div>
            <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>All Users</h1>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users..."
                style={{
                    width: "100%", maxWidth: "400px", padding: "10px 14px",
                    border: "1px solid #ddd", borderRadius: "8px",
                    fontSize: "14px", marginBottom: "24px", display: "block"
                }}
            />
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {loading
                    ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : filtered.map(user => (
                        <Link
                            key={user.id}
                            to={`/users/${user.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <UserCard user={user} />
                        </Link>
                    ))
                }
            </div>
            {!loading && !error && filtered.length === 0 && (
                <p style={{ color: "#999", textAlign: "center", padding: "40px" }}>
                    No users match your search.
                </p>
            )}
        </div>
    );
}

export default UserList;