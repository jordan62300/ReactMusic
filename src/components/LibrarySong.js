import React from 'react'

const LibrarySong = ({songs,song,setCurrentSong,audioRef,isPlaying}) => {

const selectSongHandler = () => {
   const selectedSong = song
   setCurrentSong(selectedSong)
   if(isPlaying) {
      const playPromise = audioRef.current.play();
      if(playPromise !== undefined){
         playPromise.then((audio) => {
            audioRef.current.play();
         });
      }
   }
}

    return(
     <div onClick={selectSongHandler} className="library-song">
        <img alt={song.name} src={song.cover} />
        <div  className="song-description">
           <h3> {song.name}</h3>
           <h4>{song.artist}</h4>
        </div>
     </div>
    )
}

export default LibrarySong