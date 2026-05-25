// Rule 1 — className not class
// HTML:  <div class='container'>
// JSX:   <div className='container'>


// 'class' is a reserved word in JavaScript
// React uses className instead
function Card() {
    return <div className='card'>Hello</div>;
}





// Rule 2 — Must return one root element
// WRONG - two sibling elements at root level
function Bad() {
    return (
        <h1>Title</h1>
        <p>Paragraph</p>   // ERROR
    );
}


// CORRECT - wrap in one parent element
function Good() {
    return (
        <div>
            <h1>Title</h1>
            <p>Paragraph</p>
        </div>
    );
}


// ALSO CORRECT - use Fragment to avoid extra div
function AlsoGood() {
    return (
        <>
            <h1>Title</h1>
            <p>Paragraph</p>
        </>
    );
}

// The empty tags <> and </> are called a Fragment. They group elements without adding an extra div to the DOM. 
// Use fragments when you do not want an unnecessary wrapper div.








// Rule 3 — Self-closing tags must close
// HTML allows:  <input>  <img>  <br>
// JSX requires: <input />  <img />  <br />


// WRONG
function Bad() {
    return <input type='text'>;   // ERROR in JSX
}


// CORRECT
function Good() {
    return <input type='text' />;
}






{/* Rule 4 — JavaScript inside JSX goes in curly braces {} */}
function Greeting() {
    const name = 'Lokesh';
    const age  = 27;
    const isLoggedIn = true;


    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Age: {age}</p>
            <p>2 + 2 = {2 + 2}</p>
            <p>Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
            <p>Uppercase: {name.toUpperCase()}</p>
        </div>
    );
}

{/* Curly braces are the bridge between JSX and JavaScript. Inside {}, you can put any valid JavaScript expression — variables, calculations, ternaries, function calls. Just no if/else statements or loops directly. */}
{/* JS CONNECTION: Template literals from JS Part 3 are similar — you used ${} to embed JavaScript inside strings. JSX curly braces {} do the same thing but inside markup. */}








{/* Rule 5 — Inline styles use an object, not a string */}
// HTML:   <div style='color: red; font-size: 16px'>


// JSX:    style takes a JavaScript OBJECT
//         property names are camelCase
function Styled() {
    const styles = {
        color: 'red',
        fontSize: '16px',      // not font-size
        backgroundColor: 'yellow',  // not background-color
        padding: '10px 20px'
    };


    return <div style={styles}>Styled text</div>;


    // Or inline:
    // return <div style={{ color: 'red', fontSize: '16px' }}>Styled text</div>;
    // Note the double curly braces - outer {} is JSX expression
    //                               - inner {} is the JS object
}



{/* WATCH OUT: Double curly braces {{ }} for inline styles confuse every beginner. The outer {} is the JSX expression wrapper. The inner {} is the JavaScript object literal. They are two separate things. */}
{/* INTERVIEW: 'What are the differences between JSX and HTML?' Key answers: 1. className instead of class. 2. Must have one root element (or Fragment). 3. Self-closing tags must have />. 4. JavaScript expressions go in {} curly braces. 5. Style takes a JavaScript object with camelCase properties, not a CSS string. */}
