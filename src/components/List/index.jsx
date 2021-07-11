import React from 'react';
import Song from '../common/Song';
import './style.scss'

const List = ({ title, songs, changeFavorite }) => {
    return (
        <div className='list'>
            <div className="list__content">
                <h1 className="list__title">{ title }</h1>
                { songs.length !== 0
                ? <div className="list__body">    
                    {songs.map(song => <Song key={song.id} song={song} changeFavorite={changeFavorite} />)}
                </div>
                : <div className="list__empty">There aren't any songs</div>
                }
            </div>
        </div>
    )
}

export default List;
