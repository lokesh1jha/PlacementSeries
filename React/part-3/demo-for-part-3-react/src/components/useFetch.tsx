import {useState, useEffect} from 'react';

export default function useFetch(url:string) { 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
}