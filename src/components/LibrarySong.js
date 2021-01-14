import React from 'react'
import {playAudio} from '../utils'

const LibrarySong = ({songs,song,setCurrentSong,audioRef,isPlaying,setSongs}) => {

const selectSongHandler = () => {
   const selectedSong = song
   setCurrentSong(selectedSong)
   // Add active state
   const newSongs = songs.map((music) => {
      if(music.id === song.id) {
         return{
            ...music,
            active:true,
         }
      } else {
         return{
            ...music,
            active:false,
         }
      }
   });
   setSongs(newSongs)
   //check if song is playing
   playAudio(isPlaying,audioRef)
}

    return(
     <div onClick={selectSongHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
        <img alt={song.name} src={song.cover} />
        <div  className="song-description">
           <h3> {song.name}</h3>
           <h4>{song.artist}</h4>
        </div>
     </div>
    )
}

export default LibrarySong