import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';


const navStyle = {
    display: "flex",
    gap: "8px",
    padding: "0 24px",
    height: "56px",
    alignItems: "center",
    background: "#1A3A4A",
    marginBottom: "0"

}

function linkStyle({ isActive }) {
    return {
        color: isActive ? "#61DAFB" : "#AACCDD",
        fontWeight: isActive ? "700" : "400",
        textDecoration: "none",
        padding: "6px 14px",
        borderRadius: "6px",
        background: isActive ? "rgba(97,218,251,0.1)" : "transparent",
        fontSize: "14px"
    };
}



function NavBar() {

    const { darkMode, toggleDarkMode } = useTheme()

    const bg = darkMode ? "#161B22" : "#1A3A4A";



    return (
        <nav style={navStyle}>
            <span style={{ color: "#61DAFB", fontWeight: "700", marginRight: "auto", fontSize: "16px" }}>
                DevFinder
            </span>
            <NavLink to="/" style={linkStyle} end>Search</NavLink>
            <NavLink to="/users" style={linkStyle}>Users</NavLink>
            <button
                onClick={toggleDarkMode}
                style={{
                    marginLeft: "16px",
                    background: "transparent",
                    border: "1px solid #AACCDD",
                    borderRadius: "6px",
                    color: "#AACCDD",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontSize: "14px"
                }}
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
        </nav>

    );
}

export default NavBar;