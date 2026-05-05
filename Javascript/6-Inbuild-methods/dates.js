// Current date and time
const now = new Date();
console.log(now);                     // Wed Apr 29 2026...


// Get specific parts
console.log(now.getFullYear());        // 2026
console.log(now.getMonth());           // 0-11 (0 = January!)
console.log(now.getDate());            // 1-31 (day of month)
console.log(now.getDay());             // 0-6  (0 = Sunday)
console.log(now.getHours());           // 0-23
console.log(now.getMinutes());         // 0-59


// Format as readable string
console.log(now.toLocaleDateString()); // '4/29/2026'
console.log(now.toLocaleTimeString()); // '3:45:00 PM'
console.log(now.toISOString());        // '2026-04-29T10:15:00.000Z'


// Timestamp - milliseconds since Jan 1 1970
console.log(Date.now());               // e.g. 1745927700000


// Specific date
const birthday = new Date('1998-06-15');
console.log(birthday.getFullYear());   // 1998

// WATCH OUT: getMonth() returns 0-11, not 1-12. January is 0, December is 11. 
// This is a very common bug. Always add 1 when displaying 
// months: now.getMonth() + 1
