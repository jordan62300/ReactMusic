import React , {useState,useRef} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library"
import './styles/app.scss';
import data from './data';
import Nav from './components/Nav'


function App() {

  
    // REF
    const audioRef = useRef(null);
    // STATE
    const [songInfo, setSongInfo] = useState({
      currentTime:0,
      duration:0,
      animationPercentage:0,
  })
  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentSong] = useState(songs[0])
  const [isPlaying, seIsPlaying] = useState(false);
  const [libraryStatus,setLibraryStatus] = useState(false);

  // handler

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    // Calul %
    const roundedCurrentTime = Math.round(currentTime)
    const roundedduration = Math.round(duration)
    const animationPercentage = Math.round((roundedCurrentTime /roundedduration) * 100)

    
    setSongInfo({...songInfo,currentTime,duration,animationPercentage})
}

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying}  seIsPlaying={seIsPlaying} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} setSongs={setSongs} audioRef={audioRef}  setCurrentSong={setCurrentSong} songs={songs} isPlaying={isPlaying}/>
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
