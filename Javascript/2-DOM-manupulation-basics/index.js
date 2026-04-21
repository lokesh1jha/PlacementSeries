const button = document.querySelector('button');

const input = document.querySelectorAll("input")


button.addEventListener("click", (e) => {
    e.preventDefault();
    const name = input[1].value
    const email = input[0].value

    
    // console.log(input[0].value, "test 1")
    // console.log(input[1].value, "test 1")
    alert("Hi " +  name +  " your email " +  email +  " is registered succeessfully.")
})



