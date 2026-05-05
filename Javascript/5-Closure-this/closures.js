// closures are how JS simulates Private variables - data that connot be accessed or modified outside
// Bank example
function createBankAccount (initialBalance, customerName) {
    let balance = initialBalance;  // private - cannot access directly
    let name = customerName

    return {
        deposot(amount) {
            balance += amount
            console.log(`Deposit of ${amount} is complete. The new balance is ${balance}`)
        },
        withdrawl(amount){
            if (balance < amount) {
                console.log(`Insufficient funds`);
                return // this will stop here
            }
            balance -= amount
            console.log(`Withdrawl of ${amount} is complete. The new balance is ${balance}`)
        },
        getBalance(){
            console.log(`Hi, ${name} your balance: ${balance}`)
            return 
        }
    }
}

let customer1 = createBankAccount(10000, "Lokesh")
customer1.getBalance()
customer1.deposot(20000)

let customer2 = createBankAccount(20000, "Rajesh")
customer2.getBalance()
customer2.deposot(20000)
customer2.getBalance();



// ----- IIFE ------
(function cal(){
    console.log("cal called")
})() //IIFE
