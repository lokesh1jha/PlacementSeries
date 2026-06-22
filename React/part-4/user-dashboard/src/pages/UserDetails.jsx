import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function UserDetails() {
    const { id } = useParams();
    const { data: user, loading, error } = useFetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const { data: posts } = useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)

    if (loading) return <p>Loading user...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!user) return null;

    return (
        <div style={{ maxWidth: "640px" }}>
            <Link
                to="/users"
                style={{ color: "#0088AA", textDecoration: "none", fontSize: "14px" }}
            >
                ← Back to Users
            </Link>

            <div style={{
                background: "white", borderRadius: "12px", padding: "28px",
                marginTop: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: "#0088AA", color: "white",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontWeight: "700", fontSize: "22px"
                    }}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "20px", color : "#dd1414"}}>{user.name}</h1>
                        <p style={{ margin: 0, color: "#dd1414", fontSize: "13px" }}>@{user.username}</p>
                    </div>
                </div>
                <p>📧 {user.email}</p>
                <p>📞 {user.phone}</p>
                <p>🌐 {user.website}</p>
                <p>🏢 {user.company.name}</p>
                <p>📍 {user.address.city}, {user.address.zipcode}</p>
            </div>

            {posts && (
                <div style={{ marginTop: "24px" }}>
                    <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>
                        Posts by {user.name} ({posts.length})
                    </h2>
                    {posts.slice(0, 5).map(post => (
                        <div key={post.id} style={{
                            background: "white", borderRadius: "8px", padding: "16px",
                            marginBottom: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
                        }}>
                            <h3 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600" }}>
                                {post.title}
                            </h3>
                            <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>{post.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );


}
export default UserDetails