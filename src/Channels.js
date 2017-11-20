import React, { Component } from 'react';
import "./data.js";



//https://github.com/jmonta01/somafm-webplayer/blob/master/app/config/prod-config.json
//http://somafm.com/channels.json

function ChannelList(props) {

  const list = [];

  //console.log(props);

  props.channels.forEach(function(channel) {
    list.push(
      <div key={channel.id} className="channel" onClick={change_channel} data-id={channel.id}>
        <img src={channel.image} alt={channel.title} className="pull-left" />
        <h3>{channel.title}</h3>
        <p>{channel.description}</p>
        <p>{channel.genre}</p>
        <p>{channel.listeners} listeners</p>
      </div>
    );
  })

  function change_channel(click) {

    // Get the data-id of the clicked channel
    var channel = click.currentTarget.getAttribute("data-id");

    // Use parent function to update channel state
    props.change_channel(channel);

  }

  return (
    <div>
      <h3>Channels</h3>
      <div>{list}</div>
    </div>
  );
}

export default ChannelList;
