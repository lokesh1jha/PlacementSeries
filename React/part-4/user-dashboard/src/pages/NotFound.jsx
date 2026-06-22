function NotFound() {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => window.history.back()} style={{
                marginTop: '20px', padding: '10px 20px',
                background: '#007BFF', color: '#fff',
                border: 'none', borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Go Back
            </button>
        </div>
    );
}
export default NotFound;