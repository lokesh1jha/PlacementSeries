try {
    let result = 10 / 0;
    console.log(result);          // Infinity - no error here


    let obj = null;
    console.log(obj.name);        // TypeError! Goes to catch
    console.log('This never runs');
} catch (error) {
    console.log('Error caught!');
    console.log(error.message);   // Cannot read properties of null
    console.log(error.name);      // TypeError
} finally {
    console.log('This ALWAYS runs - error or not');
}


// Nested try/catch with specific handling
function parseUserData(jsonString) {
    try {
        const data = JSON.parse(jsonString);


        if (!data.name) {
            throw new Error('Name is required');
        }


        return data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log('Invalid JSON format:', error.message);
        } else {
            console.log('Validation error:', error.message);
        }
        return null;
    }
}


parseUserData('{"name": "Rahul"}');       // works
parseUserData('not valid json');              // Invalid JSON format
parseUserData('{"age": 22}');               // Validation error: Name is required

// Custom Errors with throw
//  You can throw your own errors using the throw keyword. Use Error, or extend it for custom error types.

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new RangeError('Cannot divide by zero');
    }
    return a / b;
}


try {
    console.log(divide(10, 2));    // 5
    console.log(divide(10, 0));    // throws RangeError
} catch (err) {
    console.log(`${err.name}: ${err.message}`);
    // RangeError: Cannot divide by zero
}


// Custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}


throw new ValidationError('Email is invalid', 'email');
// ValidationError: Email is invalid  (field: email)
// INTERVIEW: 'What is try/catch and when do you use it?' Answer: try/catch is JavaScript's error handling mechanism. Code that might throw an error goes in try. If an error occurs, execution jumps to catch where you handle it gracefully. finally runs regardless of whether an error occurred — useful for cleanup like closing connections. You throw custom errors using the throw keyword.
