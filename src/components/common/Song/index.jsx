import Nouislider from 'nouislider-react';
import React from 'react';
import './style.scss'
import defaultSongImage from '../../../assets/img/defaultSongImage.jpg';

const Song = ({song: { title, img, song, favorite, id }, changeFavorite, isPlayId, setIsPlayId }) => {
    const audioRef = React.useRef(null);
    const [audioStart, setAudioStart] = React.useState(0);
    const [currentFormattingTime, setCurrentFormattingTime] = React.useState('0.00');
    const [duration, setDuration] = React.useState(null);
    const [formattingDuration, setFormattingDuration] = React.useState(null);
    const isPlay = isPlayId === id;
    const [isInitializedAudio, setIsInitializedAudio] = React.useState(false);
    const [isInitializedImg, setIsInitializedImg] = React.useState(false);
    const [timeInterval, setTimeInterval] = React.useState(null);
    let formattingTimeInterval;

    React.useEffect(() => {
        startFormattingTimeInterval();
        return () => {
            clearFormattingTimeInterval();
            if(isPlay) clearTimeInterval();
        }
    }, [timeInterval]);

    React.useEffect(() => {
        if(!isPlay) pause();
    }, [isPlayId]);

    React.useEffect(() => {
        return () => {
            setIsPlayId(null);
        }
    }, []);

    const formattingTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime) - minutes * 60;
        
        return `${minutes}.${seconds < 10 ? '0' : ''}${ seconds }`;
    }

    const onLoadedMetadata = () => {
        setFormattingDuration(formattingTime(audioRef.current.duration));
        setDuration(Math.floor(audioRef.current.duration));
        setAudioStart(Math.round(audioRef.current.currentTime));
        setIsInitializedAudio(true);
    }
    
    const onLoadImg = () => {
        setIsInitializedImg(true);
    }

    const onEnded = () => {
        setIsPlayId(null);
        clearTimeInterval();
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
            if(audioRef.current) setCurrentFormattingTime(formattingTime(audioRef.current.currentTime));
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
        setIsPlayId(id);
    }

    const onPause = () => {
        pause();
        setIsPlayId(null);
    }

    const onFavoriteChange = () => {
        changeFavorite(id, !favorite);
    }

    return (
        <div className='song'>
            <div className="song__content">
                <div className={`song__img ${!isInitializedImg ? 'song__img_loading' : ''}`}><img onLoad={onLoadImg} src={img ? img : defaultSongImage} alt="song" /></div>
                <div className="song__main">
                    <div className="song__body">
                        <div className="song__title">{title}</div>
                        <audio className='song__player' src={song} onEnded={onEnded} onLoadedMetadata={onLoadedMetadata} ref={audioRef}></audio>
                        {isInitializedAudio 
                        ? <div className="song__slider slider-player">
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
                            : <div className="song__preloader preloader-player">
                                <div className="preloader-player__time"></div>
                                <div className="preloader-player__line"></div>
                                <div className="preloader-player__time"></div>
                            </div>}
                    </div>
                    <div className="song__buttons">
                        <button className={`song__btn song__btn_heart ${favorite ? 'active': ''}`} onClick={onFavoriteChange}>
                            <svg viewBox="0 0 358 323" fill="none">
                            <path d="M71 4C128.2 -12.4 167.167 31.5 179.5 55.5C179.5 43.5 233 -18 293 7C341 27 355 66.6667 356 84C366.4 116.8 328 175.667 307.5 201C250.7 269 198.167 310.333 179 322.5C131.8 291.3 76.6667 232.833 55 207.5C12.2 161.1 0.833331 112.833 0.499997 94.5C0.166663 71.1667 13.8 20.4 71 4Z" fill="#bbb"/>
                            <path d="M287.247 4C230.047 -12.4 191.081 31.5 178.747 55.5C178.747 43.5 125.247 -18 65.2474 7C17.2474 27 3.24744 66.6667 2.24744 84C-8.15256 116.8 30.2474 175.667 50.7474 201C107.547 269 160.081 310.333 179.247 322.5C226.447 291.3 281.581 232.833 303.247 207.5C346.047 161.1 357.414 112.833 357.747 94.5C358.081 71.1667 344.447 20.4 287.247 4Z" fill="#bbb"/>
                            </svg>
                        </button>
                        {isPlay 
                        ? <button className='song__btn' onClick={onPause}>
                        <svg viewBox="0 0 350 350">
                            <rect x="67" y="60" width="90" height="240" rx="20" fill="#843B62"/>
                            <rect x="197" y="60" width="90" height="240" rx="20" fill="#843B62"/>
                        </svg>
                        </button> 
                        : <button className='song__btn' onClick={onPlay}>
                            <svg viewBox="0 0 32 32"><title/><g><path fill='#843B62' d="M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z"/></g></svg>
                        </button>}
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Song;
