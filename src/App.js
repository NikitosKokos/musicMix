import Audio from "./components/Audio";
import { Provider } from "react-redux";
import store from "./redux/store";
import AudioContainer from "./components/Audio/AudioContainer";

function App() {

  return (
    <Provider store={store}>
      <div className="wrapper">
        <AudioContainer />
      </div>
    </Provider>
  );
}

export default App;
