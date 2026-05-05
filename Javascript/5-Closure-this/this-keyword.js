// In a browser, this in global context = window object
/*
console.log(this);   // Window {...}


function showThis() {
    console.log(this);
}
showThis();  // Window {...} in browser, undefined in strict mode
*/
// ---------- try in browser for above ------------

/*
const person = {
    name: 'Lokesh',
    greet() {
        console.log('Hello, I am', this.name);
    }
};


person.greet();   // Hello, I am Lokesh
// this = person object - because greet was called ON person
*/


/*
// Arrow functions do NOT have their own "this"
// This is the most important rule. Arrow functions inherit this from their surrounding scope.
const person = {
    name: 'Lokesh',


    // Regular function - has its own this
    greetRegular: function() {
        console.log("old way", this.name);  // 'Lokesh' - works
    },


    // Arrow function - no own this, inherits from outer scope
    greetArrow: () => {
        console.log("=>", this.name);  // undefined - this = Window
    }
};


person.greetRegular();   // Lokesh
person.greetArrow();     // undefined
*/



// this with setTimeout (common bug)
const timer = {
    seconds: 0,


    // BUG - regular function loses this inside setTimeout
    startBroken() {
        setTimeout(function() {
            this.seconds++;             // this = Window, not timer
            console.log(this.seconds);  // NaN
        }, 1000);
    },


    // FIX - arrow function inherits this from startFixed
    startFixed() {
        setTimeout(() => {
            this.seconds++;             // this = timer object
            console.log(this.seconds);  // 1
        }, 1000);
    }
};


timer.startFixed();
