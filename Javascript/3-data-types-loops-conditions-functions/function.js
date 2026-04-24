// function greating(name){
//     console.log("Hello ", name)
// }

// greating("Ravi")
// greating("Lokesh")

const greatingArrowFunction = (name = 'Guest') => {
        console.log("Hello ", name)
}

greatingArrowFunction("Ravi")
greatingArrowFunction("Lokesh")
greatingArrowFunction()


//REST Parameter
const dynamicPar = (firstParam, ...restParam) => {
    console.log(restParam)
}

dynamicPar("Name","age")
dynamicPar("Name", "Public","age")
dynamicPar("Name")