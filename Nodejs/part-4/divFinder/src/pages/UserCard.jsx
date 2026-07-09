function UserCard({ user, darkMode }) {
    return (
        <div style={{
            background: darkMode ? "#161B22" : "#FFFFFF",
            border: `1px solid ${darkMode ? "#30363D" : "#D0D7DE"}`,
            borderRadius: "12px",
            padding: "20px",
            width: "200px",
            cursor: "pointer",
            transition: "border-color 0.15s"
        }}>
            <img
                src={user.avatar_url}
                alt={user.login}
                style={{ width: 56, height: 56, borderRadius: "50%", marginBottom: "12px" }}
            />
            <p style={{
                fontWeight: "600", fontSize: "14px",
                color: darkMode ? "#E6EDF3" : "#1F2328",
                margin: "0 0 4px"
            }}>
                {user.login}
            </p>

        </div>
    )
}

export default UserCard;