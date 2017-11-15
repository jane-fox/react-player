import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './data.js';

//import Channels from './Channels';
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

class Visualizer extends React.Component {

	constructor(props) {
		super(props);
	}

	// Change size of canvas
	size_player() {

		var vis_width = window.innerWidth;
		var vis_height = 100;

/*
		audioSource = audioCtx.createMediaElementSource(audio);
		audioSource.connect(analyser);
		audioSource.connect(audioCtx.destination);
    
*/
		var canvas = document.getElementById("visualizer");

		canvas.height = vis_height;
		canvas.width = vis_width;
	} // size_player()


	// Draw visualizer
	draw(props) {

		var canvas = document.getElementById("visualizer");
		var ctx = canvas.getContext("2d");
		var bufferLength, dataArray;

		//ctx.clearRect(0, 0, vis_width, vis_height);
		ctx.clearRect(0, 0, 200, 80);

		var analyser = props.audioCtx.createAnalyser();
		analyser.fftsize = 256;

		bufferLength = analyser.frequencyBinCount;
		dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		analyser.getByteFrequencyData(dataArray);

		var barWidth = 1;
		//var barWidth = (10 / bufferLength) * 2.5;
		var barHeight;
		var x = 0;



		for(var i = 0; i < bufferLength; i++) {
		    barHeight = dataArray[i]/2;

			//ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
		    ctx.fillStyle = '#FF5f00';
		    ctx.fillRect(x, 0, barWidth, barHeight/2 );

		    x += barWidth + 1;
		  }

		requestAnimationFrame(this.draw);

	} // draw()

	render() {
	return (
		<div>
			<canvas id="visualizer"></canvas>
		</div>
	);
	}

	componentDidMount() {
		//this.draw();
	}

}


function ChannelList(props) {

	const list = [];

	//console.log(props);

	props.channels.forEach(function(channel) {
		list.push(
			<div key={channel.id} className="channel" onClick={change_channel}>
				<img src={channel.image} alt={channel.title} className="pull-left" />
				<h3>{channel.title}</h3>
				<p>{channel.description}</p>
				<p>{channel.genre}</p>
				<p>{channel.listeners} listeners</p>
			</div>
		);
	})

	function change_channel(test) {
		console.log(test.target);
	}

	return (
		<div>
			<h3>Channels</h3>
			<div>{list}</div>
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
	  <main className="radio">


	    <div className="test">

			<Controls audio={this.state.audio} />


			<Visualizer audioCtx={this.state.audioCtx}/>
			<NowPlaying />
			<Tracker />


			<hr />

			<ChannelList channels={this.state.channels} />


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
