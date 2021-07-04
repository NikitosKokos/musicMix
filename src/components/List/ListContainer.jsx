import { connect } from "react-redux";
import { compose } from "redux";
import List from ".";
import { getSongs } from "../../redux/audio-selectors";
import { changeFavorite } from '../../redux/audio-reducer';


const ListContainer = ({ songs, changeFavorite }) => (
    <List 
        songs={songs}
        changeFavorite={changeFavorite}
    />);

const mapStateToProps = (state) => ({
    songs: getSongs(state),
})

export default compose(
    connect(mapStateToProps, {
        changeFavorite
    })
)(ListContainer);