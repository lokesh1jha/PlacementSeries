// Rounding
console.log(Math.round(4.5));    // 5
console.log(Math.ceil(4.1));     // 5  (always round up)
console.log(Math.floor(4.9));    // 4  (always round down)
console.log(Math.trunc(4.9));    // 4  (just remove decimal)
console.log(Math.trunc(-4.9));   // -4 (not -5 like floor would give)


// Min / Max
console.log(Math.max(3, 8, 1, 9, 4));    // 9
console.log(Math.min(3, 8, 1, 9, 4));    // 1


// With an array (use spread)
const nums = [3, 8, 1, 9, 4];
console.log(Math.max(...nums));   // 9


// Power and square root
console.log(Math.pow(2, 10));   // 1024
console.log(Math.sqrt(144));    // 12


// Absolute value
console.log(Math.abs(-42));     // 42


// Random - between 0 (inclusive) and 1 (exclusive)
console.log(Math.random());     // e.g. 0.7364...


// Random integer between min and max (inclusive)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomInt(1, 10));  // random number 1-10
