let tableof = 6
for(let i = 1; i <= 10; i++){
    console.log(`${tableof} X ${i} = ${tableof * (i)}`)
}

//while loop
let a = 3
while(a > 0){
    console.log(a, "HIIII")
    a--;
}

// for..of

let cities = ['Mumbai', 'Pune', 'Hyderabad']
for(let city of cities){
    console.log(city)
}

// for..in

let person = {
    name: "Lokesh",
    age: 25,
    city: 'Hyderabad'
};

for(let key in person){
    console.log(key, "--->", person[key])
}

// break
// continue

console.log("---------------------")

for(let i = 1; i <= 10; i++){
    if(i == 5){
        continue;
    }
    console.log(i)
}
console.log("---------------------")

for(let i = 1; i <= 10; i++){
    if(i == 5){
        break;
    }
    console.log(i)
}