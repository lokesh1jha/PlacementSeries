import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
        React User Dashboard
      </h1>
      <p style={{ color: "#666", marginBottom: "32px", fontSize: "16px" }}>
        A multi-page React app with routing, data fetching, and clean state.
      </p>
      <Link
        to="/users"
        style={{
          padding: "12px 32px",
          background: "#0088AA",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "15px"
        }}
      >
        View All Users
      </Link>
    </div>
    </>
  );
}

export default Home;
