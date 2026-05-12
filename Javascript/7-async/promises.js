// A Promise has 3 states:
// 1. Pending   - initial state, result not known yet
// 2. Fulfilled - operation completed successfully
// 3. Rejected  - operation failed


// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    // async work happens here
    const success = true;


    if (success) {
        resolve('Operation succeeded!');   // fulfilled
    } else {
        reject('Something went wrong!');   // rejected
    }
});


// Consuming a Promise
myPromise
    .then(result => {
        console.log('Success:', result);  // 'Operation succeeded!'
    })
    .catch(error => {
        console.log('Error:', error);
    })
    .finally(() => {
        console.log('Always runs');  // cleanup, hide loading spinner
    });

// Real Example: Simulating an API Call
//  Let us write a realistic example — a function that simulates fetching user data from a server with a delay.

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log('Fetching user data...');


        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'Rahul Sharma',
                    email: 'rahul@example.com'
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1500);  // simulates network delay
    });
}


// Using the Promise
getUserData(1)
    .then(user => {
        console.log('User received:', user.name);
        return user;  // can return value for next .then
    })
    .then(user => {
        console.log('Email:', user.email);
    })
    .catch(error => {
        console.log('Error:', error.message);
    });


// Try with invalid ID
getUserData(-1)
    .then(user => console.log(user))
    .catch(error => console.log('Caught:', error.message));
    // Caught: Invalid user ID

// Notice how .then() chains are flat — no nesting. Compare this to the callback hell example. Same logic, completely readable.






//  Promise Chaining
// Each .then() can return a value or a new Promise. This is how you chain multiple async operations without nesting.

// Solving callback hell with Promise chaining
getUser(userId)
    .then(user => {
        console.log('Got user:', user.name);
        return getOrders(user.id);       // return next Promise
    })
    .then(orders => {
        console.log('Got orders:', orders.length);
        return getOrderDetails(orders[0].id);
    })
    .then(details => {
        console.log('Got details:', details);
        return getPayment(details.paymentId);
    })
    .then(payment => {
        console.log('Got payment:', payment);
    })
    .catch(error => {
        // ONE catch handles ALL errors from any step above
        console.log('Something failed:', error.message);
    });

// Same logic as the callback hell example — but completely flat. And one single .catch at the end handles any error from any step. This is massively better.







// Promise.all() and Promise.race()
//  What if you need to run multiple async operations at the same time and wait for all of them?

// Promise.all - run multiple promises in PARALLEL
// Waits for ALL to finish. Fails if ANY one fails.


const p1 = fetch('https://api.example.com/users');
const p2 = fetch('https://api.example.com/products');
const p3 = fetch('https://api.example.com/orders');


Promise.all([p1, p2, p3])
    .then(([users, products, orders]) => {
        console.log('All data received');
        console.log(users, products, orders);
    })
    .catch(error => {
        console.log('One of them failed:', error);
    });


// ─────────────────────────────────────────


// Promise.race - resolves/rejects with the FIRST one to finish


const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 100));
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 500));


Promise.race([fast, slow])
    .then(result => console.log('Winner:', result));
    // Winner: fast




    
// REAL WORLD: Promise.all is used constantly in real apps when you need to load multiple things 
// at the same time — like loading user data AND their settings AND their notifications all at 
// once before showing the dashboard. Running them in parallel is faster than running them one after another.
// INTERVIEW: 'What is the difference between Promise.all and Promise.race?' 
// Answer: Promise.all takes an array of promises and resolves when ALL of them resolve 
// (with an array of all results). If ANY one rejects, the whole thing rejects. Promise.race resolves or 
// rejects as soon as the FIRST promise settles, ignoring the rest.
