import React from 'react';
import "nouislider/distribute/nouislider.css";
import './style.scss';
import Player from './Player';
import PlayerButtons from './PlayerButtons';

const Audio = ({ currentAudioIndex, songs, changeAudioIndex, changeFavorite, songsType, setSongsType }) => {
    const [songsArr, setSongsArr] = React.useState(null);

    React.useEffect(() => {
        changeSongsArray();
    }, []);

    React.useEffect(() => {
        changeSongsArray();
    }, [songsType]);

    const changeSongsArray = () => {
        switch(songsType){
            case 'list':
                setSongsArr(songs);
                break;
            case 'mix':
                const newSongs = [...songs];
                newSongs.splice(currentAudioIndex, 1);
                setSongsArr([songs[currentAudioIndex], ...createRandomArray(newSongs)]);
                break;
            case 'favorite':
                setSongsArr(songs.filter(song => song.favorite));
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
                    setSongsType={setSongsType}
                    changeSongsArray={changeSongsArray}
                    isFavorite={songs.filter(song => song.favorite).length !== 0}
                />
            </div>
        </div>
    )
}

export default Audio;
