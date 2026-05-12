// // setTimeout - run once after a delay (milliseconds)
// console.log('Before timeout');


// setTimeout(() => {
//     console.log('Runs after 2 seconds');
// }, 2000);


// console.log('After timeout setup');


// Output:
// Before timeout
// After timeout setup
// Runs after 2 seconds


// setInterval - run repeatedly at interval
let count = 0;
console.log('Before tick');

const intervalId = setInterval(() => {
    count++;
    console.log('Tick:', count);


    if (count === 5) {
        clearInterval(intervalId);  // stop it
        console.log('Stopped!');
    }
}, 2000);

console.log('After tick');
