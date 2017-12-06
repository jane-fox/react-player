import React from 'react';
import "./css/song-list.css";



function SongList(props) {

  const list = [];

  //console.log(props);

  props.songs.forEach(function(song) {
    list.push(
      <li key={song.date} className="song" >
        <span className="title">{song.title}</span>
        <span  className="artist">{song.artist}</span>
        <span className="album">{song.album}</span>
        <span className="date">{song.date}</span>
      </li>
    );
  })



  return (
    <section className="song-list">

      <h3>Songs</h3>
      <ul>{list}</ul>

    </section>
  );
}

export default SongList;
