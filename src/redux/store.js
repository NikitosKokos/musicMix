import { combineReducers, createStore } from "redux";
import audioPlayerReducer from "./audio-player-reducer";


let reducers = combineReducers({
    audioPlayer: audioPlayerReducer,
});

const store = createStore(reducers);

export default store;