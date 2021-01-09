import React, {useRef , useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay , faAngleLeft , faAngleRight ,faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong,isPlaying,seIsPlaying }) => {

    // REF
    const audioRef = useRef(null);
    // STATE
    const [songInfo, setSongInfo] = useState({
        currentTime:0,
        duration:0
    })

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    // Event Handlers
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause()
            seIsPlaying(false)
        } else {
            audioRef.current.play()
            seIsPlaying(true)
        }
        
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo,currentTime,duration})
    }

    const dragHandler = (e) => {
        const currentTime = e.target.value
        audioRef.current.currentTime = currentTime
        setSongInfo({...songInfo,currentTime})
    }

    return(
     <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range"/>
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon size="2x" className="skip-back" icon={faAngleLeft}/>
            <FontAwesomeIcon size="2x"  className="play" icon={isPlaying ? faPause : faPlay}  onClick={playSongHandler}/>
            <FontAwesomeIcon size="2x"  className="skip-forward" icon={faAngleRight}/>

        </div>
        <audio 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}>
        </audio>
    </div>
    )
}

export default Player