import React from 'react';
import "./data.js";



//https://github.com/jmonta01/somafm-webplayer/blob/master/app/config/prod-config.json
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
