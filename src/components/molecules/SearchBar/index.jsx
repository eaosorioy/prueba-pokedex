import './SearchBar.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        navigate(`/pokemon/${inputValue}`);
    }

    return (
        <div className="pokemon-search">
            <form onSubmit={onSubmit}>
                <input
                    className="pokemon-search__input"
                    placeholder="Search a Pokemon"
                    data-testid="search"
                    type="search"
                    name="search"
                    onChange={(e) => setInputValue(e.target.value) }
                    value={inputValue}
                />
                <button className="pokemon-search__button" type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;
