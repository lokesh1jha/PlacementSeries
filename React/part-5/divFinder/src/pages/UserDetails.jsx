import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useTheme } from "../context/ThemeContext";

function UserDetails() {
    const { username } = useParams();
    const { darkMode } = useTheme();

    const { data: user, loading, error } = useFetch(
        `https://api.github.com/users/${username}`
    );

    if (loading) {
        return (
            <p> Loading User's Details...</p>
        )
    }

    if (error) {
        return (
            <p style={{ color: "red" }}>Error: {error}</p>
        )
    }

    if (!user) {
        return null;
    }

    const cardStyle = {
        background: darkMode ? "#161B22" : "#FFFFFF",
        border: `1px solid ${darkMode ? "#30363D" : "#D0D7DE"}`,
        borderRadius: "12px",
        padding: "20px",
        color: darkMode ? "#E6EDF3" : "#1F2328"
    };

    return (
        <div style={{ maxWidth: "680px" }}>
            <Link
                to="/"
                style={{ color: "#0088AA", textDecoration: "none", fontSize: "14px" }}
            >
                ← Back to Search
            </Link>

            <div style={{ ...cardStyle, marginTop: "20px" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "20px" }}>
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        style={{ width: 80, height: 80, borderRadius: "50%", flexShrink: 0 }}
                    />
                    <div>
                        <h1 style={{ margin: "0 0 4px", fontSize: "22px",  color: darkMode ? "#E6EDF3" : "#1F2328" }}>
                            {user.name ?? user.login}
                        </h1>
                        <p style={{ margin: "0 0 8px", color: "#0088AA", fontSize: "14px" }}>
                            @{user.login}
                        </p>
                        {user.bio && (
                            <p style={{
                                margin: 0, fontSize: "14px",
                                color: darkMode ? "#8B949E" : "#656D76"
                            }}>
                                {user.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
                    {[
                        ["Repos", user.public_repos],
                        ["Followers", user.followers],
                        ["Following", user.following],
                    ].map(([label, val]) => (
                        <div key={label} style={{ textAlign: "center" }}>
                            <p style={{ margin: 0, fontWeight: "700", fontSize: "20px" }}>{val}</p>
                            <p style={{
                                margin: 0, fontSize: "12px",
                                color: darkMode ? "#8B949E" : "#656D76"
                            }}>
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
                {/* Info pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                    {user.location && <span>📍 {user.location}</span>}
                    {user.company && <span>🏢 {user.company}</span>}
                    {user.blog && <span>🔗 {user.blog}</span>}
                    {user.twitter_username && <span>🐦 @{user.twitter_username}</span>}
                </div>

                <Link
                    to={`/users/${username}/repos`}
                    style={{
                        display: "inline-block", padding: "10px 20px",
                        background: "#0088AA", color: "white",
                        borderRadius: "8px", textDecoration: "none",
                        fontWeight: "600", fontSize: "14px"
                    }}
                >
                    View Repositories ({user.public_repos})
                </Link>
            </div>
        </div>

    );
}
export default UserDetails