import { Provider } from "react-redux";
import store from "./redux/store";
import AudioContainer from "./components/Audio/AudioContainer";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import List from "./components/List";
import Add from "./components/Add";
import NotFound from "./components/NotFound";

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
                <List />
            </Route>
            <Route path='/add'>
                <Add />
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
