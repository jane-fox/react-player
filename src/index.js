import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/icon.css';
import './css/material-icons.min.css';
import './data.js';
import axios from "axios";
import "material-icons";

import ChannelList from "./ChannelList";
import SongList from "./SongList";

import Visualizer from "./Visualizer";
import Controls from "./Controls";


import registerServiceWorker from './registerServiceWorker';


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



// This acts as a controller for the rest of the app
class Radio extends React.Component {

	constructor(props) {
		super(props);


		this.state = {
			channels: window.channels.channels,
			audio: new Audio(),

			current_channels: [],
			current_channel: [],
			current_song: [],
			current_songlist: [],

			channel_url: "http://somafm.com/channels.json",
			songlist_url: "http://somafm.com/songs/",

		};
		//console.log(this.state.channels);

		// Listens for keys on entire page

		// keeps *this* usable in other methods
    	this.change_channel = this.change_channel.bind(this);
    	this.play = this.play.bind(this);
    	this.pause = this.pause.bind(this);
    	this.handle_keys = this.handle_keys.bind(this);
    	this.update_songs = this.update_songs.bind(this);
    	this.update_channels = this.update_channels.bind(this);

    	//Event Listeners
		document.onkeypress = this.handle_keys;

		this.state.audio.src = "http://ice1.somafm.com/groovesalad-128-mp3";
		this.state.audio.crossOrigin = "anonymous";

		this.update_channels();
		this.update_songs();

	} // constructor


	change_channel(channel_id) {

		var self = this;


		// Search channels for matching id
		var new_channel = this.state.channels.find(
			channel => channel.id === channel_id
		);
		//console.log(new_channel);

		// TODO quality picker in options
		var playlist = new_channel.playlists.find(
			list => list.quality === "high"
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




	}

	// Check for hotkeys to activate for when a key is pressed
	handle_keys(event) {

		// Play / Pause on spacebar
		if (event.key === ' ' || event.code === "Space") {

			// Stops page from scrolling down
			event.preventDefault();

			if (this.state.audio.paused) {
				this.state.audio.play();
			} else {
				this.state.audio.pause();
			}
			
			this.setState({audio: this.state.audio});

		}

	} // handle_keys


	// Updates the list of songs
	update_songs() {

		var self = this;

		// Don't attempt request if we don't have the data
		if (this.state.songlist_url && this.state.current_channel.id) {

		var full_url = this.state.songlist_url + this.state.current_channel.id + ".json";

		axios.get(full_url)
			.then(function (response) {
				//console.log(response);

				var songs = response.songs;
				console.log(songs);


				self.setState({current_songlist: songs});

			})
			.catch(function (error) {
				console.warn(error);
			});
		}
		
	}

	update_channels() {

		var self = this;

		axios.get(this.state.channel_url)
			.then(function (response) {
				//console.log(response);

				var channels = response.channels;
				console.log(channels);
				self.setState({current_channels: channels});


			})
			.catch(function (error) {
				console.warn(error);
			});
	}

	play() {
		this.state.audio.play();
		this.setState({audio: this.state.audio});
	}

	pause() {
		this.state.audio.pause();
		this.setState({audio: this.state.audio});
	}

	toggle_display() {
		var list = "songs";
		console.log(list);
	}


	render() {
	return (
	  <main className="radio">


	    <div className="test">


			<Controls 
				audio={this.state.audio}
				play={this.play}
				pause={this.pause}
				current_song={this.state.current_song}
			/>


			<Visualizer 
				audio={this.state.audio}
			/>


			<hr />

	      <div>
	        You are currently tuned into {this.state.current_channel.title}<br />
	        
      		<div className="button" onClick={this.toggle_display} >change</div>

	      </div>

			<ChannelList 
				channels={this.state.channels}
				current_channel={this.state.current_channel}
				change_channel={this.change_channel}
			 />

 			<SongList 
				songs={this.state.current_songlist}
			 />


	    </div>

	  </main>
	);
	}

} // Radio



registerServiceWorker();

ReactDOM.render(<Radio />, document.getElementById('root'));
