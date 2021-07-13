import { Provider } from "react-redux";
import store from "./redux/store";
import AudioContainer from "./components/Audio/AudioContainer";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Add from "./components/Add";
import NotFound from "./components/NotFound";
import ListContainer from "./components/List/ListContainer";
import FavoritesContainer from "./components/Favorites/FavoritesContainer";
import FindContainer from "./components/Find/FindContainer";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <Header />
          <Switch>
            <Route exact path='/'>
              <AudioContainer />
            </Route>
            <Route path='/list'>
              <ListContainer />
            </Route>
            <Route path='/add'>
              <Add />
            </Route>
            <Route path='/favorites'>
              <FavoritesContainer />
            </Route>
            <Route exact path='/find/:text'>
              <FindContainer />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
