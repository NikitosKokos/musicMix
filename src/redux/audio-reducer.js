import music from '../assets/audio/venus-jupiter.mp3';
import music2 from '../assets/audio/end-of-the-road.mp3';
import music3 from '../assets/audio/Grover-Washington-Jr-Just-The-Two-Of-Us.mp3';
import music4 from '../assets/audio/city-under-the-sole.mp3';
import music5 from '../assets/audio/Ya_v_momente.mp3';
import music6 from '../assets/audio/follow-you.mp3';
import songImg from '../assets/img/song/01.jpg';
import songImg3 from '../assets/img/song/03.jpg';
import songImg5 from '../assets/img/song/05.jpg';

const SET_CURRENT_AUDIO_INDEX = 'audio/SET_CURRENT_AUDIO_INDEX';
const CHANGE_FAVORITE = 'audio/CHANGE_FAVORITE';
const SET_SONGS_TYPE = 'audio/SET_SONGS_TYPE';
const SET_SONGS_ARR = 'audio/SET_SONGS_ARR';

let initialState = {
    currentAudioIndex: 0,
    songsType: 'list',
    songs: [
      {
        id: 1,
        title: 'Венера-Юпитер',
        img: songImg,
        song: music,
        favorite: false,
      },
      {
        id: 2,
        title: 'End Of The Road',
        img: null,
        song: music2,
        favorite: false,
      },
      {
        id: 3,
        title: 'Just The Two Of Us',
        img: songImg3,
        song: music3,
        favorite: false,
      },
      {
        id: 4,
        title: 'Город под подошвой',
        img: null,
        song: music4,
        favorite: false,
      },
      {
        id: 5,
        title: 'Я в моменте',
        img: songImg5,
        song: music5,
        favorite: true,
      },
      {
        id: 6,
        title: 'Follow You',
        img: null,
        song: music6,
        favorite: false,
      },
    ],
    songsArr: null,
}

const audioReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CURRENT_AUDIO_INDEX:
            return {
                ...state,
                currentAudioIndex: action.payload
            }
          case CHANGE_FAVORITE:
              return {
                  ...state,
                  songs: state.songs.map(song => {
                    if(song.id === action.id) song.favorite = action.favorite;
                    return song;
                  })
              }
          case SET_SONGS_TYPE:
            return {
              ...state,
              songsType: action.payload
          }
        case SET_SONGS_ARR:
          return {
            ...state,
            songsArr: action.payload
          }
        default:
            return state;
    }
}

export const setCurrentAudioIndex = (payload) => ({ type: SET_CURRENT_AUDIO_INDEX, payload });
export const changeFavorite = (id, favorite) => ({ type: CHANGE_FAVORITE, id, favorite });
export const setSongsType = (payload) => ({ type: SET_SONGS_TYPE, payload });
export const setSongsArr = (payload) => ({ type: SET_SONGS_ARR, payload });

export default audioReducer;