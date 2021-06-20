import Audio from "./components/Audio";
import Test from "./components/Test";
import music from './assets/audio/venus-jupiter.mp3';

function App() {
  return (
    <div className="wrapper">
      <Audio audio={music} />
    </div>
  );
}

export default App;
