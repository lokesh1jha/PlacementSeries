// toFixed - round to decimal places (returns STRING)
let price = 123.4567;
console.log(price.toFixed(2));         // '123.46'
console.log(typeof price.toFixed(2));  // 'string'


// parseInt - string to integer
console.log(parseInt('42px2'));       // 42 (stops at non-number)
console.log(parseInt('3.9'));        // 3  (drops decimal)
console.log(parseFloat('3.9'));        // 3  (drops decimal)
console.log(parseInt('hello'));      // NaN


// parseFloat - string to decimal number
console.log(parseFloat('3.14px'));   // 3.14


// isNaN - is this Not a Number?
console.log(isNaN('hello'));   // true
console.log(isNaN(42));        // false
console.log(isNaN('42'));      // false (coerces to number)


// Number.isNaN - strict version (no coercion)
console.log(Number.isNaN('hello'));   // false (!)
console.log(Number.isNaN(NaN));       // true


// Number.isInteger
console.log(Number.isInteger(5));     // true
console.log(Number.isInteger(5.5));   // false


// Convert to number
console.log(Number('42'));     // 42
console.log(Number(''));       // 0
console.log(Number('hello')); // NaN
console.log(Number(true));    // 1
console.log(Number(false));   // 0

// WATCH OUT: toFixed() returns a STRING, not a number. This trips up many beginners. If you need the number, wrap it: Number(price.toFixed(2)). Also note isNaN vs Number.isNaN — they behave differently because isNaN does type coercion first.
