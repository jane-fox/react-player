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
  });



  return (
    <section className="song-list">

      <ul>
        <li className="heading song" >
          <span className="title">Title</span>
          <span  className="artist">Artist</span>
          <span className="album">Album</span>
          <span className="date">Played</span>
        </li>

        {list}

      </ul>

    </section>
  );
}

export default SongList;
