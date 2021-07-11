import { connect } from "react-redux";
import { compose } from "redux";
import Audio from ".";
import { setCurrentAudioIndex, changeFavorite, setSongsType, setSongsArr } from '../../redux/audio-reducer';
import { getCurrentAudioIndex, getSongs, getSongsType, getSongsArr } from "../../redux/audio-selectors";


const AudioContainer = ({ currentAudioIndex, songs, setCurrentAudioIndex, changeFavorite, songsType, setSongsType, songsArr, setSongsArr }) => (
    <Audio
        currentAudioIndex={currentAudioIndex}
        songs={songs}
        changeAudioIndex={setCurrentAudioIndex}
        changeFavorite={changeFavorite}
        songsType={songsType}
        setSongsType={setSongsType}
        songsArr={songsArr}
        setSongsArr={setSongsArr}
    />);

const mapStateToProps = (state) => ({
    currentAudioIndex: getCurrentAudioIndex(state),
    songs: getSongs(state),
    songsType: getSongsType(state),
    songsArr: getSongsArr(state),
});

export default compose(
    connect(mapStateToProps, {
        setCurrentAudioIndex,
        changeFavorite,
        setSongsType,
        setSongsArr,
    })
)(AudioContainer);