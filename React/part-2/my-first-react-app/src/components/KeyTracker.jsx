import { useState } from "react";

function KeyTracker() {
    const [lastKey, setLastKey] = useState('');
    const [keyCode, setKeyCode] = useState('')

    function handleKeyDown(event) {
        console.log(event);          // inspect the whole event object
        console.log(event.key);      // 'a', 'Enter', 'ArrowUp' etc
        console.log(event.keyCode);  // 65 for 'a'
        setLastKey(event.key);
        setKeyCode(event.keyCode)
    }


    return (
        <div>
            <input
                onKeyDown={handleKeyDown}
                placeholder='Press any key...'
                style={{ padding: '8px', fontSize: '16px' }}
            />
            <p>Last key pressed: <strong>{lastKey || 'none'} and key is {keyCode || 'none'}</strong></p>
        </div>
    );
}

export default KeyTracker;