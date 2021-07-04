import React from 'react';
import Song from '../common/Song';
import './style.scss'

const List = ({ songs, changeFavorite }) => {
    return (
        <div className='list'>
            <div className="list__content">
                <h1 className="list__title">Music list</h1>
                <div className="list__body">
                    {songs.map(song => <Song key={song.id} song={song} changeFavorite={changeFavorite} />)}
                </div>
            </div>
        </div>
    )
}

export default List;
