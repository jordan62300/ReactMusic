import React , {useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
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
    </div>
  );
}

export default App;
