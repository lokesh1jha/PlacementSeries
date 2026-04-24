let marks = 34

// Grading by if else 

if(marks < 40){
    console.log("C")
}else if(marks < 80){
    console.log("B")
}else if(marks <= 90){
    console.log("A")
}else {
    console.log("A+")
}

// Ternary operator

let age = 20
let status = age > 20
console.log(status ? "Adult" : "Child")

// switch condition

let day = "Tuesday"

switch(day) {
    case "Monday":
    case "Tuesday":
        console.log("Start of the Week")
        break;
    case "Friday": 
        console.log("End of the working day")
        break;
    default:
        console.log("Party")
        break;
}