import React from 'react';
import '../style.scss';

const PlayerButtons = ({ songsType, setSongsType, isFavorite }) => {
    
    const onValueChange = e => {
        setSongsType(e.target.value);
    }

    return (
        <form className='audio__buttons'>
            <label className='audio__btn'>
                <input
                    type="radio"
                    name='audioType'
                    value="list"
                    checked={songsType === "list"}
                    onChange={onValueChange}
                />
                <svg viewBox="0 0 406 304" fill="none">
                <rect x="106" y="304" width="80" height="300" rx="40" transform="rotate(-90 106 304)" fill="white"/>
                <circle cx="43" cy="264" r="40" fill="white"/>
                <rect x="103" y="80" width="80" height="300" rx="40" transform="rotate(-90 103 80)" fill="white"/>
                <circle cx="40" cy="40" r="40" fill="white"/>
                <rect x="106" y="192" width="80" height="300" rx="40" transform="rotate(-90 106 192)" fill="white"/>
                <circle cx="43" cy="152" r="40" fill="white"/>
                </svg>
            </label>
            <label className='audio__btn'>
                <input
                    type="radio"
                    name='audioType'
                    value="mix"
                    checked={songsType === "mix"}
                    onChange={onValueChange}
                />
                <svg viewBox="0 0 512 512"><g><path fill='white' d="m297.575 197.923c14.13-14.342 30.693-21.923 47.9-21.923h60.584l-23.03 23.029a24 24 0 0 0 33.942 33.942l64-64a24 24 0 0 0 0-33.942l-64-64a24 24 0 0 0 -33.942 33.942l23.03 23.029h-60.584c-35.925 0-68.858 18.069-92.555 48.078a188.625 188.625 0 0 1 24.28 51.641 108.261 108.261 0 0 1 20.375-29.796z"/><path fill='white' d="m188.452 314.077c-14.131 14.342-30.695 21.923-47.901 21.923h-92.551a24 24 0 0 0 0 48h92.551c35.924 0 68.858-18.069 92.555-48.078a188.625 188.625 0 0 1 -24.283-51.641 108.281 108.281 0 0 1 -20.371 29.796z"/><path fill='white' d="m416.971 279.029a24 24 0 0 0 -33.942 33.942l23.03 23.029h-60.584c-17.207 0-33.77-7.581-47.9-21.923-15.187-15.415-26.194-37.649-30.994-62.609-13.981-72.697-65.806-123.468-126.03-123.468h-92.551a24 24 0 0 0 0 48h92.551c17.206 0 33.77 7.581 47.9 21.923 15.186 15.414 26.193 37.649 30.993 62.609 13.981 72.696 65.806 123.468 126.031 123.468h60.584l-23.03 23.029a24 24 0 0 0 33.942 33.942l64-64a24 24 0 0 0 0-33.942z"/></g></svg>
            </label>
            {isFavorite && <label className='audio__btn'>
                <input
                    type="radio"
                    name='audioType'
                    value="favorite"
                    checked={songsType === "favorite"}
                    onChange={onValueChange}
                />
                <svg viewBox="0 0 358 323" fill="none">
                <path d="M71 4C128.2 -12.4 167.167 31.5 179.5 55.5C179.5 43.5 233 -18 293 7C341 27 355 66.6667 356 84C366.4 116.8 328 175.667 307.5 201C250.7 269 198.167 310.333 179 322.5C131.8 291.3 76.6667 232.833 55 207.5C12.2 161.1 0.833331 112.833 0.499997 94.5C0.166663 71.1667 13.8 20.4 71 4Z" fill="white"/>
                <path d="M287.247 4C230.047 -12.4 191.081 31.5 178.747 55.5C178.747 43.5 125.247 -18 65.2474 7C17.2474 27 3.24744 66.6667 2.24744 84C-8.15256 116.8 30.2474 175.667 50.7474 201C107.547 269 160.081 310.333 179.247 322.5C226.447 291.3 281.581 232.833 303.247 207.5C346.047 161.1 357.414 112.833 357.747 94.5C358.081 71.1667 344.447 20.4 287.247 4Z" fill="white"/>
                </svg>
            </label>}
        </form>
    )
}

export default PlayerButtons;
