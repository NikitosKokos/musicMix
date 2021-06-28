import { combineReducers, createStore } from "redux";
import audioReducer from "./audio-reducer";


let reducers = combineReducers({
    audio: audioReducer,
});

const store = createStore(reducers);

export default store;