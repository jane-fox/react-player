import React, { Component } from 'react';
import "./data.js";



//https://github.com/jmonta01/somafm-webplayer/blob/master/app/config/prod-config.json
//http://somafm.com/channels.json

class Channels extends Component {

  constructor(props) {
    super(props);
    this.state = {channels: props.channels};

  }

  render() {
    return (
      <div className="App">

        Channels here

      </div>
    );
  }
}

export default Channels;
