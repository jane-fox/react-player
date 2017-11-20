import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/icon.css';
import './css/material-icons.min.css';
import './data.js';
import axios from "axios";
import "material-icons";

import ChannelList from "./Channels";
import Visualizer from "./Visualizer";

//import Channels from './Channels';
import registerServiceWorker from './registerServiceWorker';





function Tracker() {

	return (
		<div>
			<div>Seeking</div>
			<div>0:00</div>
		</div>
	);
}

function NowPlaying(props) {

	return (
		<div>
			<h2>Now Playing</h2>
			<div>{props.title}</div>
		</div>
	);
}




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

function Controls(props) {

	function play() {
		props.audio.play();
	}

	function pause() {
		props.audio.pause();
	}

	return (
		<div>
			<button className="control-button big" onClick={play}>
				<i className="mi mi-play-circle-outline"></i>
			</button>
			<button className="control-button big" onClick={pause}>
				<i className="mi mi-pause-circle-outline"></i>
			</button>
		</div>
	);
}




// This acts as a controller for the rest of the app
class Radio extends React.Component {

	constructor(props) {
		super(props);

		var AudioContext = window.AudioContext || window.webkitAudioContext;

		this.state = {
			channels: window.channels.channels,
			audioCtx: new AudioContext(),
			audio: new Audio(),
			now_playing: "",

		};
		//console.log(this.state.channels);

		// keeps *this* usable in other methods
    	this.change_channel = this.change_channel.bind(this);

		this.state.audio.src = "http://ice1.somafm.com/groovesalad-128-mp3";
	}


	change_channel(channel_id) {

		var self = this;


		// Search channels for matching id
		var new_channel = this.state.channels.find(
			channel => channel.id == channel_id
		);
		//console.log(new_channel);

		// TODO quality picker in options
		var playlist = new_channel.playlists.find(
			list => list.quality == "high"
		);



		console.log(playlist);

		axios.get(playlist.url)
			.then(function (response) {
				//console.log(response);

				// We get an array of xml from this
				var data = response.data.split('\n');

				// Just need the file from it
				var file = data.find(
					item => item.indexOf("File1") > -1
				);

				// Removes the File1= from string
				var real_url = file.split("File1=")[1];

				self.state.audio.src = real_url;
				self.state.audio.play();

			})
			.catch(function (error) {
				console.warn(error);
			});


		//console.log(test);

		this.setState({
			now_playing: channel_id
		});


	}




	render() {
	return (
	  <main className="radio">


	    <div className="test">

			<Controls audio={this.state.audio} />


			<Visualizer audioCtx={this.state.audioCtx}/>
			<NowPlaying />
			<Tracker />


			<hr />

			<ChannelList 
				channels={this.state.channels}
				change_channel={this.change_channel}
			 />


	    </div>

	  </main>
	);
	}




}


// Update the tracker every second
setInterval(Tracker, 1000);

registerServiceWorker();

//
ReactDOM.render(<Radio />, document.getElementById('root'));
