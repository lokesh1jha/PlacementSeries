// ?? 

let userName = 'Lokesh'
let name = userName ?? 'Guest'
console.log(name)

console.log(0 ?? 10)
console.log('' ?? "Lokesh")

console.log("------- OR --------")

console.log(0 || 10)
console.log('' || "Lokesh")
// ** 



// chaining

let newName = null
let profile = {
    name: "lokesh",
    age : 25
}

console.log(newName) // Lokesh
console.log(newName?.value) //undefined
