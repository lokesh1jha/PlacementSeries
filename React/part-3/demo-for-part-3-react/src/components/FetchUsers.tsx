import { useEffect, useState } from 'react'

export default function FetchUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error))
  }, [])
  

    return ( 
        <ul>
            {users.map((user:any) => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    )

}
