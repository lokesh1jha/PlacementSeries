
import { useState, useEffect } from 'react';

type ErrorMessageProps = {
    message: string;
    onRetry: () => void;
};

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div style={{
            background: '#FDECEA', border: '1px solid #F5C6C6',
            borderRadius: '10px', padding: '24px', textAlign: 'center'
        }}>
            <p style={{ fontSize: '32px', margin: '0 0 8px' }}>⚠️</p>
            <p style={{ color: '#8B0000', marginBottom: '16px' }}>{message}</p>
            <button
                onClick={onRetry}
                style={{
                    padding: '8px 20px', background: '#0088AA',
                    color: 'white', border: 'none',
                    borderRadius: '6px', cursor: 'pointer'
                }}
            >
                Try Again
            </button>
        </div>
    );
}

export default function ErrorPatterns() {
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    function fetchData() {
        setError(null);
        // Replace with real fetch logic.
        // For demo purposes, simulate an error state.
        setError('Unable to fetch data. Please try again.');
    }

    useEffect(() => {
        // retryCount in dependency array means
        // effect re-runs every time user clicks retry
        fetchData();
    }, [retryCount]);

    if (error) {
        return <ErrorMessage message={error} onRetry={() => setRetryCount(c => c + 1)} />;
    }

    return <div>Data loaded successfully.</div>;
}
