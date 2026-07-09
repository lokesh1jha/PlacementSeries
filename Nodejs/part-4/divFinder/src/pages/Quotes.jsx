import useFetch from "../hooks/useFetch";

const BACKEND_URL = import.meta.env.VITE_API_QUOTE_URL || "http://localhost:3000";

function Quotes() {

    const { data: quotes, loading, error } = useFetch(
        `${BACKEND_URL}/quotes`
    );
    return (
        <div className="container">
            <h1>Quotes Page</h1>
            {loading && <p>Loading Quotes...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {quotes && (
                <ul>
                    {quotes.map((quote) => (
                        <li key={quote.id}>{quote.text}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Quotes;