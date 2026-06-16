import { useEffect, useState } from 'react'

type User = {
    id: number,
    name: string,
    email: string
}
export default function UserDetail() {
    const [user, setUser] = useState<User | null>(null)
    const [id, setId] = useState(1)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => response.json())
            .then((data) => setUser(data as User))
            .catch((error) => {
                console.error('Error fetching user:', error)
                setError('Error fetching user')
            })
    }, [id])

    useEffect(() => {
        console.log('User ID changed:', id)
    }, [id])

    useEffect(() => {
        const controller = new AbortController();


        async function fetchUser() {
            try {
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${id}`,
                    { signal: controller.signal }  // link to controller
                );
                const data = await res.json();
                setUser(data);
            } catch (err:any) {
                if (err.name === 'AbortError') return; // ignore cancelled requests
                setError(err.message);
            }
        }


        fetchUser();


        // Cleanup: cancel the previous fetch when userId changes
        return () => controller.abort();


    }, [id]);

    return (
        <div>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value as unknown as number)}
                min="-1"
                max="100"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && (
                <>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </>
            )}
        </div>
    )

}
