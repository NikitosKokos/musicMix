import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import './style.scss';

const Audio = ({ audio }) => {
    const audioRef = React.useRef(null);
    const [audioStart, setAudioStart] = React.useState(0);
    const [duration, setDuration] = React.useState(null);
    const [formattingDuration, setFormattingDuration] = React.useState(null);
    const [isPlay, setIsPlay] = React.useState(false);
    let timeInterval;

    const onLoadedMetadata = () => {
        const minutes = Math.floor(Math.round(audioRef.current.duration) / 60);
        const seconds = Math.round(audioRef.current.duration) - minutes * 60;

        setFormattingDuration(Number(`${minutes}.${seconds < 10 ? '0' : ''}${seconds}`));
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
                <audio className='audio__player' id="player" src={audio} onLoadedMetadata={onLoadedMetadata} ref={audioRef}></audio>
                <div className='audio__buttons'> 
                <button className='audio__buttons' onClick={onPlay}>Play</button> 
                <button className='audio__buttons' onClick={onPause}>Pause</button> 
                <button className='audio__buttons' onClick={() => ChangeVolume('plus')}>Volume+ </button> 
                <button className='audio__buttons' onClick={() => ChangeVolume('minus')}>Volume- </button> 
                </div>
                {!!duration && <div className="audio__slider slider-audio">
                    <div className="slider-audio__time">0</div>
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
            </div>
        </div>
    )
}

export default Audio;
