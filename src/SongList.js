import React from 'react';
import "./data.js";



function SongList(props) {

  const list = [];

  //console.log(props);

  props.songs.forEach(function(song) {
    list.push(
      <div key={song.date} className="song" >
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <p>{song.album}</p>
        <p>{song.date}</p>
      </div>
    );
  })



  return (
    <section className="song-list">

      <h3>Songs</h3>
      <div>{list}</div>

    </section>
  );
}

export default SongList;
