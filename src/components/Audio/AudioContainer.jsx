import { connect } from "react-redux";
import { compose } from "redux";
import Audio from ".";
import { setCurrentAudioIndex } from '../../redux/audio-reducer';
import { getCurrentAudioIndex, getSongs } from "../../redux/audio-selectors";


const AudioContainer = ({ currentAudioIndex, songs, setCurrentAudioIndex }) => (
    <Audio
        currentAudioIndex={currentAudioIndex}
        songs={songs}
        changeAudioIndex={setCurrentAudioIndex}
    />);

const mapStateToProps = (state) => ({
    currentAudioIndex: getCurrentAudioIndex(state),
    songs: getSongs(state),
});

export default compose(
    connect(mapStateToProps, {
        setCurrentAudioIndex,
    })
)(AudioContainer);