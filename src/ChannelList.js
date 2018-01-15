import React from 'react';
import "./data.js";



/*
"id": "7soul",
  "title": "Seven Inch Soul",
  "description": "Vintage soul tracks from the original 45 RPM vinyl.",
  "dj": "Dion Watts Garcia",
  "djmail": "dion@somafm.com",
  "genre": "oldies",
  "image": "https://api.somafm.com/img/7soul120.png",
  "largeimage": "https://api.somafm.com/logos/256/7soul256.png",
  "xlimage": "https://api.somafm.com/logos/512/7soul512.png",
  "twitter": "SevenInchSoul",
  "updated": "1396144686",
  "playlists": [
    { "url": "https://api.somafm.com/7soul130.pls", "format": "aac",  "quality": "highest" },
    { "url": "https://api.somafm.com/7soul.pls", "format": "mp3",  "quality": "high" },
    { "url": "https://api.somafm.com/7soul64.pls", "format": "aacp",  "quality": "high" },
    { "url": "https://api.somafm.com/7soul32.pls", "format": "aacp",  "quality": "low" }
  ],
  "listeners": "80",
  "lastPlaying": "The Dells - Your Song"
*/


//http://somafm.com/channels.json

function ChannelList(props) {

  const list = [];

  //console.log(props);

  props.channels.forEach(function(channel) {
    list.push(
      <li key={channel.id} className="channel" onClick={change_channel} data-id={channel.id}>
        <img src={channel.image} alt={channel.title} />
        <h4 className="title">{channel.title}</h4>
        <p className="description">{channel.description}</p>
        <span className="genre">{channel.genre}</span>
        <div className="listeners">{channel.listeners} listeners</div>
      </li>
    );
  })

  function change_channel(click) {

    // Get the data-id of the clicked channel
    var channel = click.currentTarget.getAttribute("data-id");

    // Use parent function to update channel state
    props.change_channel(channel);

  }

  return (
    <section className="channel-list">

      <ul>{list}</ul>

    </section>
  );
}

export default ChannelList;
