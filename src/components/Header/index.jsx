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
