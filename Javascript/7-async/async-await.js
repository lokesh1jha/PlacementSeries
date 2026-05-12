// Same operation - 3 ways to write it


// Way 1: Callbacks (old)
getUser(1, function(user) {
    console.log(user.name);
});


// Way 2: Promises
getUser(1)
    .then(user => console.log(user.name));


// Way 3: async/await (cleanest)
async function showUser() {
    const user = await getUser(1);
    console.log(user.name);
}
showUser();











// async and await Keywords
//  Two rules. 
// First — any function that uses await must be declared with the async keyword. 
// Second — await pauses the function and waits for the Promise to resolve before moving to the next line.

// async keyword makes a function return a Promise automatically
async function greet() {
    return 'Hello';
}


greet().then(msg => console.log(msg));   // Hello
// even though we returned a plain string,
// async wraps it in a Promise automatically


// ─────────────────────────────────────────


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function runSteps() {
    console.log('Step 1 starts');
    await delay(1000);                // waits 1 second
    console.log('Step 2 - after 1s');
    await delay(1000);                // waits another second
    console.log('Step 3 - after 2s');
}


runSteps();
console.log('This runs immediately - does not wait for runSteps');

//  Run this live and show the output. The key insight: await only pauses the async function itself. The rest of the program continues running. Show that 'This runs immediately' appears before 'Step 2' even though it is written after the function call.



















//  Error Handling with try/catch
//  With Promises you used .catch(). With async/await you use try/catch — 
// the same error handling we covered in Part 4. This is more natural and works exactly the same way.

async function getUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);


        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }


        const user = await response.json();
        console.log('User:', user.name);
        return user;


    } catch (error) {
        console.log('Failed to get user:', error.message);
        return null;
    } finally {
        console.log('Request finished');
    }
}


getUserData(1);    // works
getUserData(999);  // user might not exist

// WATCH OUT: Always wrap await calls in try/catch. 
// If you do not, and the Promise rejects, you will get an unhandled Promise rejection error. 
// In React, unhandled async errors can crash your component.




















//  Running Promises in Parallel with async/await
//   A common mistake beginners make with async/await is running things sequentially when they could run in parallel.

// SLOW - runs one after another (sequential)
async function slowVersion() {
    const users    = await fetchUsers();     // wait...
    const products = await fetchProducts();  // then wait again...
    // Total time = time for users + time for products
}


// FAST - runs both at the same time (parallel)
async function fastVersion() {
    const [users, products] = await Promise.all([
        fetchUsers(),
        fetchProducts()
    ]);
    // Total time = max(time for users, time for products)
}

//  If the two fetches each take 1 second, the slow version takes 2 seconds total. The fast version takes 1 second. When these are independent operations — always use Promise.all.
// INTERVIEW: 'How do you run multiple async operations in parallel with async/await?' Answer: Use await Promise.all([promise1, promise2, ...]). Avoid using sequential awaits for independent operations as this runs them one after another, wasting time. Promise.all runs them simultaneously and waits for all to complete.

