let str = '  Hello, JavaScript World!  ';


// trim - remove whitespace from both ends
console.log(str.trim());             // 'Hello, JavaScript World!'


// toUpperCase / toLowerCase
console.log('hello'.toUpperCase());  // 'HELLO'
console.log('HELLO'.toLowerCase());  // 'hello'


// includes - does string contain this?
console.log('Hyderabad'.includes('bad'));   // true


// startsWith / endsWith
console.log('hello world'.startsWith('hello'));  // true
console.log('hello world'.endsWith('world'));    // true


// indexOf - position of first match (-1 if not found)
console.log('JavaScript'.indexOf('Script'));     // 4
console.log('JavaScript'.indexOf('python'));     // -1


// replace / replaceAll
console.log('I love cats. Cats are great.'.replace('cats', 'dogs'));
// 'I love dogs. Cats are great.'  (only first match)
console.log('ha ha ha'.replaceAll('ha', 'ho'));
// 'ho ho ho'


// split - string to array
console.log('a,b,c,d'.split(','));   // ['a', 'b', 'c', 'd']
console.log('hello'.split(''));      // ['h','e','l','l','o']


// slice - extract substring
console.log('JavaScript'.slice(0, 4));    // 'Java'
console.log('JavaScript'.slice(-6));      // 'Script'


// padStart / padEnd - pad to a length
console.log('5'.padStart(3, '0'));   // '005'  (useful for IDs)


// repeat
console.log('ha'.repeat(3));         // 'hahaha'

// INTERVIEW: Most commonly asked string methods in interviews: split (convert to array), trim (remove whitespace), includes (check existence), replace/replaceAll, toUpperCase/toLowerCase, and slice. Know what each returns — most return a new string, they do NOT modify the original.
