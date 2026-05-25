import { useState } from "react";

function Counter () {
    const [counter, setCounter] = useState(0)

    console.log("Counter updated, re-rendring: ", counter )
    return(
        <div>
            <h2>Count : {counter}</h2>
            <button onClick={() => setCounter(counter + 1)}> Increment</button>
            <button onClick={() => setCounter(counter - 1)}> Decrement</button>
            <button onClick={() => setCounter(0)}> Reset</button>
        </div>
    );

}

export default Counter;