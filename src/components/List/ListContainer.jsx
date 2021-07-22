import { connect } from "react-redux";
import { compose } from "redux";
import List from ".";
import { getSongs, getIsPlayId } from "../../redux/audio-selectors";
import { changeFavorite, setIsPlayId } from '../../redux/audio-reducer';


const ListContainer = ({ songs, changeFavorite, isPlayId, setIsPlayId }) => (
    <List
        title='Music list'
        songs={songs}
        changeFavorite={changeFavorite}
        isPlayId={isPlayId}
        setIsPlayId={setIsPlayId}
    />);

const mapStateToProps = (state) => ({
    songs: getSongs(state),
    isPlayId: getIsPlayId(state),
})

export default compose(
    connect(mapStateToProps, {
        changeFavorite,
        setIsPlayId,
    })
)(ListContainer);