import React from 'react';
import "nouislider/distribute/nouislider.css";
import './style.scss';
import Player from './Player';
import PlayerButtons from './PlayerButtons';

const Audio = ({ currentAudioIndex, songs, changeAudioIndex, changeFavorite, songsType, setSongsType }) => {
    const [songsArr, setSongsArr] = React.useState(null);
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

    const setSongIndex = songId => {
        songs.forEach((song, index) => {
            if(song.id === songId) changeAudioIndex(index);
        });
    }

    const changeSongsArray = () => {
        switch(songsType){
            case 'list':
                if(prevSongsType === 'favorite'){
                    const favoriteSongId = songsArr[0].id;
                    setSongIndex(favoriteSongId);
                }else if(prevSongsType === 'mix'){
                    const mixSongId = songsArr[currentAudioIndex].id;
                    setSongIndex(mixSongId);
                }
                setSongsArr(songs);
                break;
            case 'mix':
                let mixSongs = [...songs];
                const currentSong = mixSongs.splice(currentAudioIndex, 1)[0];
                mixSongs = createRandomArray(mixSongs);
                mixSongs.splice(currentAudioIndex, 0, currentSong);
                setSongsArr(mixSongs);
                break;
            case 'favorite':
                const favoriteSongs = songs.filter(song => song.favorite);
                if(favoriteSongs.length === 0){
                   setSongsType('list');
                } else{
                    setSongsArr(favoriteSongs);
                    changeAudioIndex(0);
                }
                break;
            default:
                break;
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
