import React , {useState,useRef} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library"
import './styles/app.scss';
import data from './util'


function App() {

  
    // REF
    const audioRef = useRef(null);
    // STATE
    const [songInfo, setSongInfo] = useState({
      currentTime:0,
      duration:0
  })
  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentSong] = useState(songs[0])
  const [isPlaying, seIsPlaying] = useState(false);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime,duration})
}

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying}  seIsPlaying={seIsPlaying} currentSong={currentSong}/>
      <Library audioRef={audioRef}  setCurrentSong={setCurrentSong} songs={songs} isPlaying={isPlaying}/>
      <audio 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}>
        </audio>
    </div>
  );
}

export default App;
