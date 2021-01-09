import React from 'react'

const LibrarySong = ({songs,song,setCurrentSong}) => {

const selectSongHandler = () => {
   const selectedSong = song
   setCurrentSong(selectedSong)
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