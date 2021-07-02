import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => {
    const [searchValue, setSearchValue] = React.useState('');

    const onSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <header className='header'>
            <div className="header__content container">
                <div className="header__main">
                    <Link to='/' className="header__logo">Music Mix</Link>
                    <div className="header__search">
                        <input 
                            className="header__input"
                            type="text"
                            placeholder='Search music'
                            value={searchValue}
                            onChange={onSearchInputChange}
                        />
                        <button className="header__btn">
                        <svg viewBox="0 0 270 281">
                        <circle cx="170" cy="100" r="87.5" fill='none' stroke="#0B032D" strokeWidth="25"/>
                        <rect x="105.287" y="158" width="25" height="148.898" rx="12.5" transform="rotate(45 105.287 158)" fill="#0B032D"/>
                        </svg>
                        </button>
                    </div>
                </div>
                <div className="header__buttons">
                    <Link to='/favorites' className="header__button header__button_heart">
                        <svg viewBox="0 0 358 323" fill="none">
                        <path d="M71 4C128.2 -12.4 167.167 31.5 179.5 55.5C179.5 43.5 233 -18 293 7C341 27 355 66.6667 356 84C366.4 116.8 328 175.667 307.5 201C250.7 269 198.167 310.333 179 322.5C131.8 291.3 76.6667 232.833 55 207.5C12.2 161.1 0.833331 112.833 0.499997 94.5C0.166663 71.1667 13.8 20.4 71 4Z" fill="white"/>
                        <path d="M287.247 4C230.047 -12.4 191.081 31.5 178.747 55.5C178.747 43.5 125.247 -18 65.2474 7C17.2474 27 3.24744 66.6667 2.24744 84C-8.15256 116.8 30.2474 175.667 50.7474 201C107.547 269 160.081 310.333 179.247 322.5C226.447 291.3 281.581 232.833 303.247 207.5C346.047 161.1 357.414 112.833 357.747 94.5C358.081 71.1667 344.447 20.4 287.247 4Z" fill="white"/>
                        </svg>
                    </Link>
                    <Link to='/list' className="header__button header__button_list">
                        <svg viewBox="0 0 406 304" fill="none">
                        <rect x="106" y="304" width="80" height="300" rx="40" transform="rotate(-90 106 304)" fill="white"/>
                        <circle cx="43" cy="264" r="40" fill="white"/>
                        <rect x="103" y="80" width="80" height="300" rx="40" transform="rotate(-90 103 80)" fill="white"/>
                        <circle cx="40" cy="40" r="40" fill="white"/>
                        <rect x="106" y="192" width="80" height="300" rx="40" transform="rotate(-90 106 192)" fill="white"/>
                        <circle cx="43" cy="152" r="40" fill="white"/>
                        </svg>
                    </Link>
                    <Link to='/add' className="header__button header__button_add">
                        <svg viewBox="0 0 300 300" fill="none">
                        <rect x="110" width="80" height="300" rx="40" fill="white"/>
                        <rect y="190" width="80" height="300" rx="40" transform="rotate(-90 0 190)" fill="white"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;
