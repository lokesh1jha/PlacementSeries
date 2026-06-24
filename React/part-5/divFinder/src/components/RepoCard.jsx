function RepoCard({ repo, darkMode }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
        >
            <div style={{
                background: darkMode ? "#161B22" : "#FFFFFF",
                border: `1px solid ${darkMode ? "#30363D" : "#D0D7DE"}`,
                borderRadius: "8px",
                padding: "16px 20px"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <p style={{
                            margin: "0 0 4px", fontWeight: "600", fontSize: "14px", color: "#0088AA"
                        }}>
                            {repo.name}
                        </p>
                        {repo.description && (
                            <p style={{
                                margin: 0, fontSize: "13px",
                                color: darkMode ? "#8B949E" : "#656D76"
                            }}>
                                {repo.description}
                            </p>
                        )}
                    </div>
                    <div style={{
                        display: "flex", gap: "12px", fontSize: "12px",
                        color: darkMode ? "#8B949E" : "#656D76", flexShrink: 0, marginLeft: "16px"
                    }}>
                        <span>⭐ {repo.stargazers_count}</span>
                        <span>🍴 {repo.forks_count}</span>
                    </div>
                </div>
                {repo.language && (
                    <span style={{
                        display: "inline-block", marginTop: "10px",
                        padding: "2px 8px", borderRadius: "12px",
                        background: darkMode ? "#1F2937" : "#F3F4F6",
                        fontSize: "11px", fontWeight: "600",
                        color: darkMode ? "#9CA3AF" : "#374151"
                    }}>
                        {repo.language}
                    </span>
                )}
            </div>
        </a>
    );
}

export default RepoCard;