import { connect } from "react-redux";
import { compose } from "redux";
import { getSongs, getIsPlayId } from "../../redux/audio-selectors";
import { changeFavorite, setIsPlayId } from '../../redux/audio-reducer';
import List from "../List";


const FavoritesContainer = ({ songs, changeFavorite, isPlayId, setIsPlayId }) => (
    <List 
        title='Music favorites'
        songs={songs.filter(song => song.favorite)}
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
        setIsPlayId
    })
)(FavoritesContainer);