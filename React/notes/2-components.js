// A component is a function that returns JSX
// Component names MUST start with a capital letter
function Button() {
    return <button>Click me!!</button>; //returns JSX
}


// Use it like an HTML tag
function App() {
    return (
        <div>
            <Button />
            <Button />
            <Button />
        </div>
    );
}


// WATCH OUT: Component names MUST start with a capital letter. 
// <button> renders an HTML button element. 
// <Button> renders your custom Button component. 
// This is how React tells the difference.





// Functional Components (Modern React)

// Arrow function component (most common style in 2026)
const Greeting = () => {
    return <h1>Hello World</h1>;
};


// Shorter with implicit return (when JSX fits in one expression)
const Greeting = () => <h1>Hello World</h1>;


// Function declaration style (also valid)
function Greeting() {
    return <h1>Hello World</h1>;
}


// All three work the same way
// Arrow function style is most common in modern React






// Building a Real Component Structure
// in code



//Props rule
// Rule 1: Props are READ ONLY - never modify props
const UserInfo = ({ name }) => {
    // WRONG - never modify a prop
    // name = name.toUpperCase();  // this is mutation - don't do it


    // CORRECT - create a new variable if you need a transformed version
    const displayName = name.toUpperCase();
    return <h2>{displayName}</h2>;
};


// Rule 2: Props flow DOWN only (parent to child)
// App -> ProfileCard -> UserInfo -> (UserInfo cannot send data back up directly)


// Rule 3: Any JavaScript value can be a prop
// Strings, numbers, booleans, arrays, objects, functions, even other components
<ProfileCard
    name='Lokesh'           // string
    age={27}                // number - use {} not quotes
    isActive={true}         // boolean
    skills={['JS', 'React']}// array
    user={userObject}       // object
    onClick={handleClick}   // function
/>


//INTERVIEW: 'What are props in React?' Answer: Props (properties) are the mechanism for passing data from a parent component to a child component. They are read-only — a child cannot modify its own props. They flow in one direction — parent to child. Any JavaScript value can be passed as a prop: strings, numbers, booleans, arrays, objects, and functions. Props are how you make components reusable with different data.

