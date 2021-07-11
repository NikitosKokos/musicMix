import React from 'react';
import '../style.scss';
import defaultSongImage from '../../../assets/img/defaultSongImage.jpg';
import Nouislider from "nouislider-react";

const Player = ({ currentAudioIndex, songs, changeAudioIndex, changeFavorite }) => {
    const { title, img, song, favorite, id } = songs[currentAudioIndex];
    const audioRef = React.useRef(null);
    const [audioStart, setAudioStart] = React.useState(0);
    const [currentFormattingTime, setCurrentFormattingTime] = React.useState(0.00);
    const [duration, setDuration] = React.useState(null);
    const [formattingDuration, setFormattingDuration] = React.useState(null);
    const [isPlay, setIsPlay] = React.useState(false);
    const [isInitializedAudio, setIsInitializedAudio] = React.useState(false);
    const [timeInterval, setTimeInterval] = React.useState(null);
    let formattingTimeInterval;

    React.useEffect(() => {
        startFormattingTimeInterval();
        return () => {
            clearFormattingTimeInterval();
            if(isPlay) clearTimeInterval();
        }
    }, [timeInterval]);

    const formattingTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime) - minutes * 60;
        
        return `${minutes}.${seconds < 10 ? '0' : ''}${ seconds }`;
    }

    const onChangeAudio = (action) => {
        if(isPlay) clearTimeInterval();
        setIsInitializedAudio(false);
        switch(action){
            case 'next':
                if(currentAudioIndex === (songs.length - 1)){
                    changeAudioIndex(0);
                }else{
                    changeAudioIndex(currentAudioIndex + 1);
                }
                return;
            case 'prev':
                if(currentAudioIndex === 0){
                    changeAudioIndex(songs.length - 1);
                }else{
                    changeAudioIndex(currentAudioIndex - 1);
                }
                return;
            default:
                break;
        }
    }

    const onLoadedMetadata = () => {
        setFormattingDuration(formattingTime(audioRef.current.duration));
        setDuration(Math.floor(audioRef.current.duration));
        setAudioStart(Math.round(audioRef.current.currentTime));
        setIsInitializedAudio(true);
        if(isPlay) play();
    }

    const onEnded = () => {
        if(isPlay && songs.length > 1){
            setTimeout(() => {
                onChangeAudio('next');
            }, 1000);
        }else{
            setIsPlay(false);
        }
    }

    const play = () => {
        audioRef.current.play();
        startTimeInterval();
    }

    const pause = () => {
        audioRef.current.pause();
        clearTimeInterval();
    }

    const clearTimeInterval = () => {
        clearInterval(timeInterval);
    }

    const clearFormattingTimeInterval = () => {
        clearInterval(formattingTimeInterval);
    }

    const startTimeInterval = () => {
        setTimeInterval(setInterval(() => {
            setAudioStart(audioRef.current.currentTime);
        }, 100));
    }

    const startFormattingTimeInterval = () => {
        formattingTimeInterval = setInterval(() => {
            setCurrentFormattingTime(formattingTime(audioRef.current.currentTime));
        }, 100);
    }

    const onChange = ([newTime]) => {
        audioRef.current.currentTime = newTime;
    }

    const onEnd = () => {
        if(isPlay) play()
    }

    const onPlay = () => {
        play();
        setIsPlay(true);
    }

    const onPause = () => {
        pause();
        setIsPlay(false);
    }

    const onFavoriteChange = () => {
        changeFavorite(id, !favorite);
    }

    // const ChangeVolume = (action) => {
    //     if(action === 'plus' && audioRef.current.volume < 1){
    //         audioRef.current.volume = Number((audioRef.current.volume + 0.1).toFixed(1))
    //     }else if(action === 'minus' && audioRef.current.volume > 0){
    //         audioRef.current.volume = Number((audioRef.current.volume - 0.1).toFixed(1))
    //     }
    // }

    return (
    <div className='player'>
        <div className="player__content">
            <div className="player__favorites">
                <button className={`player__btn player__btn_heart ${favorite ? 'active': ''}`} onClick={onFavoriteChange}>
                    <svg viewBox="0 0 358 323" fill="none">
                    <path d="M71 4C128.2 -12.4 167.167 31.5 179.5 55.5C179.5 43.5 233 -18 293 7C341 27 355 66.6667 356 84C366.4 116.8 328 175.667 307.5 201C250.7 269 198.167 310.333 179 322.5C131.8 291.3 76.6667 232.833 55 207.5C12.2 161.1 0.833331 112.833 0.499997 94.5C0.166663 71.1667 13.8 20.4 71 4Z" fill="#bbb"/>
                    <path d="M287.247 4C230.047 -12.4 191.081 31.5 178.747 55.5C178.747 43.5 125.247 -18 65.2474 7C17.2474 27 3.24744 66.6667 2.24744 84C-8.15256 116.8 30.2474 175.667 50.7474 201C107.547 269 160.081 310.333 179.247 322.5C226.447 291.3 281.581 232.833 303.247 207.5C346.047 161.1 357.414 112.833 357.747 94.5C358.081 71.1667 344.447 20.4 287.247 4Z" fill="#bbb"/>
                    </svg>
                </button>
            </div>
            <div className="player__img"><img src={img ? img : defaultSongImage} alt="song" /></div>
            <h3 className="player__title">{ title }</h3>
            <audio className='player__player' src={song} onEnded={onEnded} onLoadedMetadata={onLoadedMetadata} ref={audioRef}></audio>
            {isInitializedAudio
            ? <div className="player__slider slider-player">
                <div className="slider-player__time">{ currentFormattingTime }</div>
                <Nouislider
                    start={audioStart}
                    connect={[true, false]}
                    animate={false}
                    range={{
                        min: 0,
                        max: duration
                    }}
                    onChange={onChange}
                    onStart={pause}
                    onEnd={onEnd}
                />
                <div className="slider-player__time">{ formattingDuration }</div>
            </div>
            : <div className="player__preloader preloader-player">
                <div className="preloader-player__time"></div>
                <div className="preloader-player__line"></div>
                <div className="preloader-player__time"></div>
            </div>}
            <div className='player__buttons'>
                {songs.length > 1 && <button className=' player__btn player__btn_arrow' onClick={() => onChangeAudio('prev')}>
                    <svg viewBox="0 0 300 200">
                    <path d="M30.9937 84.8594L121.244 28.75C123.959 27.0676 127.076 26.1461 130.269 26.082C133.463 26.0179 136.614 26.8137 139.395 28.3859C142.175 29.9581 144.481 32.249 146.072 35.0185C147.663 37.7881 148.48 40.9344 148.438 44.1281V155.872C148.438 160.596 146.561 165.127 143.22 168.467C139.88 171.808 135.349 173.684 130.625 173.684C127.333 173.756 124.086 172.913 121.244 171.25L30.9937 115.378C28.4161 113.781 26.289 111.552 24.8139 108.902C23.3388 106.252 22.5645 103.27 22.5645 100.237C22.5645 97.205 23.3388 94.2226 24.8139 91.573C26.289 88.9235 28.4161 86.6943 30.9937 85.0969V84.8594Z" fill="#0B032D"/>
                    <path d="M132.625 84.0625L227.625 25C230.483 23.229 233.764 22.259 237.126 22.1916C240.487 22.1242 243.805 22.9618 246.731 24.6167C249.658 26.2717 252.086 28.6831 253.76 31.5984C255.435 34.5137 256.295 37.8257 256.25 41.1875V158.812C256.25 163.785 254.275 168.554 250.758 172.071C247.242 175.587 242.473 177.562 237.5 177.562C234.035 177.637 230.617 176.75 227.625 175L132.625 116.187C129.912 114.506 127.673 112.159 126.12 109.37C124.567 106.581 123.752 103.442 123.752 100.25C123.752 97.0579 124.567 93.9186 126.12 91.1295C127.673 88.3405 129.912 85.994 132.625 84.3125V84.0625Z" fill="#0B032D"/>
                    </svg>
                </button>}
                {
                    isPlay 
                    ? <button className='player__btn' onClick={onPause}>
                        <svg viewBox="0 0 350 350">
                            <rect x="67" y="60" width="90" height="240" rx="20" fill="#843B62"/>
                            <rect x="197" y="60" width="90" height="240" rx="20" fill="#843B62"/>
                        </svg>
                    </button> 
                    : <button className='player__btn' onClick={onPlay}>
                        <svg viewBox="0 0 32 32"><title/><g><path fill='#843B62' d="M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z"/></g></svg>
                    </button> 
                }
                {songs.length > 1 && <button className='player__btn player__btn_arrow' onClick={() => onChangeAudio('next')}>
                    <svg viewBox="0 0 300 200">
                    <path d="M269.006 84.8594L178.756 28.75C176.041 27.0676 172.924 26.1461 169.731 26.082C166.537 26.0179 163.386 26.8137 160.605 28.3859C157.825 29.9581 155.519 32.249 153.928 35.0185C152.337 37.7881 151.52 40.9344 151.562 44.1281V155.872C151.562 160.596 153.439 165.127 156.78 168.467C160.12 171.808 164.651 173.684 169.375 173.684C172.667 173.756 175.914 172.913 178.756 171.25L269.006 115.378C271.584 113.781 273.711 111.552 275.186 108.902C276.661 106.252 277.435 103.27 277.435 100.237C277.435 97.205 276.661 94.2226 275.186 91.573C273.711 88.9235 271.584 86.6943 269.006 85.0969V84.8594Z" fill="#0B032D"/>
                    <path d="M167.375 84.0625L72.375 25C69.5172 23.229 66.2358 22.259 62.8744 22.1916C59.513 22.1242 56.1953 22.9618 53.2687 24.6167C50.3422 26.2717 47.9145 28.6831 46.2398 31.5984C44.5652 34.5137 43.7052 37.8257 43.75 41.1875V158.812C43.75 163.785 45.7254 168.554 49.2417 172.071C52.758 175.587 57.5272 177.562 62.5 177.562C65.9652 177.637 69.3834 176.75 72.375 175L167.375 116.187C170.088 114.506 172.327 112.159 173.88 109.37C175.433 106.581 176.248 103.442 176.248 100.25C176.248 97.0579 175.433 93.9186 173.88 91.1295C172.327 88.3405 170.088 85.994 167.375 84.3125V84.0625Z" fill="#0B032D"/>
                    </svg>
                </button>}
                
                {/* <button className='player__btn' onClick={() => ChangeVolume('plus')}>Volume+ </button> 
                <button className='player__btn' onClick={() => ChangeVolume('minus')}>Volume- </button>  */}
            </div>
        </div>
    </div>
    )
}

export default Player;
