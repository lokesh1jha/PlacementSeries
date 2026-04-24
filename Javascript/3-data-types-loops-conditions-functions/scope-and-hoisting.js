// scope and hoisting

let globalVar = "I am Global"

function myFunction() {
    //Local scope - only accessible inside this function
    let localVar = "I am Local"
    console.log(localVar)
    console.log(globalVar)
}

myFunction()
console.log(globalVar)
// console.log(localVar) // not accessible as the var is out of scope


//hoisting
console.log(a)
var a = 32
console.log(a)


// console.log(b)
let b = 32
console.log(b)


