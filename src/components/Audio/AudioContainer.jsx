import { connect } from "react-redux";
import { compose } from "redux";
import Audio from ".";
import { setCurrentAudioIndex, changeFavorite, setSongsType } from '../../redux/audio-reducer';
import { getCurrentAudioIndex, getSongs, getSongsType } from "../../redux/audio-selectors";


const AudioContainer = ({ currentAudioIndex, songs, setCurrentAudioIndex, changeFavorite, songsType, setSongsType }) => (
    <Audio
        currentAudioIndex={currentAudioIndex}
        songs={songs}
        changeAudioIndex={setCurrentAudioIndex}
        changeFavorite={changeFavorite}
        songsType={songsType}
        setSongsType={setSongsType}
    />);

const mapStateToProps = (state) => ({
    currentAudioIndex: getCurrentAudioIndex(state),
    songs: getSongs(state),
    songsType: getSongsType(state),
});

export default compose(
    connect(mapStateToProps, {
        setCurrentAudioIndex,
        changeFavorite,
        setSongsType
    })
)(AudioContainer);