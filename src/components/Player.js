import React, {useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay , faAngleLeft , faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong,isPlaying,seIsPlaying }) => {

    const audioRef = useRef(null);


    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause()
            seIsPlaying(false)
        } else {
            audioRef.current.play()
            seIsPlaying(true)
        }
        
    }

    return(
     <div className="player">
        <div className="time-control">
            <p>Start</p>
            <input type="range"/>
            <p>End</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon size="2x" className="skip-back" icon={faAngleLeft}/>
            <FontAwesomeIcon size="2x"  className="play" icon={faPlay}  onClick={playSongHandler}/>
            <FontAwesomeIcon size="2x"  className="skip-forward" icon={faAngleRight}/>

        </div>
        <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
    )
}

export default Player