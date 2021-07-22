import React from 'react';
import SearchInput from '../common/SearchInput';
import Song from '../common/Song';
import './style.scss'

const List = ({ title, songs, changeFavorite, isFind, searchInputValue, isPlayId, setIsPlayId }) => {
    return (
        <div className='list'>
            <div className="list__content">
                <h1 className="list__title">{ title }</h1>
                {isFind && <SearchInput searchInputValue={searchInputValue} />}
                { songs.length !== 0
                ? <div className="list__body">    
                    {songs.map(song => <Song key={song.id} song={song} changeFavorite={changeFavorite} isPlayId={isPlayId} setIsPlayId={setIsPlayId} />)}
                </div>
                : <div className="list__empty">There aren't any songs</div>
                }
            </div>
        </div>
    )
}

export default List;
