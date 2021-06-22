import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import defaultSongImage from '../../assets/img/defaultSongImage.jpg';
import './style.scss';

const Audio = ({ currentAudioIndex, songs, changeAudioIndex }) => {
    const { title, img, audio } = songs[currentAudioIndex];
    const audioRef = React.useRef(null);
    const [audioStart, setAudioStart] = React.useState(0);
    const [duration, setDuration] = React.useState(null);
    const [formattingDuration, setFormattingDuration] = React.useState(null);
    const [isPlay, setIsPlay] = React.useState(false);
    let timeInterval;

    const formattingTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime) - minutes * 60;
        
        return `${minutes}.${seconds < 10 ? '0' : ''}${ seconds }`;
    }

    const onChangeAudio = (action) => {
        switch(action){
            case 'next':
                if(currentAudioIndex === songs.length - 1){
                    changeAudioIndex(0);
                }else{
                    changeAudioIndex(currentAudioIndex + 1)
                }
            case 'prev':
                if(currentAudioIndex === 0){
                    changeAudioIndex(songs.length - 1);
                }else{
                    changeAudioIndex(currentAudioIndex - 1)
                }
        }
    }

    const onLoadedMetadata = () => {
        setFormattingDuration(formattingTime(audioRef.current.duration));
        setDuration(Math.floor(audioRef.current.duration));
        setAudioStart(Math.round(audioRef.current.currentTime));
    }

    const play = () => {
        audioRef.current.play();
        setTimeInterval();
    }

    const pause = () => {
        audioRef.current.pause();
        clearTimeInterval();
    }

    const clearTimeInterval = () => {
        clearInterval(timeInterval);
    }

    const setTimeInterval = () => {
        timeInterval = setInterval(() => {
            setAudioStart(audioRef.current.currentTime);
        }, 10);
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

    const ChangeVolume = (action) => {
        if(action === 'plus' && audioRef.current.volume < 1){
            audioRef.current.volume = Number((audioRef.current.volume + 0.1).toFixed(1))
        }else if(action === 'minus' && audioRef.current.volume > 0){
            audioRef.current.volume = Number((audioRef.current.volume - 0.1).toFixed(1))
        }
    }

    return (
        <div className='audio'>
            <div className="audio__content">
                <div className="audio__img"><img src={img ? img : defaultSongImage} alt="song" /></div>
                <h3 className="audio__title">{ title }</h3>
                <audio className='audio__player' id="player" src={audio} onLoadedMetadata={onLoadedMetadata} ref={audioRef}></audio>
                {!!duration && <div className="audio__slider slider-audio">
                    <div className="slider-audio__time">{ formattingTime(audioStart) || '0.00' }</div>
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
                    <div className="slider-audio__time">{ formattingDuration }</div>
                </div>}
                <div className='audio__buttons'>
                    <button className=' audio__btn audio__btn_arrow' onClick={() => onChangeAudio('prev')}>
                        <svg viewBox="0 0 300 200">
                        <path d="M30.9937 84.8594L121.244 28.75C123.959 27.0676 127.076 26.1461 130.269 26.082C133.463 26.0179 136.614 26.8137 139.395 28.3859C142.175 29.9581 144.481 32.249 146.072 35.0185C147.663 37.7881 148.48 40.9344 148.438 44.1281V155.872C148.438 160.596 146.561 165.127 143.22 168.467C139.88 171.808 135.349 173.684 130.625 173.684C127.333 173.756 124.086 172.913 121.244 171.25L30.9937 115.378C28.4161 113.781 26.289 111.552 24.8139 108.902C23.3388 106.252 22.5645 103.27 22.5645 100.237C22.5645 97.205 23.3388 94.2226 24.8139 91.573C26.289 88.9235 28.4161 86.6943 30.9937 85.0969V84.8594Z" fill="#0B032D"/>
                        <path d="M132.625 84.0625L227.625 25C230.483 23.229 233.764 22.259 237.126 22.1916C240.487 22.1242 243.805 22.9618 246.731 24.6167C249.658 26.2717 252.086 28.6831 253.76 31.5984C255.435 34.5137 256.295 37.8257 256.25 41.1875V158.812C256.25 163.785 254.275 168.554 250.758 172.071C247.242 175.587 242.473 177.562 237.5 177.562C234.035 177.637 230.617 176.75 227.625 175L132.625 116.187C129.912 114.506 127.673 112.159 126.12 109.37C124.567 106.581 123.752 103.442 123.752 100.25C123.752 97.0579 124.567 93.9186 126.12 91.1295C127.673 88.3405 129.912 85.994 132.625 84.3125V84.0625Z" fill="#0B032D"/>
                        </svg>
                    </button> 
                    {
                        isPlay 
                        ? <button className='audio__btn' onClick={onPause}>
                            <svg viewBox="0 0 512 512"><g><path fill='#843B62' d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z"/><path fill='#843B62' d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z"/></g></svg>
                        </button> 
                        : <button className='audio__btn' onClick={onPlay}>
                            <svg viewBox="0 0 32 32"><title/><g><path fill='#843B62' d="M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z"/></g></svg>
                        </button> 
                    }
                    <button className='audio__btn audio__btn_arrow' onClick={() => onChangeAudio('next')}>
                        <svg viewBox="0 0 300 200">
                        <path d="M269.006 84.8594L178.756 28.75C176.041 27.0676 172.924 26.1461 169.731 26.082C166.537 26.0179 163.386 26.8137 160.605 28.3859C157.825 29.9581 155.519 32.249 153.928 35.0185C152.337 37.7881 151.52 40.9344 151.562 44.1281V155.872C151.562 160.596 153.439 165.127 156.78 168.467C160.12 171.808 164.651 173.684 169.375 173.684C172.667 173.756 175.914 172.913 178.756 171.25L269.006 115.378C271.584 113.781 273.711 111.552 275.186 108.902C276.661 106.252 277.435 103.27 277.435 100.237C277.435 97.205 276.661 94.2226 275.186 91.573C273.711 88.9235 271.584 86.6943 269.006 85.0969V84.8594Z" fill="#0B032D"/>
                        <path d="M167.375 84.0625L72.375 25C69.5172 23.229 66.2358 22.259 62.8744 22.1916C59.513 22.1242 56.1953 22.9618 53.2687 24.6167C50.3422 26.2717 47.9145 28.6831 46.2398 31.5984C44.5652 34.5137 43.7052 37.8257 43.75 41.1875V158.812C43.75 163.785 45.7254 168.554 49.2417 172.071C52.758 175.587 57.5272 177.562 62.5 177.562C65.9652 177.637 69.3834 176.75 72.375 175L167.375 116.187C170.088 114.506 172.327 112.159 173.88 109.37C175.433 106.581 176.248 103.442 176.248 100.25C176.248 97.0579 175.433 93.9186 173.88 91.1295C172.327 88.3405 170.088 85.994 167.375 84.3125V84.0625Z" fill="#0B032D"/>
                        </svg>
                    </button> 
                    
                    {/* <button className='audio__btn' onClick={() => ChangeVolume('plus')}>Volume+ </button> 
                    <button className='audio__btn' onClick={() => ChangeVolume('minus')}>Volume- </button>  */}
                </div>
            </div>
        </div>
    )
}

export default Audio;
