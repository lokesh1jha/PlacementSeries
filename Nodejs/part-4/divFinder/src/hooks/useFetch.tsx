import {useState, useEffect} from 'react';

export default function useFetch(url: string | null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) {
            setData(null);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(url, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(
                            text.startsWith('<!')
                                ? `GitHub returned an HTML page — the URL may be invalid or rate-limited (${response.status})`
                                : `Request failed (${response.status})`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setError(null);
            })
            .catch((err: Error) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
}