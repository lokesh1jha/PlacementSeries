// fetch() Basics — GET Request
// The fetch function is built into the browser. It makes HTTP requests and returns a Promise.

// Basic fetch - GET request
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
        console.log('Status:', response.status);    // 200
        console.log('OK?', response.ok);            // true
        return response.json();  // parse JSON - also returns a Promise
    })
    .then(user => {
        console.log('Name:', user.name);
        console.log('Email:', user.email);
    })
    .catch(error => {
        console.log('Fetch failed:', error.message);
    });

//  WATCH OUT: fetch() only rejects the Promise for network errors (no connection, DNS failure). 
// A 404 or 500 response does NOT cause .catch() to run. 
// You must manually check response.ok or response.status. This is the most common fetch mistake.

// CORRECT way - always check response.ok
fetch('https://jsonplaceholder.typicode.com/users/999')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(user => console.log(user))
    .catch(error => console.log('Error:', error.message));















    // fetch() with async/await
// The same fetch call written with async/await — this is how you will write it in React.

async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);


        if (!response.ok) {
            throw new Error(`User not found. Status: ${response.status}`);
        }


        const user = await response.json();
        return user;


    } catch (error) {
        console.error('getUser failed:', error.message);
        throw error;  // re-throw so the caller knows it failed
    }
}


// Usage
async function displayUser() {
    const user = await getUser(1);
    if (user) {
        console.log(`${user.name} | ${user.email} | ${user.address.city}`);
    }
}


displayUser();











// POST Request — Sending Data
//  GET fetches data. POST sends data to a server — like submitting a form or creating a new record.

async function createUser(userData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // IMPORTANT - tell server format
            },
            body: JSON.stringify(userData),  // convert object to JSON string
        });


        if (!response.ok) {
            throw new Error(`Failed to create user: ${response.status}`);
        }


        const newUser = await response.json();
        console.log('Created user:', newUser);
        return newUser;


    } catch (error) {
        console.error('createUser failed:', error.message);
    }
}


createUser({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    city: 'Bangalore'
});

// Three key things for a POST request: method set to POST, headers telling the server you are sending JSON, and body containing the data as a JSON string. Run this and show the response in the console. JSONPlaceholder returns the created object with a fake ID.
// REAL WORLD: In React, you will write fetch POST requests exactly like this when users submit forms — login forms, registration forms, contact forms. The pattern is identical. Learning it here means you already know it for React.
// INTERVIEW: 'How do you make a POST request with fetch?' Answer: Pass a second argument to fetch with: method: 'POST', headers: { 'Content-Type': 'application/json' }, and body: JSON.stringify(data). Always check response.ok because fetch only throws for network errors, not 4xx/5xx status codes.

