import React , {useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import './styles/app.scss';
import data from './util'


function App() {

  const [songs,setSongs] = useState(data())

  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
