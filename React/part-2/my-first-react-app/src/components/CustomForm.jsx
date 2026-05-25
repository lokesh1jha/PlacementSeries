// Forms submit and reload the page by default
// event.preventDefault() stops that

import { useState } from "react";


function SearchForm() {
    const [query, setQuery] = useState('');


    function handleSubmit(event) {
        event.preventDefault();   // stops page reload
        console.log('Searching for:', query);
        // do your search logic here
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search...'
            />
            <button type='submit'>Search</button>
        </form>
    );
}

export default SearchForm;