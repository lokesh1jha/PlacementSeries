// Javascript part 3

let fruits = ['apple', 'orange', 'kiwi']
let numbers = [1, 2, 4, 33, 222, -1]
let mixed = ['apple', 2, 3, 4]

console.log(fruits)
console.log(numbers)
console.log(mixed)

console.log(fruits[0])
console.log(numbers[2])
console.log(mixed[4])

console.log(fruits.length)

fruits.push("mango") // push element at last position

console.log(fruits.length)
console.log(fruits)

fruits.unshift("banana")// push element at the first or starting position

console.log(fruits) 

//for loop is covered in previous video 
for( let i = 0 ; i < fruits.length; i++){
    console.log(`The ${i+1} position fruit is ${fruits[i]}`)
}

//remove element from an array
fruits.pop() // deletes the last element in array
console.log(fruits)

fruits.shift() // deletes the firts element in array
console.log(fruits)

console.log("---------------------SPLICE and SLICE---------------------")
// splice (original array gets changed) and slice (original array doesn't gets changed)

let cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Pune']

// splice(startIndex, deleteCount, ...itemsToAdd)
// remove 2 elemenets starting at index 1
const deletedElements = cities.splice(1, 2)
console.log(deletedElements)
console.log(cities)

cities.splice(1, 0, 'Bangalore')
console.log(cities)


//slice (startIndex, endIndex) ** endIndex is not take
let deleted = cities.slice(1, 3)
console.log("sliced result" , deleted)
console.log(cities) // not changing the original array