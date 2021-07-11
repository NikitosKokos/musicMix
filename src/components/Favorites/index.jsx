import React from 'react';
import List from '../List';

const Favorites = ({ songs, changeFavorite }) => {
    return (
    <List 
        title='Music favorites'
        songs={songs.filter(song => song.favorite)}
        changeFavorite={changeFavorite}
    />)
}

export default Favorites;
