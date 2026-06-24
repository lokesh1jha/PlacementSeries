import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RepoCard from "../components/RepoCard";
import { useTheme } from "../context/ThemeContext";


function UsersRepos() {
    const { username } = useParams();
    const { darkMode } = useTheme();

    const { data: repos, loading, error } = useFetch(
        `https://api.github.com/users/${username}/repos`
    );

    if (loading) {
        return (
            <p> Loading User's Repositories...</p>
        )
    }

    if (error) {
        return (
            <p style={{ color: "red" }}>Error: {error}</p>
        )
    }

    if (!repos) {
        return null;
    }


    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <Link
                    to={`/users/${username}`}
                    style={{ color: "#0088AA", textDecoration: "none", fontSize: "14px" }}
                >
                    ← Back to {username}
                </Link>
                <h1 style={{ margin: 0, fontSize: "20px" }}>{username} — Repositories</h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {repos?.map(repo => (
                    <RepoCard key={repo.id} repo={repo} darkMode={darkMode} />
                ))}
            </div>

            {repos?.length === 0 && (
                <p style={{ color: darkMode ? "#8B949E" : "#656D76" }}>
                    No public repositories.
                </p>
            )}
        </div>
    )
}

export default UsersRepos;