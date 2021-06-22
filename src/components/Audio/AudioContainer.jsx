import { connect } from "react-redux";
import { compose } from "redux";
import Audio from ".";
import { setCurrentAudioIndex } from '../../redux/audio-player-reducer';


const AudioContainer = ({ currentAudioIndex, songs, setCurrentAudioIndex }) => (
    <Audio
        currentAudioIndex={currentAudioIndex}
        songs={songs}
        changeAudioIndex={setCurrentAudioIndex}
    />);

const mapStateToProps = (state) => ({
    currentAudioIndex: state.audioPlayer.currentAudioIndex,
    songs: state.audioPlayer.songs,
});

export default compose(
    connect(mapStateToProps, {
        setCurrentAudioIndex,
    })
)(AudioContainer);