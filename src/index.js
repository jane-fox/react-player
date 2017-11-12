import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './data.js';
import App from './App';
import Channels from './Channels';
import registerServiceWorker from './registerServiceWorker';




function Tracker() {

	return (
		<div>
			<div>Tracking</div>
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

function Visualizer() {

	return (
		<div>
			<div>Visualizing</div>
			<canvas></canvas>
		</div>
	);
}

function ChannelList(props) {

	const list = [];

	//console.log(props);

	props.channels.forEach(function(channel) {
		list.push(
			<div>{channel.title}</div>
		);
	})

	return (
		<div>
			<h3>Channels</h3>
			<div>{list}</div>

		</div>
	);
}

function Controls(props) {

	function play() {
		props.audio.play();
	}
	function pause() {
		props.audio.pause();
	}

	return (
		<div>
			<button className="control-button big" onClick={play}>Play</button>
			<button className="control-button big" onClick={pause}>Pause</button>
			<p>Volume</p>
		</div>
	);
}





class Radio extends React.Component {

	constructor(props) {
		super(props);

		var AudioContext = window.AudioContext || window.webkitAudioContext;

		this.state = {
			channels: window.channels.channels,
			audioCtx: new AudioContext(),
			audio: new Audio(),
		};
		//console.log(this.state.channels);

		this.state.audio.src = "http://ice1.somafm.com/groovesalad-128-mp3";
	}

	render() {
	return (
	  <div className="App">


	    <div className="test">

			<Controls audio={this.state.audio} />


			<Tracker />
			<Visualizer />
			<NowPlaying />

			<hr />

			<ChannelList channels={this.state.channels} />


	    </div>

	  </div>
	);
	}



}


// Update the tracker every second
setInterval(Tracker, 1000);


registerServiceWorker();



//
ReactDOM.render(<Radio />, document.getElementById('root'));
