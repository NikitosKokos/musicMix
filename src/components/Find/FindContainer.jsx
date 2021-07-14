import { connect } from "react-redux";
import { compose } from "redux";
import { getSongs } from "../../redux/audio-selectors";
import { changeFavorite } from '../../redux/audio-reducer';
import { withRouter } from "react-router-dom";
import List from "../List";


const FindContainer = ({ songs, changeFavorite, match }) => {
    const text = match.params.text.toLowerCase().split('');
    const findSongs = songs.filter(song => {
        const songTitle = song.title.toLowerCase().split('');

        for(let i = 0; i < songTitle.length; i++){
            const letter = songTitle[i];
            const textLetter = text[i];

            if(textLetter !== undefined){
                if(letter !== textLetter) return false;
                if(!songTitle[i+1]) return true;
            }else{
                return true;
            }
        }
    });

    return <List
        title='Find list'
        songs={findSongs}
        changeFavorite={changeFavorite}
    />};

const mapStateToProps = (state) => ({
    songs: getSongs(state),
})

export default compose(
    connect(mapStateToProps, {
        changeFavorite
    }),
    withRouter
)(FindContainer);