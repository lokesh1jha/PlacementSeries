// call

function introduce(city, company) {
    console.log(`I am ${this.name} from ${city}, I work at ${company}`);
}


const person1 = { name: 'Rahul' };
const person2 = { name: 'Priya' };
const person3 = {name: "Alex"}

// call(thisValue, arg1, arg2, ...)
introduce.call(person1, 'Delhi', 'TCS');
// I am Rahul from Delhi, I work at TCS

let address = ['Mumbai', 'Infosys']
introduce.apply(person2, address);
// I am Priya from Mumbai, I work at Infosys

// I am Rahul from Delhi, I work at TCS
// I am Priya from Mumbai, I work at Infosys

const person3call = introduce.bind(person3, 'Mumbai', 'Infosys')


person3call()


/*
'What is the difference between call, apply and bind?' is a top interview question. 
Answer: All three set the value of this manually. 
call invokes the function immediately with arguments passed one by one. 
apply invokes immediately but arguments are passed as an array. 
bind does NOT invoke — it returns a new function with this permanently set, which you can call later.
*/