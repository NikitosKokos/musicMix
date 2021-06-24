import { Provider } from "react-redux";
import store from "./redux/store";
import AudioContainer from "./components/Audio/AudioContainer";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <Header />
          <AudioContainer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
