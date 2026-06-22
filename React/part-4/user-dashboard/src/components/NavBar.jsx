import { NavLink } from 'react-router-dom';

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
    return (
        <nav style={navStyle}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/welcome" style={linkStyle}>Welcome</NavLink>
            <NavLink to="/users" style={linkStyle}>Users List</NavLink>
        </nav>
    );
}

export default NavBar;