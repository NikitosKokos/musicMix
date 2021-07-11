import React from 'react';
import "nouislider/distribute/nouislider.css";
import './style.scss';
import Player from './Player';
import PlayerButtons from './PlayerButtons';

const Audio = ({ currentAudioIndex, songs, changeAudioIndex, changeFavorite, songsType, setSongsType, songsArr, setSongsArr }) => {
    const [prevSongsType, setPrevSongsType] = React.useState(null);

    React.useEffect(() => {
        changeSongsArray();
    }, []);
    
    React.useEffect(() => {
        if(songsType === 'favorite') changeSongsArray();
    }, [songs]);

    React.useEffect(() => {
        changeSongsArray();
    }, [songsType]);

    const setSongIndex = (songId, arr = songs) => {
        arr.forEach((song, index) => {
            if(song.id === songId) changeAudioIndex(index);
        });
    }

    const changeSongsArray = () => {
        switch(songsType){
            case 'list':
                switch(prevSongsType){
                    case 'favorite':
                        const favoriteSongId = songsArr[currentAudioIndex].id;
                        setSongIndex(favoriteSongId);
                        break;
                    case 'mix':
                        const mixSongId = songsArr[currentAudioIndex].id;
                        setSongIndex(mixSongId);
                        break;
                    default:
                        break;
                }
                setSongsArr(songs);
                return;
            case 'mix':
                if(!prevSongsType) return;

                let mixSongs = [...songs];

                switch(prevSongsType){
                    case 'list':
                        const currentSong = mixSongs.splice(currentAudioIndex, 1)[0];
                        mixSongs = createRandomArray(mixSongs);
                        mixSongs.splice(currentAudioIndex, 0, currentSong);
                        break;
                    case 'favorite':
                        const favoriteSongId = songsArr[currentAudioIndex].id;
                        mixSongs = createRandomArray(mixSongs);
                        setSongIndex(favoriteSongId, mixSongs);
                        break;
                    default:
                        break;
                }
                setSongsArr(mixSongs);
                return;
            case 'favorite':
                const favoriteSongs = songs.filter(song => song.favorite);
                if(favoriteSongs.length === 0){
                    changeSongsType('list');
                } else{
                    const songId = songsArr[currentAudioIndex].id;
                    const favoriteSong = favoriteSongs.filter(song => song.id === songId)[0];
                    if(favoriteSong){
                        setSongIndex(favoriteSong.id, favoriteSongs);
                    }else{
                        changeAudioIndex(0);
                    }
                    setSongsArr(favoriteSongs);
                }
                return;
            default:
                return;
        }
    }

    const createRandomArray = arr => {
        const newArr = [...arr];
        let currentIndex = newArr.length,  randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [newArr[currentIndex], newArr[randomIndex]] = [
            newArr[randomIndex], newArr[currentIndex]];
        }
      
        return newArr;
    }

    const changeSongsType = newType => {
        setPrevSongsType(songsType);
        setSongsType(newType);
    }

    return (
        <div className='audio'>
            <div className="audio__content">
                {songsArr && <Player 
                    currentAudioIndex={currentAudioIndex}
                    songs={songsArr}
                    changeAudioIndex={changeAudioIndex}
                    changeFavorite={changeFavorite}
                />}
                <PlayerButtons 
                    songsType={songsType}
                    setSongsType={changeSongsType}
                    changeSongsArray={changeSongsArray}
                    isFavorite={songs.filter(song => song.favorite).length !== 0}
                />
            </div>
        </div>
    )
}

export default Audio;
