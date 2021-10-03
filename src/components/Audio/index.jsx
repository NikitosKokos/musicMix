import React from 'react';
import "nouislider/distribute/nouislider.css";
import './style.scss';
import Player from './Player';
import PlayerButtons from './PlayerButtons';

const Audio = ({ currentAudioIndex, songs, changeAudioIndex, changeFavorite, songsType, setSongsType, songsArr, setSongsArr }) => {
    const [prevSongsType, setPrevSongsType] = React.useState(null);
    const [audioCurrent, setAudioCurrent] = React.useState(null);
    const canvasRef = React.useRef();

    React.useEffect(() => {
        changeSongsArray();
    }, []);

    React.useEffect(() => {

        // -------

        //построить эквалайзер с несколькими фильтрами
        const audioCtx = window.AudioContext || window.webkitAudioContext;
        const canvas = canvasRef.current;
        let analyser;

        let dataArray, bufferLength;
        const audioContext = new audioCtx();
        const width = canvas.width;
        const height = canvas.height;
        const canvasContext = canvas.getContext('2d');
        if (!!audioCurrent){
            buildAudioGraph();
            requestAnimationFrame(visualize);
        } 

        function buildAudioGraph() {
            // var mediaElement = document.getElementById('player');
            // mediaElement.onplay = (e) => {
            //     audioContext.resume();
            // };

            // исправлено для политики автозапуска
            audioCurrent.addEventListener('play', () => audioContext.resume());

            const sourceNode = audioContext.createMediaElementSource(audioCurrent);

            // Создать узел анализатора
            analyser = audioContext.createAnalyser();

            // Попробуйте изменить на более низкие значения: 512, 256, 128, 64 ...
            analyser.fftSize = 128;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination);
        }

        function visualize() {
            // очистить canvas
            canvasContext.clearRect(0, 0, width, height);

            // Или используйте заливку RGBA, чтобы получить небольшой эффект размытия
            //canvasContext.fillStyle = 'rgba (0, 0, 0, 0.5)';
            //canvasContext.fillRect(0, 0, width, height);

            // Получить данные анализатора
            analyser.getByteFrequencyData(dataArray);

            var barWidth = width / bufferLength;
            var barHeight;
            var x = 0;

            // значения изменяются от 0 до 256, а высота холста равна 100. Давайте изменим масштаб
            // перед отрисовкой. Это масштабный коэффициент
            // let heightScale = height / 128;
            let heightScale = height / 200;

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                // canvasContext.fillStyle = 'rgb(' + (barHeight + 0) + ',4,160)';
                canvasContext.fillStyle = `rgb(${barHeight + 0 > 132 ? 132 : barHeight + 0}, 59, 98)`;
                barHeight *= heightScale;
                canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

                // 2 - количество пикселей между столбцами
                x += barWidth + 2;
            }

            // вызовите снова функцию визуализации со скоростью 60 кадров / с
            requestAnimationFrame(visualize);
        }
        // -------
    }, [audioCurrent]);

    React.useEffect(() => {
        if (songsType === 'favorite') changeSongsArray();
    }, [songs]);

    React.useEffect(() => {
        changeSongsArray();
    }, [songsType]);

    const setSongIndex = (songId, arr = songs) => {
        arr.forEach((song, index) => {
            if (song.id === songId) changeAudioIndex(index);
        });
    };

    const changeSongsArray = () => {
        switch (songsType) {
            case 'list':
                switch (prevSongsType) {
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
                if (!prevSongsType) return;

                let mixSongs = [...songs];

                switch (prevSongsType) {
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
                const favoriteSongs = songs.filter((song) => song.favorite);
                if (favoriteSongs.length === 0) {
                    changeSongsType('list');
                } else {
                    const songId = songsArr[currentAudioIndex].id;
                    const favoriteSong = favoriteSongs.filter((song) => song.id === songId)[0];
                    if (favoriteSong) {
                        setSongIndex(favoriteSong.id, favoriteSongs);
                    } else {
                        changeAudioIndex(0);
                    }
                    setSongsArr(favoriteSongs);
                }
                return;
            default:
                return;
        }
    };

    const createRandomArray = (arr) => {
        const newArr = [...arr];
        let currentIndex = newArr.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [newArr[currentIndex], newArr[randomIndex]] = [
                newArr[randomIndex],
                newArr[currentIndex],
            ];
        }

        return newArr;
    };

    const changeSongsType = (newType) => {
        setPrevSongsType(songsType);
        setSongsType(newType);
    };

    return (
        <div className="audio">
            <canvas className="audio__canvas" ref={canvasRef}></canvas>
            <div className="audio__content">
                {songsArr && (
                    <Player
                        currentAudioIndex={currentAudioIndex}
                        songs={songsArr}
                        changeAudioIndex={changeAudioIndex}
                        changeFavorite={changeFavorite}
                        setAudioCurrent={setAudioCurrent}
                    />
                )}
                <PlayerButtons
                    songsType={songsType}
                    setSongsType={changeSongsType}
                    changeSongsArray={changeSongsArray}
                    isFavorite={songs.filter((song) => song.favorite).length !== 0}
                />
            </div>
        </div>
    );
}

export default Audio;
