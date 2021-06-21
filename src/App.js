import Audio from "./components/Audio";
import music from './assets/audio/venus-jupiter.mp3';
import music2 from './assets/audio/city-under-the-sole.mp3';
import songImg from './assets/img/song/01.jpg';

function App() {
  return (
    <div className="wrapper">
      <Audio title={'Венера-Юпитер'} img={songImg} audio={music} />
    </div>
  );
}

export default App;
