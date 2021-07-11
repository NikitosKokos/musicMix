import { connect } from "react-redux";
import { compose } from "redux";
import { getSongs } from "../../redux/audio-selectors";
import { changeFavorite } from '../../redux/audio-reducer';
import Favorites from ".";


const FavoritesContainer = ({ songs, changeFavorite }) => (
    <Favorites 
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
)(FavoritesContainer);