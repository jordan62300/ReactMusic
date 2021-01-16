import React   from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay , faAngleLeft , faAngleRight ,faPause } from '@fortawesome/free-solid-svg-icons';


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
    const skipTrackHandler =  async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if( direction === 'skip-forward' ) {
          await  setCurrentSong(songs[(currentIndex + 1) % songs.length] )
          activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        } if(direction === 'skip-back') {
            if((currentIndex -1) % songs.length === -1) {
            await    setCurrentSong(songs[songs.length - 1])
            activeLibraryHandler(songs[songs.length - 1])
            } else{
               await setCurrentSong(songs[(currentIndex - 1)])
               activeLibraryHandler(songs[(currentIndex - 1)])
            }
           
        }
        if(isPlaying) audioRef.current.play()
    }

    // drag the player input duration and return the current time of the song
    const dragHandler = (e) => {
        const currentTime = e.target.value
        console.log(currentTime)
        audioRef.current.currentTime = currentTime
        setSongInfo({...songInfo,currentTime})
    }

    // Add styles 
    const trackAnim = {
        transform : `translateX(${songInfo.animationPercentage}%)`
    }

    const activeLibraryHandler = (nextPrevSong) => {
        const newSongs = songs.map((music) => {
            if(music.id === nextPrevSong.id) {
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
    }

    return(
     <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background: `linear-gradient(to right ,${currentSong.color[0]} , ${currentSong.color[1]} )`}} className="track">
                <input onChange={dragHandler}  max={songInfo.duration  || 0} value={songInfo.currentTime} type="range"/>
                <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
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