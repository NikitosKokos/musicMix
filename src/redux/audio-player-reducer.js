import music from '../assets/audio/venus-jupiter.mp3';
import music2 from '../assets/audio/end-of-the-road.mp3';
import music3 from '../assets/audio/Grover-Washington-Jr-Just-The-Two-Of-Us.mp3';
import music4 from '../assets/audio/city-under-the-sole.mp3';
import songImg from '../assets/img/song/01.jpg';
import songImg3 from '../assets/img/song/03.jpg';

const SET_CURRENT_AUDIO_INDEX = 'audioPlayer/SET_CURRENT_AUDIO_INDEX';

let initialState = {
    currentAudioIndex: 0,
    songs: [
        {
          id: 1,
          title: 'Венера-Юпитер',
          img: songImg,
          song: music
        },
        {
          id: 2,
          title: 'End Of The Road',
          img: null,
          song: music2
        },
        {
          id: 3,
          title: 'Just The Two Of Us',
          img: songImg3,
          song: music3
        },
        {
          id: 4,
          title: 'Город под подошвой',
          img: null,
          song: music4
        },
      ]
}

const audioPlayerReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CURRENT_AUDIO_INDEX:
            return {
                ...state,
                currentAudioIndex: action.payload
            }
        default: 
            return state;
    }
}

export const setCurrentAudioIndex = (payload) => ({ type: SET_CURRENT_AUDIO_INDEX, payload: payload });

export default audioPlayerReducer;