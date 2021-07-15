import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

const SearchInput = ({ hideSearch, searchInputValue }) => {
    const [searchValue, setSearchValue] = React.useState(searchInputValue ? searchInputValue :'');
    const history = useHistory();

    const onSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const searchSong = (e) => {
        e.preventDefault();
        if(searchValue){
            history.push(`/find/${searchValue}`);
            setSearchValue('');
            if(hideSearch) hideSearch();
        }
    }

    return (
        <form onSubmit={searchSong} className={`search ${searchInputValue ? 'search_list' : ''}`}>
            <input 
                className="search__input"
                type="text"
                placeholder='Search music'
            value={searchValue}
                onChange={onSearchInputChange}
            />
            <button className="search__btn">
            <svg viewBox="0 0 270 281">
            <circle cx="170" cy="100" r="87.5" fill='none' stroke="#0B032D" strokeWidth="25"/>
            <rect x="105.287" y="158" width="25" height="148.898" rx="12.5" transform="rotate(45 105.287 158)" fill="#0B032D"/>
            </svg>
            </button>
        </form> 
    )
}

export default SearchInput;
