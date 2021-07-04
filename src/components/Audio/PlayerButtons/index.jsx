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
                <svg viewBox="0 0 358 323" fill="none">
                <path d="M71 4C128.2 -12.4 167.167 31.5 179.5 55.5C179.5 43.5 233 -18 293 7C341 27 355 66.6667 356 84C366.4 116.8 328 175.667 307.5 201C250.7 269 198.167 310.333 179 322.5C131.8 291.3 76.6667 232.833 55 207.5C12.2 161.1 0.833331 112.833 0.499997 94.5C0.166663 71.1667 13.8 20.4 71 4Z" fill="white"/>
                <path d="M287.247 4C230.047 -12.4 191.081 31.5 178.747 55.5C178.747 43.5 125.247 -18 65.2474 7C17.2474 27 3.24744 66.6667 2.24744 84C-8.15256 116.8 30.2474 175.667 50.7474 201C107.547 269 160.081 310.333 179.247 322.5C226.447 291.3 281.581 232.833 303.247 207.5C346.047 161.1 357.414 112.833 357.747 94.5C358.081 71.1667 344.447 20.4 287.247 4Z" fill="white"/>
                </svg>
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
