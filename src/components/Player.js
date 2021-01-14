import React , { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay , faAngleLeft , faAngleRight ,faPause } from '@fortawesome/free-solid-svg-icons';
import {playAudio} from '../utils'

const Player = ({
    setCurrentSong,
    currentSong,
    isPlaying,
    seIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    songs,
    setSongs,
}) => {

    // use Effect 
    useEffect(() => {
        const newSongs = songs.map((music) => {
          if(music.id === currentSong.id) {
              return{
                  ...music,
                  active:true,
              };
          } else{
              return{
                  ...music,
                  active:false,
                    };
          }
        
        })
        setSongs(newSongs);
    },[currentSong])

    // REF
    
    // STATE

    // Format time to mm:ss
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    // Event Handlers

    // pause & play music
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause()
            seIsPlaying(false)
        } else {
            audioRef.current.play()
            seIsPlaying(true)
        }
        
    }

    // skip to the next or previous music
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if( direction === 'skip-forward' ) {
            setCurrentSong(songs[(currentIndex + 1) % songs.length] )

        } else {
            if((currentIndex -1) % songs.length === -1){
                setCurrentSong(songs[songs.length - 1])
            } else{
                setCurrentSong(songs[(currentIndex - 1)]  )
            }
           
        }
        playAudio(isPlaying,audioRef)
    }

    // drag the player input duration and return the current time of the song
    const dragHandler = (e) => {
        const currentTime = e.target.value
        console.log(currentTime)
        audioRef.current.currentTime = currentTime
        setSongInfo({...songInfo,currentTime})
    }

    return(
     <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input onChange={dragHandler}  max={songInfo.duration  || 0} value={songInfo.currentTime} type="range"/>
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon size="2x" onClick={() => skipTrackHandler('skip-back')} className="skip-back" icon={faAngleLeft}/>
            <FontAwesomeIcon size="2x"  className="play" icon={isPlaying ? faPause : faPlay}  onClick={playSongHandler}/>
            <FontAwesomeIcon size="2x" onClick={() => skipTrackHandler('skip-forward')}  className="skip-forward" icon={faAngleRight}/>

        </div>

    </div>
    )
}

export default Player