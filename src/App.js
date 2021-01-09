import React , {useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library"
import './styles/app.scss';
import data from './util'


function App() {

  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentSong] = useState(songs[0])
  const [isPlaying, seIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player  isPlaying={isPlaying}  seIsPlaying={seIsPlaying} currentSong={currentSong}/>
      <Library setCurrentSong={setCurrentSong} songs={songs}/>
    </div>
  );
}

export default App;
